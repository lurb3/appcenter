import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { ClipLoader } from 'react-spinners';
import { TextField, Button, Grid, Modal, } from '@mui/material';
import apiUtil from 'utils/api';

const inputUserEmailSchema = Joi.object({
  email: Joi.string().email({tlds:{allow: false}}).required(),
});

const ShareModal = ({ open, close, list }) => {
  const [ loading, setLoading ] = useState(false);
  const [ apiError, setApiError ] = useState('');
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: joiResolver(inputUserEmailSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    let response = await apiUtil().put(`/shopping_list/share/${list._id}`, data);
    setLoading(false);

    if (response.status !== 200) {
      setApiError(response?.data?.message || 'Error sharing list with user');
      return;
    }

    closeForm();
  }

  const closeForm = () => {
    reset();
    close();
  };

  return (
    <Modal
      open={open}
      onClose={closeForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='shoppingListModal'
    >
      <form className='formFields' onSubmit={handleSubmit(onSubmit)}>
        <h3>Share list with user</h3>
        <TextField
          defaultValue={''}
          disabled={loading}
          className='field'
          size='small'
          id="outlined-basic"
          label="Email"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : ''}
          onChange={(e) => setValue('email', e.target.value)}
          {...register('email')}
        />
        { loading && (
          <Grid container justifyContent='center'>
            <ClipLoader color="#36d7b7" />
          </Grid>
        )}
        <div className='buttonWrapper'>
          <Button disabled={loading} size='small' variant="contained" color='error' onClick={closeForm}>Cancel</Button>
          <Button disabled={loading} size='small' variant="contained" type='submit'>
            Share
          </Button>
        </div>
        {apiError ? <span className='colorRed'>{apiError}</span> : null}
      </form>
    </Modal>
  )
}

export default ShareModal;
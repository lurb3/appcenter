import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ClipLoader } from 'react-spinners';
import { TextField, Button, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { addShoppingListSchema } from 'utils/schemas/shoppingListSchema';
import apiUtil from 'utils/api';
import './modal.scss';

const ShoppingFormModal = ({ open, setOpen, lists, setLists }) => {
  const [ loading, setLoading ] = useState(false);
  const [ apiError, setApiError ] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: joiResolver(addShoppingListSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    const response = await apiUtil().post('/shopping_list', data);
    setLoading(false);
    if (response.status !== 200) {
      setApiError(response?.data?.message || 'Error adding shopping list');
      return;
    }
    setLists([ ...lists, response.data ]);
    closeForm();
  };

  const closeForm = () => {
    reset();
    setOpen(!open);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='shoppingListModal'
    >
      <form className='formFields' onSubmit={handleSubmit(onSubmit)}>
        <h3>Add new shopping list</h3>
        <TextField
          disabled={loading}
          className='field'
          size='small'
          id="outlined-basic"
          label="Name"
          variant="outlined"
          error={Boolean(errors.name)}
          helperText={errors.name ? errors.name.message : ''}
          {...register('name')}
        />
        <TextField
          disabled={loading}
          className='field'
          size='small'
          id="outlined-basic"
          label="Description"
          variant="outlined"
          error={Boolean(errors.description)}
          helperText={errors.description ? errors.description.message : ''}
          {...register('description')}
        />
        { loading && (
          <Grid container justifyContent='center'>
            <ClipLoader color="#36d7b7" />
          </Grid>
        )}
        <div className='buttonWrapper'>
          <Button disabled={loading} size='small' variant="contained" color='error' onClick={closeForm}>Cancel</Button>
          <Button disabled={loading} size='small' variant="contained" type='submit'>Create</Button>
        </div>
        {apiError ? <span className='colorRed'>{apiError}</span> : null}
      </form>
    </Modal>
  );
};

export default ShoppingFormModal;

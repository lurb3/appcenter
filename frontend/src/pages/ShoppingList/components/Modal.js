import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ClipLoader } from 'react-spinners';
import { TextField, Button, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { addShoppingListSchema } from 'utils/schemas/shoppingListSchema';
import apiUtil from 'utils/api';
import './modal.scss';

const ShoppingFormModal = ({ open, setOpen, lists, setLists, isEditing, setIsEditing, editingList }) => {
  const [ loading, setLoading ] = useState(false);
  const [ apiError, setApiError ] = useState('');
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: joiResolver(addShoppingListSchema),
  });

  const onSubmit = async (data, e) => {
    let response = null;

    e.preventDefault();
    setLoading(true);

    if (isEditing) {
      response = await apiUtil().put(`/shopping_list/${editingList._id}`, data);
    } else {
      response = await apiUtil().post('/shopping_list', data);
    }

    setLoading(false);

    if (response.status !== 200) {
      setApiError(response?.data?.message || 'Error adding shopping list');
      return;
    }

    let updateList = lists.map((item) => {
      if (item._id === response.data._id) {
        item = response.data;
      }
      return item;
    });

    setLists(updateList);
    closeForm();
  };

  const closeForm = () => {
    reset();
    setOpen(!open);
    setIsEditing(false);
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
        <h3>{isEditing ? `Editing ${editingList.name}` : 'Add new shopping list'}</h3>
        <TextField
          defaultValue={isEditing ? editingList.name : ''}
          disabled={loading}
          className='field'
          size='small'
          id="outlined-basic"
          label="Name"
          variant="outlined"
          error={Boolean(errors.name)}
          helperText={errors.name ? errors.name.message : ''}
          onChange={(e) => setValue('name', e.target.value)}
          {...register('name')}
        />
        <TextField
          defaultValue={isEditing ? editingList.description : ''}
          disabled={loading}
          className='field'
          size='small'
          id="outlined-basic"
          label="Description"
          variant="outlined"
          error={Boolean(errors.description)}
          helperText={errors.description ? errors.description.message : ''}
          onChange={(e) => setValue('description', e.target.value)}
          {...register('description')}
        />
        { loading && (
          <Grid container justifyContent='center'>
            <ClipLoader color="#36d7b7" />
          </Grid>
        )}
        <div className='buttonWrapper'>
          <Button disabled={loading} size='small' variant="contained" color='error' onClick={closeForm}>Cancel</Button>
          <Button disabled={loading} size='small' variant="contained" type='submit'>
            {isEditing ? 'Save' : 'Create'}</Button>
        </div>
        {apiError ? <span className='colorRed'>{apiError}</span> : null}
      </form>
    </Modal>
  );
};

export default ShoppingFormModal;

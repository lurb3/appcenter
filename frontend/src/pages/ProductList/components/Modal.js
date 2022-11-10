import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ClipLoader } from 'react-spinners';
import { TextField, Button, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { addProductSchema } from 'utils/schemas/productSchema';
import apiUtil from 'utils/api';
import './modal.scss';

const ProductFormModal = ({ shoppingListID, open, setOpen, lists, setLists }) => {
  const [ loading, setLoading ] = useState(false);
  const [ apiError, setApiError ] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: joiResolver(addProductSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    const response = await apiUtil().post(`/product/${shoppingListID}`, data);
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
      className='productListModal'
    >
      <form className='formFields' onSubmit={handleSubmit(onSubmit)}>
        <h3>Add new product</h3>
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
          label="Product Link"
          variant="outlined"
          error={Boolean(errors.productLink)}
          helperText={errors.productLink ? errors.productLink.message : ''}
          {...register('productLink')}
        />
        <TextField
          disabled={loading}
          type="number"
          className='field'
          size='small'
          id="outlined-basic"
          label="Price"
          variant="outlined"
          error={Boolean(errors.price)}
          helperText={errors.price ? errors.price.message : ''}
          {...register('price')}
        />
        <TextField
          disabled={loading}
          type="number"
          className='field'
          size='small'
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          error={Boolean(errors.quantity)}
          helperText={errors.quantity ? errors.quantity.message : ''}
          {...register('quantity')}
        />
        <TextField
          disabled={loading}
          className='field'
          size='small'
          id="outlined-basic"
          label="Notes"
          variant="outlined"
          error={Boolean(errors.notes)}
          helperText={errors.notes ? errors.notes.message : ''}
          {...register('notes')}
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

export default ProductFormModal;

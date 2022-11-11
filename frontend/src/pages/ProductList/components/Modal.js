import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ClipLoader } from 'react-spinners';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl  } from '@mui/material';
import Modal from '@mui/material/Modal';
import { addProductSchema } from 'utils/schemas/productSchema';
import apiUtil from 'utils/api';
import { priorityValues, priorityColors } from 'constants/priority';
import './modal.scss';

const ProductFormModal = ({ shoppingListID, open, setOpen, lists, setLists, isEditing, setIsEditing, editingProduct }) => {
  const [ loading, setLoading ] = useState(false);
  const [ apiError, setApiError ] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: joiResolver(addProductSchema),
  });

  const onSubmit = async (data, e) => {
    let response = null;

    e.preventDefault();
    setLoading(true);

    if (isEditing) {
      response = await apiUtil().put(`/product/${editingProduct._id}`, data);
    } else {
      response = await apiUtil().post(`/product/${shoppingListID}`, data);
    }

    setLoading(false);

    if (response.status !== 200) {
      setApiError(response?.data?.message || `Error ${isEditing ? 'editing' : 'adding'} shopping list`);
      return;
    }

    if (isEditing) {
      const updateList = lists.map((item) => {
        if (item._id === response.data._id) {
          item = response.data;
        }
        return item;
      });

      setLists(updateList);
    } else {
      setLists([ ...lists, response.data ]);
    }
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
      className='productListModal'
    >
      <form className='formFields' onSubmit={handleSubmit(onSubmit)}>
        <h3>{isEditing ? `Editing ${editingProduct.name}` : 'Add new product'}</h3>
        <TextField
          defaultValue={isEditing ? editingProduct.name : ''}
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
          defaultValue={isEditing ? editingProduct.productLink : ''}
          disabled={loading}
          className='field'
          size='small'
          id="outlined-basic"
          label="Product Link"
          variant="outlined"
          error={Boolean(errors.productLink)}
          helperText={errors.productLink ? errors.productLink.message : ''}
          onChange={(e) => setValue('productLink', e.target.value)}
          {...register('productLink')}
        />
        <TextField
          defaultValue={isEditing ? editingProduct.price : ''}
          disabled={loading}
          type="number"
          className='field'
          size='small'
          id="outlined-basic"
          label="Price"
          variant="outlined"
          error={Boolean(errors.price)}
          helperText={errors.price ? errors.price.message : ''}
          onChange={(e) => setValue('price', e.target.value)}
          {...register('price')}
        />
        <TextField
          defaultValue={isEditing ? editingProduct.quantity : ''}
          disabled={loading}
          type="number"
          className='field'
          size='small'
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          error={Boolean(errors.quantity)}
          helperText={errors.quantity ? errors.quantity.message : ''}
          onChange={(e) => setValue('quantity', e.target.value)}
          {...register('quantity')}
        />
        <TextField
          defaultValue={isEditing ? editingProduct.notes : ''}
          disabled={loading}
          className='field'
          size='small'
          id="outlined-basic"
          label="Notes"
          variant="outlined"
          error={Boolean(errors.notes)}
          helperText={errors.notes ? errors.notes.message : ''}
          onChange={(e) => setValue('notes', e.target.value)}
          {...register('notes')}
        />
        <FormControl fullWidth>
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          defaultValue={isEditing ? editingProduct.priority : ''}
          labelId="priority-select-label"
          id="outlined-basic"
          label="Priority"
          error={Boolean(errors.priority)}
          onChange={(e) => setValue('priority', e.target.value)}
          {...register('priority')}
        >
          {
            priorityValues.map((p) => (
              <MenuItem style={{color: priorityColors[p]}} key={p} value={p}>{p}</MenuItem>
            ))
          }
        </Select>
        </FormControl>
        { loading && (
          <Grid container justifyContent='center'>
            <ClipLoader color="#36d7b7" />
          </Grid>
        )}
        <div className='buttonWrapper' style={{marginTop: '10px'}}>
          <Button disabled={loading} size='small' variant="contained" color='error' onClick={closeForm}>Cancel</Button>
          <Button disabled={loading} size='small' variant="contained" type='submit'>
            {isEditing ? 'Save' : 'Create'}
          </Button>
        </div>
        {apiError ? <span className='colorRed'>{apiError}</span> : null}
      </form>
    </Modal>
  );
};

export default ProductFormModal;

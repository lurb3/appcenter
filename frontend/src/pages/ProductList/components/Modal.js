import React, { useState } from 'react';
import apiUtil from 'utils/api';
import { TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import './modal.scss';

const ProductFormModal = ({ shoppingListID, open, setOpen, lists, setLists }) => {
  const [ productName, setproductName ] = useState('');
  const [ productQuantity, setProductQuantity ] = useState('');
  const [ productPrice, setProductPrice ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiUtil().post(
      `/product/${shoppingListID}`,
      { name: productName, price: productPrice, quantity: productQuantity }
    );
    setLists([ ...lists, res ]);
    setOpen(!open);
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className='formFields' onSubmit={handleSubmit}>
        <h3>Add new product</h3>
        <TextField className='field' size='small' id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setproductName(e.target.value)} />
        <TextField type="number" className='field' size='small' id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setProductPrice(e.target.value)} />
        <TextField type="number" className='field' size='small' id="outlined-basic" label="Quantity" variant="outlined" onChange={(e) => setProductQuantity(e.target.value)} />
        <Button size='small' variant="contained" type='submit'>Create</Button>
      </form>
    </Modal>
  );
};

export default ProductFormModal;

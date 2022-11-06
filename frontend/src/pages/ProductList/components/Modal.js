import React, { useState } from 'react';
import apiUtil from 'utils/api';
import { TextField, Button, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ClipLoader } from 'react-spinners';
import './modal.scss';

const ProductFormModal = ({ shoppingListID, open, setOpen, lists, setLists }) => {
  const [ loading, setLoading ] = useState(false);
  const [ productName, setproductName ] = useState('');
  const [ productQuantity, setProductQuantity ] = useState('');
  const [ productPrice, setProductPrice ] = useState('');
  const [ productLink, setProductLink ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiUtil().post(
      `/product/${shoppingListID}`,
      { name: productName, price: productPrice, quantity: productQuantity, productLink: productLink },
    );
    if (res.status === 400) return;
    setLoading(false);
    setLists([ ...lists, res.data ]);
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
      <form className='formFields' onSubmit={handleSubmit}>
        <h3>Add new product</h3>
        <TextField disabled={loading} className='field' size='small' id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setproductName(e.target.value)} />
        <TextField disabled={loading} className='field' size='small' id="outlined-basic" label="Product Link" variant="outlined" onChange={(e) => setProductLink(e.target.value)} />
        <TextField disabled={loading} type="number" className='field' size='small' id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setProductPrice(e.target.value)} />
        <TextField disabled={loading} type="number" className='field' size='small' id="outlined-basic" label="Quantity" variant="outlined" onChange={(e) => setProductQuantity(e.target.value)} />
        { loading && (
          <Grid container justifyContent='center'>
            <ClipLoader color="#36d7b7" />
          </Grid>
        )}
        <Button disabled={loading} size='small' variant="contained" type='submit'>Create</Button>
      </form>
    </Modal>
  );
};

export default ProductFormModal;

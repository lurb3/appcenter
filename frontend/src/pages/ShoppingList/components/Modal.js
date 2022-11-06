import React, { useState } from 'react';
import apiUtil from 'utils/api';
import { TextField, Button, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ClipLoader } from 'react-spinners';
import './modal.scss';

const ShoppingFormModal = ({ open, setOpen, lists, setLists }) => {
  const [ loading, setLoading ] = useState(false);
  const [ listName, setListName ] = useState('');
  const [ listDescription, setListDescription ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiUtil().post('/shopping_list', { name: listName, description: listDescription });
    setLists([ ...lists, res.data ]);
    setLoading(false);
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
      <form className='formFields' onSubmit={handleSubmit}>
        <h3>Add new shopping list</h3>
        <TextField disabled={loading} className='field' size='small' id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setListName(e.target.value)} />
        <TextField disabled={loading} className='field' size='small' id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setListDescription(e.target.value)} />
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

export default ShoppingFormModal;

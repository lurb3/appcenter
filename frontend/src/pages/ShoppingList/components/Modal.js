import React, { useState } from 'react';
import apiUtil from 'utils/api';
import { TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import './modal.scss';

const ShoppingFormModal = ({ open, setOpen, lists, setLists }) => {
  const [ listName, setListName ] = useState('');
  const [ listDescription, setListDescription ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    apiUtil().post('/shopping_list', { name: listName, description: listDescription })
      .then((res) => {
        setLists([ ...lists, res ]);
        setOpen(!open);
      });
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className='formFields' onSubmit={handleSubmit}>
        <h3>Add new shopping list</h3>
        <TextField className='field' size='small' id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setListName(e.target.value)} />
        <TextField className='field' size='small' id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setListDescription(e.target.value)} />
        <Button size='small' variant="contained" type='submit'>Create</Button>
      </form>
    </Modal>
  );
};

export default ShoppingFormModal;

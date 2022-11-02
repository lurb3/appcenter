import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUtil from 'utils/api';
import { TextField, Button } from '@mui/material';

const ShoppingList = () => {
  const [ listName, setListName ] = useState('');
  const [ listDescription, setListDescription ] = useState('');
  const [ lists, setLists ] = useState([]);

  const setListsData = async () => {
    const lists = await apiUtil().get('/shopping_list');
    if (lists.data.length > 0) setLists(lists.data);
  };

  useEffect(() => {
    setListsData();
  }, []);

  const handleDelete = async (e, item) => {
    e.preventDefault();
    await apiUtil().delete(`/shopping_list/${item._id}`);
    setListsData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiUtil().post('/shopping_list', { name: listName, description: listDescription })
      .then((res) => {
        setLists([ ...lists, res.data ]);
      });
  };

  return (
    <div className='formWrapper'>
      <form className='formFields' onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setListName(e.target.value)} />
        <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setListDescription(e.target.value)} />
        <Button variant="contained" type='submit'>Create</Button>
      </form>

      <div>
        {
          lists.map((item, index) => {
            return (
              <div key={`${item?.name} ${index}`}>
                <Link to={`/shoppinglist/${item?._id}`}>{item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}</Link>
                <Button variant="contained" color="error" onClick={(e) => handleDelete(e, item)}>Delete</Button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ShoppingList;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUtil from 'utils/api';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ShoppingFormModal from './components/Modal';
import './shoppinglist.scss';

const ShoppingList = () => {
  const [ loading, setLoading ] = useState(true);
  const [ lists, setLists ] = useState([]);
  const [ openFormModal, setOpenFormModal ] = useState(false);

  const setListsData = async () => {
    const lists = await apiUtil().get('/shopping_list');
    if (lists.length > 0) setLists(lists);
    setLoading(false);
  };

  useEffect(() => {
    setListsData();
  }, []);

  const handleDelete = async (e, item) => {
    e.preventDefault();
    await apiUtil().delete(`/shopping_list/${item._id}`);
    setListsData();
  };

  if (loading) return null;

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      height='100%'
      className='shoppingListWrapper'
    >
      <ShoppingFormModal open={openFormModal} setOpen={setOpenFormModal} lists={lists} setLists={setLists} />
      <Grid item xs={8} textAlign='center'>
        <h1 className='colorWhite'>Shopping Lists</h1>
        <h4 className='colorWhite'>* Select, edit or remove a list</h4>
        <Paper>
          <button className='addNew' onClick={() => setOpenFormModal(!openFormModal)}>
            Add new <AddCircleIcon />
          </button>
          <div className='formWrapper'>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component="th">Name</TableCell>
                    <TableCell component="th">Description</TableCell>
                    <TableCell component="th" align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lists.map((list) => (
                    <TableRow
                      key={list._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link className='listLink' to={`/shoppinglist/${list?._id}`} state={{ name: list.name }}>
                          {list.name.charAt(0).toUpperCase() + list.name.slice(1)}
                        </Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {list.description}
                      </TableCell>
                      <TableCell component="th" scope="row" align='right'>
                        <button className='deleteButton' onClick={(e) => handleDelete(e, list)}><DeleteIcon /></button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ShoppingList;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import apiUtil from 'utils/api';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import ShoppingFormModal from './components/Modal';
import './shoppinglist.scss';

const ShoppingList = () => {
  const [ loading, setLoading ] = useState(true);
  const [ lists, setLists ] = useState([]);
  const [ openFormModal, setOpenFormModal ] = useState(false);
  const [ openDialog, setOpenDialog ] = useState(false);

  const setListsData = async () => {
    const lists = await apiUtil().get('/shopping_list');
    setLists(lists.data || []);
    setLoading(false);
  };

  useEffect(() => {
    setListsData();
  }, []);

  const handleDelete = async (e, item) => {
    e.preventDefault();
    await apiUtil().delete(`/shopping_list/list/${item._id}`);
    setListsData();
  };

  const handleDeleteAll = async (req, res) => {
    setLoading(true);
    await apiUtil().delete(`/shopping_list/all`);
    setLists([]);
    setLoading(false);
    setOpenDialog(false);
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      height='100%'
      className='shoppingListWrapper'
    >
      <ShoppingFormModal open={openFormModal} setOpen={setOpenFormModal} lists={lists} setLists={setLists} />
      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} callback={handleDeleteAll} title ={'Delete all shoping Lists and it\'s products?'} />
      <Grid item xs={8} textAlign='center'>
        <h1 className='colorWhite'>Shopping Lists</h1>
        <h4 className='colorWhite'>* Select, edit or remove a list</h4>
        <Paper style={{ padding: '10px' }}>
          {loading ? (
            <Grid container justifyContent='center' alignItems='center' direction='column'>
              <ClipLoader color="#36d7b7" />
              Loading lists
            </Grid>
          ) : (
            <>
              <Grid display='flex' justifyContent='end' padding='10px'>
                <Button disabled={loading} className='deleteAll' variant='contained' color='error' onClick={() => setOpenDialog(true)}>
                  Delete all <DeleteIcon />
                </Button>
                <Button disabled={loading} variant='contained' color='primary' onClick={() => setOpenFormModal(!openFormModal)}>
                  Add new <AddCircleIcon />
                </Button>
              </Grid>
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
                      {lists.length > 0 && lists.map((list) => (
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
                            {list?.description}
                          </TableCell>
                          <TableCell component="th" scope="row" align='right'>
                            <Button disabled={loading} className='deleteButton' onClick={(e) => handleDelete(e, list)}><DeleteIcon /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ShoppingList;

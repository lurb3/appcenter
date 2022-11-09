import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { format, parseISO } from 'date-fns';
import apiUtil from 'utils/api';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import ShareModal from './components/ShareModal';
import ShoppingFormModal from './components/Modal';
import './shoppinglist.scss';

const ShoppingList = () => {
  const [ loading, setLoading ] = useState(true);
  const [ lists, setLists ] = useState([]);
  const [ currentList, setCurrentList ] = useState(null);
  const [ openFormModal, setOpenFormModal ] = useState(false);
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ editingList, setEditingList ] = useState(false);
  const [ userId, setUserId ] = useState(false);
  const [ openShareModal, setOpenShareModal ] = useState(false);

  const setListsData = async () => {
    const lists = await apiUtil().get('/shopping_list');
    setLists(lists.data || []);
    setLoading(false);
  };

  const getUserId = async () => {
    const getId = await apiUtil().get('/user/getid');
    setUserId(getId.data);
  };

  useEffect(() => {
    setListsData();
    getUserId();
  }, []);

  const handleEdit = async (e, list) => {
    e.preventDefault();
    setIsEditing(true);
    setOpenFormModal(true);
    setEditingList(list);
  };

  const handleShareList = async (e, list) => {
    e.preventDefault();
    setOpenShareModal(true);
    setCurrentList(list);
  };

  const handleDelete = async (e, list) => {
    e.preventDefault();
    await apiUtil().delete(`/shopping_list/list/${list._id}`);
    setListsData();
  };

  const handleDeleteAll = async (req, res) => {
    setLoading(true);
    await apiUtil().delete(`/shopping_list/all`);
    setListsData();
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
      <ShoppingFormModal
        open={openFormModal}
        setOpen={setOpenFormModal}
        lists={lists}
        setLists={setLists}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingList={editingList}
      />
      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} callback={handleDeleteAll} title={'Delete all shoping Lists and it\'s products?'} />
      <ShareModal open={openShareModal} close={() => setOpenShareModal(false)} list={currentList}/>
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
                        <TableCell component="th">Added at</TableCell>
                        <TableCell component="th">Updated at</TableCell>
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
                              {list.userId !== userId && ' (Shared list)'}
                              {(list.userId === userId && list.sharedUsers.length > 0) && ' (Sharing)'}
                            </Link>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {list?.description}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {list?.createdAt && format(parseISO(list.createdAt), 'dd-MM-yyyy')}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {list?.updatedAt && format(parseISO(list.updatedAt), 'dd-MM-yyyy')}
                          </TableCell>
                          <TableCell component="th" scope="row" align='right'>
                            <Tooltip title='Share list'>
                              <Button onClick={(e) => handleShareList(e, list)}><PersonAddAltIcon /></Button>
                            </Tooltip>
                            <Tooltip title='Edit'>
                              <Button onClick={(e) => handleEdit(e, list)}><ModeEditIcon /></Button>
                            </Tooltip>
                            <Tooltip title='Delete'>
                              <Button disabled={loading} className='deleteButton' onClick={(e) => handleDelete(e, list)}><DeleteIcon /></Button>
                            </Tooltip>
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

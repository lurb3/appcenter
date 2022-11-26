import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Grid, Tooltip, Divider } from '@mui/material';
import { format, parseISO } from 'date-fns';
import apiUtil from 'utils/api';
import history from 'utils/history';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import ShareModal from './components/ShareModal';
import ShoppingFormModal from './components/Modal';
import listIcon from '../../assets/list-icon.png';
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
      <Grid item textAlign='center' width="100%" position={'relative'}>
        <h1 className='colorWhite'>Shopping Lists</h1>
        <h4 className='colorWhite'>* Select, edit or remove a list</h4>
        <Grid display='flex' justifyContent='end' padding='10px'>
          <DeleteIcon style={{ cursor: 'pointer', marginRight: '20px' }} color="error" onClick={() => setOpenDialog(true)} />
          <AddCircleIcon style={{ cursor: 'pointer' }} color="primary" onClick={() => setOpenFormModal(!openFormModal)} />
        </Grid>
        {
          loading ? (
            <Grid container justifyContent='center' alignItems='center' direction='column'>
              <ClipLoader color="#36d7b7" />
              <span className='colorWhite'>Loading lists </span>
            </Grid>
          ) : lists.length > 0 && lists.map((list) => (
            <React.Fragment key={list._id}>
              <Grid display="flex" maxWidth="100%">
                <div className="listCard" onClick={() => history.push(`/shoppinglist/${list?._id}`, { name: list.name })}>
                  <div className="listCardImg">
                    <img src={listIcon} />
                  </div>
                  <div>
                    <div className="listCardTitle">
                      { list.userId !== userId && '(Shared) ' }
                      { (list.userId === userId && list.sharedUsers.length > 0) && '(Sharing) ' }
                      { list.name.charAt(0).toUpperCase() + list.name.slice(1) }</div>
                    <div className="listCardDate">{ list?.updatedAt && format(parseISO(list.updatedAt), 'dd-MM-yyyy') }</div>
                  </div>
                </div>
                <div className="listCardActions">
                  <Tooltip title='Share list' style={{ marginRight: '10px', cursor: 'pointer' }}>
                    <PersonAddAltIcon fontSize='small' color="primary" onClick={(e) => handleShareList(e, list)} />
                  </Tooltip>
                  <Tooltip title='Edit' style={{ marginRight: '10px', cursor: 'pointer' }}>
                    <ModeEditIcon fontSize='small' color="primary" onClick={(e) => handleEdit(e, list)} />
                  </Tooltip>
                  <Tooltip title='Delete' style={{ marginRight: '10px', cursor: 'pointer' }}>
                    <DeleteIcon fontSize='small' color="error" onClick={(e) => handleDelete(e, list)} />
                  </Tooltip>
                </div>
              </Grid>
              <Divider />
            </React.Fragment >
          ))
        }
      </Grid>
    </Grid>
  );
};

export default ShoppingList;

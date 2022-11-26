import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Divider, Grid, Tooltip } from '@mui/material';
import { format, parseISO } from 'date-fns';
import apiUtil from 'utils/api';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import ProductFormModal from './components/Modal';
import { priorityListObj, priorityColors } from 'constants/priority';
import './productlist.scss';

const ProductList = () => {
  const [ loading, setLoading ] = useState(true);
  const [ lists, setLists ] = useState([]);
  const [ openFormModal, setOpenFormModal ] = useState(false);
  const [ openDialog, setOpenDialog ] = useState(false);
  const location = useLocation();
  const { shoppingListID } = useParams();
  const [ isEditing, setIsEditing ] = useState(false);
  const [ editingProduct, setEditingProduct ] = useState(false);

  const shoppingListName = location.state.name.charAt(0).toUpperCase() + location.state.name.slice(1);

  const setListsData = async () => {
    const lists = await apiUtil().get(`/product/${shoppingListID}`);
    setLists(lists.data || []);
    setLoading(false);
  };

  const handleEdit = async (e, list) => {
    e.preventDefault();
    setIsEditing(true);
    setOpenFormModal(true);
    setEditingProduct(list);
  };

  const handleDelete = async (e, item) => {
    e.preventDefault();
    setLoading(true);
    await apiUtil().delete(`/product/${item._id}`);
    setListsData();
  };

  const handleDeleteAll = async (req, res) => {
    setLoading(true);
    await apiUtil().delete(`/product/${shoppingListID}/all`);
    setLists([]);
    setLoading(false);
    setOpenDialog(false);
  };

  useEffect(() => {
    setListsData();
  }, []);

  return (
    <Grid
      justifyContent='center'
      alignItems='center'
      height='100%'
      className='productListWrapper'
    >
      <ProductFormModal
        shoppingListID={shoppingListID}
        open={openFormModal}
        setOpen={setOpenFormModal}
        lists={lists}
        setLists={setLists}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingProduct={editingProduct}
        setListsData={setListsData}
      />
      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} callback={handleDeleteAll} title ='Delete all products for this shopping list?' />
      <Grid item textAlign='center' width="100%">
        <h1 className='colorWhite'>{shoppingListName} products</h1>
        <h4 className='colorWhite'>* Edit or remove a product</h4>
        <Grid display='flex' justifyContent='end' padding='10px'>
          <div style={{ marginRight: 'auto' }}>
            <Link to={`/shoppinglist`}>
              <ArrowCircleLeftIcon color='primary' className='return' />
            </Link>
          </div>
          <DeleteIcon style={{ cursor: 'pointer', marginRight: '20px' }} color="error" onClick={() => setOpenDialog(true)} />
          <AddCircleIcon style={{ cursor: 'pointer' }} color="primary" onClick={() => setOpenFormModal(!openFormModal)} />
        </Grid>
        { loading ? (
          <Grid container justifyContent='center' alignItems='center' direction='column'>
            <ClipLoader color="#36d7b7" />
              Loading products
          </Grid>
        ) : (
          lists.length > 0 && lists.map((list) => (
            <React.Fragment key={list._id}>
              <Grid display="flex" maxWidth="100%">
                <div className="listCard">
                  <div className="listCardImg">
                    <img src="" />
                  </div>
                  <div onClick={() => history.push(`/shoppinglist/${list?._id}`, { name: list.name })}>
                    <div className="listCardTitle" style={{ color: priorityColors[priorityListObj[list.priority] || 'Medium'] }}>
                      { list.name.charAt(0).toUpperCase() + list.name.slice(1) }
                    </div>
                    <div> Link: {list.productLink && (
                      <a href={list.productLink} target='_blank' rel="noreferrer">
                        {list.productLink.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, '').slice(0, 20)}{list.productLink.length > 20 && '...'}
                      </a>
                    )}
                    </div>
                    <div>
                      Quantity: {list.quantity ? list.quantity : 'n/a'}
                    </div>
                    <div>
                      Price: {list.price ? list.price : 'n/a'}
                    </div>
                    <div>
                      Notes: {list.notes ? list.notes : 'n/a'}
                    </div>
                    <div className="listCardDate">{ list?.updatedAt && format(parseISO(list.updatedAt), 'dd-MM-yyyy') }</div>
                  </div>
                  <div className="listCardActions">
                    <Tooltip title='Edit' style={{ marginRight: '10px', cursor: 'pointer' }}>
                      <ModeEditIcon fontSize='small' color="primary" onClick={(e) => handleEdit(e, list)} />
                    </Tooltip>
                    <Tooltip title='Delete' style={{ marginRight: '10px', cursor: 'pointer' }}>
                      <DeleteIcon fontSize='small' color="error" onClick={(e) => handleDelete(e, list)} />
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              <Divider />
            </React.Fragment >
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default ProductList;

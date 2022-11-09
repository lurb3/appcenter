import React, { useState } from 'react';
import { Divider, Drawer, Button, List, ListItem } from '@mui/material';
import './sidenavmenu.scss';
import { Link } from 'react-router-dom';
import { clearJwt } from 'utils/jwt';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import history from 'utils/history';

const SideNavMenu = () => {
  const [ openDialog, setOpenDialog ] = useState(false);

  const handleLogout = () => {
    clearJwt();
    setOpenDialog(false);
    history.push('/');
  };

  return (
    <Drawer
      anchor="left"
      open={true}
      variant="permanent"
      classes={{ paper: 'sideMenu' }}
    >
      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} callback={handleLogout} title ='Are you sure you want to logout?' />
      <h4>Appcenter Menu</h4>
      <Divider />
      <div className='sideMenuWrapper'>
        <List>
          <ListItem>
            <Link underline="none" color="inherit" to='/shoppinglist'>Shopping Lists</Link>
          </ListItem>
        </List>
        <div className='logoutWrapper'>
          <Button color='error' variant='contained' onClick={() => setOpenDialog(true)}>Logout</Button>
        </div>
      </div>
    </Drawer>
  );
};

export default SideNavMenu;

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Divider, Drawer, Button, List, ListItem } from '@mui/material';
import './sidenavmenu.scss';
import { Link } from 'react-router-dom';
import { clearJwt } from 'utils/jwt';
import history from 'utils/history';

const SideNavMenu = () => {
  const [ openDialog, setOpenDialog ] = useState(false);

  const handleLogout = () => {
    clearJwt();
    setOpenDialog(false);
    history.push('/');
  };

  const ConfirmDeleteAll = () => {
    return (
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(!openDialog)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to logout?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Drawer
      anchor="left"
      open={true}
      variant="permanent"
      classes={{ paper: 'sideMenu' }}
    >
      <ConfirmDeleteAll />
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

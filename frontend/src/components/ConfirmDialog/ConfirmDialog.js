import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const ConfirmDialog = ({ openDialog, setOpenDialog, callback, title }) => {
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(!openDialog)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>
        <Button onClick={callback} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

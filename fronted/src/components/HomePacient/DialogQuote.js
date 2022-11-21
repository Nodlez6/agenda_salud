import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function DialogQuote({open, isValid, setOpen,handleClickOpen,  handlePayment, handleTakeHour, title, content}) {
    const handleClose = () => {
        setOpen(false);
    };
    

  return (
    <div>
      <Button  disabled={isValid} variant="outlined" onClick={handleClickOpen}>
        Tomar Hora
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handlePayment}>Si</Button>
          <Button onClick={handleTakeHour} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
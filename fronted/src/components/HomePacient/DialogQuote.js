import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function DialogQuote({open, isValid, setOpen,handleClickOpen, token,  title}) {
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
          <form action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" method="POST">
            <input type="hidden" name="token_ws" value={token}/>
            <Button type="submit" > Si </Button>
           </form> 
          <Button onClick={() => setOpen(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
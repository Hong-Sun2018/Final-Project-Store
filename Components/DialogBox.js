import { Typography, Button} from '@mui/material';
import{ 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  {
    root: {

    },
  }
);

const DialogBox = (props) => {
  
  const classes = useStyles();
  const { open, message } = props;
 
  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <Dialog 
      open={open} onClose={handleClose} 
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText>
          {countDown}{message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;
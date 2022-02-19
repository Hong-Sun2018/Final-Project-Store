import { Typography, Button} from '@mui/material';
import{ 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { closeDialog } from '../Redux/Reducer/DialogOpenReducer';

const useStyles = makeStyles(
  {
    root: {

    },
  }
);

const DialogBox = () => {
  
  const classes = useStyles();
  const isOpen = useSelector( (state) => state.isDialogOpen.value);
  console.log(isOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
  }

  return (
    <Dialog 
      open={isOpen} onClose={handleClose} 
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'message'}
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
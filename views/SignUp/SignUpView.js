import { Grid, Box, Button, TextField, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, memo } from 'react';
import axios from 'axios';
import md5 from 'md5';
import GetUrl from '../../Constants/API';
import DialogBox from '../../Components/DialogBox';
import { useSelector, useDispatch } from 'react-redux';
import { openDialog } from '../../Redux/Reducer/DialogOpenReducer';
import { setDialogMsg } from '../../Redux/Reducer/DialogMessageReducer'; 

const useStyles = makeStyles(
  {
    root: {
      width: '60%',
      maxWidth: '400px',
      minWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'yellow'
    },
    input: {
      width: '100%',
      marginBottom: '12px',
      marginTop: '12px',
    },
    button: {
      marginTop: '15px',
      display: 'block',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
);

const SignUpView = () => {

  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.isDialogOpen.value);
  
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSignUp = () => {

    if (username.length == 0 || password.length == 0 ) {
      dispatch(setDialogMsg('Username or password cannot be empty. '));
      dispatch(openDialog());
      return;
    } 

    const url = GetUrl('SignUp');
    const reqBody = {
      UserName: username,
      Password: md5(password)
    }

    console.log(url);
    console.log(reqBody);

    axios.post(url, reqBody)
      .then((res) => {
        console.log(res);
        
      })
      .catch( err => {
        if (err.response.status == '409'){
          dispatch(setDialogMsg('Username is not available. '))
        }
        else {
          dispatch(setDialogMsg('Unknow error. '))
        }
        dispatch(openDialog());
      });
  }

  return (
    <Box className={classes.root}> 
      <TextField className={classes.input} id={'username'} label={'Username'} variant={'filled'} onChange={handleChangeUsername} />
      <TextField className={classes.input} id={'password'} label={'Password'} variant={'filled'} type={'password'} onChange={handleChangePassword} />
      
      <Button className={classes.button} sx={{ textTransform: 'none' }} variant={'contained'} onClick={handleSignUp}>
        Sign Up
      </Button>   
    </Box>
  );
}

export default memo(SignUpView);
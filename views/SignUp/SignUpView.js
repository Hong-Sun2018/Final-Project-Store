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
  const [confirmPwd, setConfirmPwd] = useState('');
  const dispatch = useDispatch();
  
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleChangeConfirmPwd = (event) => {
    setConfirmPwd(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.keyCode == 13){
      handleSignUp();
    }
  }

  ////////// Sign Up Http ///////////
  const handleSignUp = () => {

    if (username.length == 0 || password.length == 0 ) {
      dispatch(setDialogMsg('Username or password cannot be empty. '));
      dispatch(openDialog());
      return;
    } 

    if (password != confirmPwd ) {
      dispatch(setDialogMsg('The password and password confirmation is not same. '));
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
        dispatch(setDialogMsg('New user has been registed'));
        dispatch(openDialog());
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
      <TextField className={classes.input} id={'username'} label={'Username'} variant={'filled'} onChange={handleChangeUsername} size={'small'} />
      <TextField className={classes.input} id={'password'} label={'Password'} variant={'filled'} type={'password'} onChange={handleChangePassword} size={'small'} />
      <TextField className={classes.input} id={'confirmPwd'} label={'Confirm Password'} variant={'filled'} type={'password'} onChange={handleChangeConfirmPwd} size={'small'} onKeyDown={handleKeyDown}/>
      
      <Button className={classes.button} sx={{ textTransform: 'none' }} variant={'contained'} onClick={handleSignUp}>
        Sign Up
      </Button>   
    </Box>
  );
}

export default memo(SignUpView);
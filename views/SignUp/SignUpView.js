import { Grid, Box, Button, TextField, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, memo } from 'react';


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

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Box className={classes.root}> 
      <TextField className={classes.input} id={'username'} label={'Username'} variant={'filled'} onChange={handleChangeUsername} />
      <TextField className={classes.input} id={'password'} label={'Password'} variant={'filled'} type={'password'} onChange={handleChangePassword} />
      
      <Button className={classes.button} sx={{ textTransform: 'none' }} variant={'contained'}>
        Sign Up
      </Button>   
    </Box>
  );
}

export default memo(SignUpView);
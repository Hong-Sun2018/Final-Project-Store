import { Box, Button, Typography, TextField, Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
      marginBottom: '10px',
      marginTop: '10px',
    },
    buttonBox: {
      display: 'flex',
    },
    button: {
      display: 'block',
      marginTop: '10px',
      marginBottom: '10px',
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
);

const SignInView = () => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TextField className={classes.input} id={'username'} label={'Username'} variant={'filled'} />
      <TextField className={classes.input} id={'password'} label={'Password'} variant={'filled'} type={'password'} autoComplete="current-password" />
      <Grid container alignItems={'center'} justifyContent={'center'}>
        <Grid item xs={12} sm={6}>
          <Button className={classes.button} sx={{ textTransform: 'none' }} variant={'contained'} width={'300px'}>
            Sign In
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link href={'/signup'}>
            <Button className={classes.button} sx={{ textTransform: 'none' }} variant={'outlined'}>
              Sign Up
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignInView;
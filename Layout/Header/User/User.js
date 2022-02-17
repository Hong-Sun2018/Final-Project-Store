import { Box, Typography, Link, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  {
    root: {
      width: '100%',
    },
  }
);

const SignIn = () => {
  return (
    <Link href={'/signin'}>
      <Button sx={{textTransform: 'none'}} >
        <Typography>
          Sign In
        </Typography>
      </Button>
    </Link>
  );
};

const User = () => {

  const classes = useStyles();

  return (
    <Box>
      <SignIn />
    </Box>
  );
};

export default User;
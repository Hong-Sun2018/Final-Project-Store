import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '50px',
    backgroundColor: 'red',
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
  }
});

const Header = () => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography >
        Header
      </Typography>
    </Box>
  );
}

export default Header;
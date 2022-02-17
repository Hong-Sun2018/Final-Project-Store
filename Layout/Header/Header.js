import { Box, Typography, Link, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import User from './User/User';



const useStyles = makeStyles({
  root: {
    width: '90%',
    marginLeft:'auto',
    marginRight:'auto',
    height: '50px',
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  logoBox: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    
  },
  navBox: {
    width: '60%',
  },
  userBox: {
    width: '20%',
  },

  logo: {
    width: '100px',
    height: '50px',
    backgroundImage: 'url(/images/demo-logo.png)',
    backgroundSize:'contain',
    backgroundPosition:'center center',
    backgroundRepeat: 'no-repeat',
  }

});

const Header = () => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.logoBox}>
        <Link href={'/'}>
          <Button className={classes.logo} sytle={{backgroundColor: 'yellow'}} />
        </Link>
      </Box>
      <Box className={classes.navBox}>

      </Box>
      <Box className={classes.userBox}>
        <User />
      </Box>
    </Box>
  );
}

export default Header;
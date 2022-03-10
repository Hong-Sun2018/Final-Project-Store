import { Box, Typography, Button, Grid, IconButton, TextField } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import API from '../../../Constants/API';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDialogMsg } from '../../../Redux/Reducer/DialogReducer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { memo, useEffect, useState } from 'react';
import { Pool } from '@mui/icons-material';

const useStyles = makeStyles({
  root: {
    width: '100%',
    // minWidth: '150px',
    padding: '10px',
    marginTop: '10px',
    boxShadow: '2px 2px 5px #cccccc'
  },
  imgContainer: {
    width: '150px',
    height: '100px',
    border: '1px',
    borderStyle: 'solid',
    borderColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  image: {
    maxHeight: '100px',
    maxWidth: '150px',
  },
  btnContainer: {
    minWidth: '150px'
  },
  btn: {
    textTransform: 'none',
    marginLeft: '10px',
  },
  input: {
    width: '20px',
    height: '20px',
    lineHeight: '90%'
  },
  iconBtn: {
    width: '10px',
    height: '10px'
  }
});

const ProductCard = ({ product }) => {

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const imgSrc = `data:${product.fileType1};base64,${product.file1}`;
  const [quantity, setQuantity] = useState(product.productAmount);
  const [tempQuantity, setTempQuantity] = useState(product.productAmount);

  useEffect(() => {
    if (product.productAmount <= product.productStock) {
      setQuantity(product.productAmount);
    }
    else if (product.productAmount > product.productStock) {
      setQuantity(product.productStock);
    }
  }, []);

  const clickSaveChange = () => {
    if (tempQuantity > 0 && tempQuantity <= product.productStock) {
      const url = API('Cart');
      const data = {
        id: product.id,
        productID: product.productID,
        userID: product.userID,
        productAmount: tempQuantity,
      };
      axios.put(url, data, { withCredentials: true }).then(res => {
        if (res) {
          setQuantity(tempQuantity);
          router.reload();
        }
      }).catch(error => {
        dispatch(setDialogMsg('Unknown error.'))
      })
    }
    else {
      dispatch(setDialogMsg('Ivalid product quantity.'));
      setTempQuantity(quantity);
    }
  }

  const increment = () => {
    if (tempQuantity < product.productStock) {
      setTempQuantity(tempQuantity + 1);
    }
  }

  const decrement = () => {
    if (tempQuantity > 1) {
      setTempQuantity(tempQuantity - 1);
    }
  }

  const changeTempQuantity = (event) => {
    setTempQuantity(event.target.value);
  }

  const clickDelete = () => {
    const url = `${API('Cart')}/${product.id}`;
    const data = {
      UserID: 0,
      ProductID: product.productID,
      ProductAmount: quantity,
    };
    axios.delete(url, { withCredentials: true }).then(res => {
      dispatch(setDialogMsg(`Product deleted. ID: ${product.id}`));
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <Box className={classes.root} >
      <Grid container alignItems={'center'} justifyContent={'center'} spacing={4}>
        <Grid item md={2.5} sm={12} xs={12}>
          <Box className={classes.imgContainer} >
            <Box className={classes.image} component={'img'} src={imgSrc} />
          </Box>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <Typography variant={'p'} md={{ textAlign: 'left' }} sm={{ textAlign: 'center' }}>{product.productName}</Typography>
        </Grid>
        <Grid item md={1.3} sm={12} xs={12}>
          <Typography color={'#cccccc'}>Price:</Typography>
          <Typography textAlign={'center'}>{product.productPrice}</Typography>
        </Grid>
        <Grid item md={1.2} sm={12} xs={12}>
          <Typography color={'#cccccc'}>Stock:</Typography>
          <Typography textAlign={'center'} >{product.productStock}</Typography>
        </Grid>
        <Grid item md={1.5} sm={12} xs={12}>
          <Typography color={'#cccccc'}>Quantity:</Typography>
          <Typography textAlign={'center'}>
            <IconButton className={classes.iconBtn} onClick={decrement}>
              <KeyboardArrowDownIcon />
            </IconButton>
            <input className={classes.input} value={tempQuantity} onChange={changeTempQuantity} />
            <IconButton className={classes.iconBtn} onClick={increment} >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Typography>
        </Grid>
        <Grid item md={2.5} sm={12} xs={12} textAlign={'center'}>
          <Box className={classes.btnContainer}>
            <Button className={classes.btn} onClick={clickSaveChange} variant={'contained'} size={'small'} >Save Change</Button>
            <Button className={classes.btn} onClick={clickDelete} variant={'outlined'} size={'small'} color={'error'} >Delete</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(ProductCard);
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
    width:'10px',
    height: '10px'
  }
});

const ProductCard = ({ product }) => {

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const imgSrc = `data:${product.fileType1};base64,${product.file1}`;
  const [disableCart, setDisableCart] = useState(true);
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (product.productStock > 0){
      setDisableCart(false);
      setQuantity(1);
    }
  }, []);

  const clickEdit = () => {
    router.push(`/edit-product/${product.productID}`)
  }

  const clickViewDetail = () => {
    router.push(`/product-detail/${product.productID}`);
  }

  const increment = () => {
    if (quantity < product.productStock){
      setQuantity(quantity + 1);
    } 
  }

  const decrement = () => {
    if (quantity > 1){
      setQuantity(quantity - 1);
    }
  }

  const changeQuantity = (event) => {
    if(event.target.value > 0 && event.target.value <= product.productStock){
      setQuantity(event.target.value);
    }
  }

  const clickAddToCart = () => {
    const url = API('Cart');
    const data = {
      UserID: 0,
      ProductID: product.productID,
      ProductAmount: quantity,
    };
    axios.post(url, data, {withCredentials: true}).then(res => {
      dispatch(setDialogMsg('Product added to cart.'));
    }).catch(err => {
      // console.log(err.response);
      if (err.response.status == 409){
        dispatch(setDialogMsg('Product exists in shopping cart.'))
      }
    });
  }

  return (
    <Box className={classes.root} >
      <Grid container alignItems={'center'} justifyContent={'center'} spacing={4}>
        <Grid item md={3} sm={12} xs={12}>
          <Box className={classes.imgContainer} >
            <Box className={classes.image} component={'img'} src={imgSrc} />
          </Box>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <Typography variant={'p'} md={{ textAlign: 'left' }} sm={{ textAlign: 'center' }}>{product.productName}</Typography>
        </Grid>
        <Grid item md={1.5} sm={12} xs={12}>
          <Typography color={'#cccccc'}>Price:</Typography>
          <Typography textAlign={'center'}>{product.productPrice}</Typography>
        </Grid>
        <Grid item md={1.5} sm={12} xs={12}>
          <Typography color={'#cccccc'}>Stock:</Typography>
          <Typography textAlign={'center'} >{product.productStock}</Typography>
        </Grid>
        <Grid item md={3} sm={12} xs={12} textAlign={'center'}>
          <Box className={classes.btnContainer}>
            <Button className={classes.btn} onClick={clickViewDetail} variant={'contained'} size={'small'} >View Detail</Button>
            <Button className={classes.btn} onClick={clickAddToCart} variant={'outlined'} size={'small'} disabled={disableCart} >Add to Cart</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(ProductCard);
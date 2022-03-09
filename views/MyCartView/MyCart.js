import { memo } from "react";
import { Box, Typography, Button, Grid } from '@mui/material';
import API from "../../Constants/API";
import axios from "axios";
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard/ProductCard';
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDialogMsg } from "../../Redux/Reducer/DialogReducer";

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'

  },
  containerList: {
    width: '85%',
  },
  containerSummary: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
    alignItems: 'flex-end',
    // backgroundColor: 'yellow'
  },
  wrapperSummary: {
    width: '200px',
    backgroundColor: 'yellow',
  },
  summaryBtn: {
    textTransform: 'none',
    marginTop: '20px',
  }

});

const MyCart = () => {

  const [cartProdList, setCartProdList] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const dialogMsg = useSelector(state => state.dialog.value.dialogMsg);
  const [totalPrice, setTotalPrice] = useState(0);

  /////////////////////////////// Get Shopping Cart Data /////////////////////////////
  useEffect(() => {
    const url = API('Cart');
    axios.get(url, { withCredentials: true }).then(res => {
      if (res) {
        setCartProdList(res.data);
        // console.log(res.data);
        let temp = 0;
        for (const item of res.data){
          temp = temp + item.productPrice * item.productAmount;
          console.logTemp;
        }
        setTotalPrice(temp);
      }
    }).catch(err => {
      console.log(err);
    })
  }, [dialogMsg]);

  ///////////////////////////// Post Order /////////////////////////

  const createOrder = () => {
    const url = API('Order');
    axios.post(url, {}, {withCredentials: true}).then(res => {
      if (res){
        dispatch(setDialogMsg('Order created'));
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.containerList}>
        <Grid container alignItems={'center'} justifyContent={'center'} spacing={3}>
          {cartProdList && cartProdList.map((item, index) => {
            return (
              <Grid item product={item} key={index} md={12} sm={6} xs={12}>
                <ProductCard product={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box className={classes.containerSummary}>
        <Typography variant={'h6'}>Total Price:</Typography>
        <Typography variant={'h6'} fontWeight={'normal'}>{totalPrice}</Typography>
        <Button className={classes.summaryBtn} onClick={createOrder} variant={'contained'}>Check Out</Button>
      </Box>
    </Box>
  );
}

export default memo(MyCart);
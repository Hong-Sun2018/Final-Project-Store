import { memo, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import API from "../../../Constants/API";
import { Typography, Box, Grid } from "@mui/material";
import OrderProductCard from "./OrderProductCard/OrderProductCard";
import { makeStyles } from "@mui/styles";

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
const OrderDetailView = () => {

  const classes = useStyles();
  const router = useRouter();
  const {orderID} = router.query;
  const [orderProducts, setOrderProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const url = `${API('Order')}/${orderID}`;
    axios.get(url, {withCredentials: true}).then(res => {
      if (res && res.data){
        setOrderProducts(res.data);
        console.log(res.data)
        let temp = 0;
        for (const item of res.data){
          temp = temp + item.productPris * item.productQuantity;
          console.logTemp;
        }
        setTotalPrice(temp);
      }
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.containerList}>
        <Grid container alignItems={'center'} justifyContent={'center'} spacing={3}>
          {orderProducts && orderProducts.map((item, index) => {
            return (
              <Grid item product={item} key={index} md={12} sm={6} xs={12}>
                <OrderProductCard product={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box className={classes.containerSummary}>
        <Typography variant={'h6'}>Total Price:</Typography>
        <Typography variant={'h6'} fontWeight={'normal'}>{totalPrice}</Typography>
      </Box>
    </Box>
  );
}

export default memo(OrderDetailView);
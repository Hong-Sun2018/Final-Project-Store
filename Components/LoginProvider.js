import { useEffect, memo } from "react";
import axios from 'axios';
import API from "../Constants/API";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../Redux/Reducer/UserInfoReducer";

const LoginProvider = ({children}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const url = API('TokenLogin');
    // console.log(url);
    axios.get(url, {withCredentials: true}).then((res) => {
      if (res){
        dispatch(setUserInfo(res.data));
      }
    }).catch( err => {
      console.log(err);
    })
  }, []);

  return (
    <>
      {children}
    </>
  );
}

export default memo(LoginProvider);
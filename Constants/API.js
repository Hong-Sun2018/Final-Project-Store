const HOST_NAME = 'https://api.h0n9.com';

const API_PATH = {
  SignUp: '/user/signup',
  SignIn:'/user/signin',
};

const GetUrl = (key) => {
  return `${HOST_NAME}${API_PATH[key]}`;
}

export default GetUrl;
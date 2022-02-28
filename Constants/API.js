const HOST_NAME = 'http://localhost:5033';

const API_PATH = {
  SignUp: '/user/signup',
  SignIn:'/user/signin',
  TokenLogin: '/user/token-login',
};

const API = (key) => {
  return `${HOST_NAME}${API_PATH[key]}`;
}

export default API;
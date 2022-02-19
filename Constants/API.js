const HOST_NAME = 'http://localhost:5033';

const API_PATH = {
  SignUp: '/user/user',
};

const GetUrl = (key) => {
  return `${HOST_NAME}${API_PATH[key]}`;
}

export default GetUrl;
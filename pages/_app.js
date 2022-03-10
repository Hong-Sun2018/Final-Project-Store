import Layout from "../Layout/Layout";
import { Provider as StoreProvider } from 'react-redux';
import store from "../Redux/Store";
import { Box } from '@mui/material';
import LoginProvider from '../Components/LoginProvider';

const MyApp = ({ Component, pageProps }) => {
  return (
    <StoreProvider store={store}>
      <LoginProvider>
        <Layout>
          <Box sx={{ boxShadow: 3, marginBottom: '4px' }}>
            <Component {...pageProps} />
          </Box>
        </Layout>
      </LoginProvider>
    </StoreProvider>
  );
}

export default MyApp

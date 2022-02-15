import { Box } from "@mui/material";
import Header from './Header/Header';
import Footer from "./Footer/Footer";

const Layout = ({children}) => {

  return (
    <>
      <Header />
        { children }
      <Footer />
    </>
  );
}

export default Layout;
import { Box } from "@mui/material";
import Header from './Header/Header';
import Footer from "./Footer/Footer";
import DialogBox from "../Components/DialogBox";

const Layout = ({children}) => {

  return (
    <>
      <Header />
        { children }
        <DialogBox />
      <Footer />
    </>
  );
}

export default Layout;
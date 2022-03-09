import PageContainer from "../Components/PageContainer";
import MyCart from "../views/MyCartView/MyCart";

const CartPage = () => {
  return (
    <PageContainer pageTitle={'My Cart'}>
      <MyCart />
    </PageContainer>
  );
}

export default CartPage;
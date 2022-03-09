import PageContainer from '../../Components/PageContainer';
import OrderListView from '../../views/OrderView/OrderList/OrderListView';

const OrderListPage = () => {

  return (
    <PageContainer pageTitle={'My Orders'}>
      <OrderListView />
    </PageContainer>
  );
}

export default OrderListPage;
import { memo } from 'react';
import PageContainer from '../Components/PageContainer';
import ProductList from '../views/HomeView/ProductList';


const Home = () => {
  return ( 
    <PageContainer pageTitle={'Products'}>
      <ProductList />
    </PageContainer>
  )
}

export default memo(Home);
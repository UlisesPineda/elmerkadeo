import { useSelector } from 'react-redux';

import { CategoryCatalog, LayoutShopPage } from '../components';

export const ShopPage = () => {

  const { totalProductsUser } = useSelector( state => state.productsUser );

  return (
    <LayoutShopPage>
      <CategoryCatalog 
         products={ totalProductsUser }
      />
    </LayoutShopPage>
  );
};

import { useSelector } from "react-redux";

import { CategoryCatalog, LayoutShopPage } from "../components";
import { useProductData } from "../../admin/hooks";

export const BlousesPage = () => {

  const { totalProductsUser } = useSelector( state => state.productsUser );
  const { selectedCategory } = useSelector( state => state.category );
  // const blouses = totalProductsUser.filter( products => products.category === 'Blusas' );

  const { selectedProduct } = useProductData();

  const handleSelectedProduct = (e) => {
    const id = e.target.getAttribute('data-id');
    const selectedProd = totalProductsUser.filter( product => product._id === id );
    selectedProduct( selectedProd[0] );
  };

  return (
    <LayoutShopPage>
      <CategoryCatalog 
        products={ selectedCategory }
        handleSelectedProduct={ handleSelectedProduct }
      />
    </LayoutShopPage>
  );
};

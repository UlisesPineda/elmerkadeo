import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CategoryCatalog, LayoutShopPage } from "../components";

export const CategoryPage = () => {

  const { category } = useParams();

  const { totalProductsUser } = useSelector( state => state.productsUser );
  const currentProducts = totalProductsUser.filter( products =>  products.normalizedUrlCategory === category );

  return (
    <LayoutShopPage>
        <CategoryCatalog 
            products={ currentProducts }
            keyValue={ category }
        />
    </LayoutShopPage>
  );
};

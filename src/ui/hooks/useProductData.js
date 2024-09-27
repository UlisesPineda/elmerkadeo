import { useDispatch } from "react-redux";

import elMerkadeoAPI from "../../api/elMerkadeoAPI";
import { useAlertMessage } from "./useAlertMessage";
import { onLoadedProducts, onSearchProductUser } from "../../store/slices";

export const useProductData = () => {

    const { startOpenAlert } = useAlertMessage();

    const dispatch = useDispatch();

    const getProducts = async() => {
        try {
            const { data } = await elMerkadeoAPI.get('products/get-products');
            dispatch( onLoadedProducts( data.catalog ) );
        } catch (error) {
            console.log( error );
        }
    };

    const searchProduct = async( form ) => {
        try {
            const { data } = await elMerkadeoAPI.post('/products/search-product', form );
            if( !data.product.length ) {
                startOpenAlert({
                    title: 'No hay coincidencias para el término de búsqueda',
                    text: 'Intenta buscar con otro término',
                    button: true,
                });
                return false;
            }
            else {
                dispatch( onSearchProductUser( data.product) );
                return true;
            }
        } catch (error) {
            console.log( error );
                startOpenAlert({
                    title: 'No se pudo realizar la búsqueda',
                    text: 'Intenta más tarde',
                    button: true,
                });
                return false;
        }
    };

    return {
        getProducts,
        searchProduct,
    };
};
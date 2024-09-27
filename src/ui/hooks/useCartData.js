import { useSelector, useDispatch } from "react-redux";
import { onCartItemAdded, onLoadCart, onPayedCart } from "../../store/slices";
import { useAlertMessage } from "./useAlertMessage";
import elMerkadeoAPI from "../../api/elMerkadeoAPI";
import { useUserAuth } from "./useUserAuth";


export const useCartData = () => {

    const dispatch = useDispatch();

    const { startOpenAlert } = useAlertMessage();
    const { checkUserAuthToken } = useUserAuth();

    const { isUserAuth } = useSelector( state => state.userAuth );

    const addItemToCart = async( item ) => {
        if( isUserAuth ) {
            try {
                await checkUserAuthToken();
                const { data } = await elMerkadeoAPI.post('/products/add-product-cart', item);
                dispatch( onCartItemAdded( data.user.cart ) );
            } catch (error) {
                console.log( error );
                if ( error.request.status === 401 ) {
                    startOpenAlert({
                        title: 'Por inactividad tu sesión ha expirado',
                        text: 'Vuelve a iniciar sesión',
                        button: true,
                    });
                    return false;
                }
                else {
                    startOpenAlert({
                        title: 'Hubo un error al añadir el producto',
                        text: 'Intenta más tarde',
                        button: true,
                    });
                }
            }
        }
        else {
            if( JSON.parse(localStorage.getItem('cart')) ){
                const prevCart = JSON.parse(localStorage.getItem('cart'));
                localStorage.setItem('cart', JSON.stringify( [...prevCart, item] ));
                const cartUpdated = [...prevCart, item]
                dispatch( onCartItemAdded( cartUpdated ) );
            }
            else {
                localStorage.setItem('cart', JSON.stringify( [item] ));
                dispatch( onCartItemAdded( [item] ) );
            }            
        }
    };

    const deleteItemCart = async( cartUpdated, setRenderInput, setIsGonnaPay ) => {
        if ( isUserAuth ) {
            try {
                await checkUserAuthToken();
                await elMerkadeoAPI.post('/products/add-new-cart', cartUpdated);
                dispatch( onLoadCart( cartUpdated ) );
                return true;
            } catch (error) {
                console.log( error );
                if ( error.request.status === 401 ) {
                    setRenderInput( true );
                    setIsGonnaPay( false );
                    startOpenAlert({
                        title: 'Por inactividad tu sesión ha expirado',
                        text: 'Vuelve a iniciar sesión',
                        button: true,
                    });
                    return false;
                }
                else {
                    startOpenAlert({
                        title: 'Hubo un error al eliminar el producto',
                        text: 'Intenta más tarde',
                        button: true,
                    });
                    return false;
                }
            }
        }
        else {
            localStorage.setItem('cart', JSON.stringify( cartUpdated ) );
            dispatch( onLoadCart( cartUpdated ) );
        }
    };

    const processPayment = async( id, amount, description, userCart, setRenderInput, setIsGonnaPay ) => {
        try {
            await checkUserAuthToken();
            const { data } = await elMerkadeoAPI.post('/payment/checkout-cart', {
                id,
                amount,
                description,
            });
            await elMerkadeoAPI.put( '/products/delete-full-cart' );
            const { data: purchasedData } = await elMerkadeoAPI.put( '/products/add-product-purchased', { userCart, id } );
            startOpenAlert({
                title: data.message,
                text: data.text,
                button: true,
            });
            dispatch( onPayedCart( purchasedData.user.purchased ) );
            return true;
        } catch (error) {
            console.log( error );
            if ( error.request.status === 401 ) {
                setRenderInput( true );
                setIsGonnaPay( false );
                startOpenAlert({
                    title: 'Por inactividad tu sesión ha expirado',
                    text: 'Vuelve a iniciar sesión',
                    button: true,
                });
                return false;
            }
            else {
                startOpenAlert({
                    title: error.response.data.message,
                    text: error.response.data.text,
                    button: true,
                });
                return false;
            }
        }
    };

    return {
        addItemToCart,
        deleteItemCart,
        processPayment,
    };
};
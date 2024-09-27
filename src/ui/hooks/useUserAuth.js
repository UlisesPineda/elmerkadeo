import { useDispatch } from "react-redux";

import elMerkadeoAPI from "../../api/elMerkadeoAPI";
import { useAlertMessage } from "./useAlertMessage";
import { onLoadCart, onLoadPurchasedCart, onLoginUser, onLogoutCart, onLogoutUser } from "../../store/slices";

export const useUserAuth = () => {

    const dispatch = useDispatch();
    const { startOpenAlert } = useAlertMessage();

    const registerUser = async( form, isAccepted ) => {
        const formUpdated = { ...form, isAccepted };
        try {
            await elMerkadeoAPI.post('/auth-user/register-user', formUpdated);
            startOpenAlert({
                title: 'Tu usuario fue creado exitosamente',
                text: 'Ya puedes iniciar sesión y realizar tus compras',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un error al crear el usuario',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }
    };

    const loginUser = async( form ) => {
        try {
            const { data } = await elMerkadeoAPI.post('/auth-user/login-user', form);
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isUserAuth', true);
            dispatch( onLoginUser( data ) );

            const cartOnStorage = JSON.parse( localStorage.getItem('cart') );
            if( cartOnStorage ){
                const cartUpdated = data.cart.concat( cartOnStorage );
                await elMerkadeoAPI.post('/products/add-new-cart', cartUpdated);
                dispatch( onLoadCart( cartUpdated ) );
                dispatch( onLoadPurchasedCart( data.purchased ) );
                localStorage.removeItem('cart');
            }
            else {
                dispatch( onLoadCart( data.cart ) );
                dispatch( onLoadPurchasedCart( data.purchased ) );
            }
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: error.response.data.message,
                text: '',
                button: true,
            });
            return false;
        }
    };

    const logoutUser = () => {
        localStorage.clear();
        dispatch( onLogoutUser() );
        dispatch( onLogoutCart() );
    };

    const reqChangeUserPassword = async( form ) => {
        try {
            const { data } = await elMerkadeoAPI.post('/auth-user/req-reset-password', form);
            startOpenAlert({
                title: data.message,
                text: data.text,
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: error.response.data.message,
                text: '',
                button: true,
            });
            return true;
        }
    };

    const resetUserPassword = async( token, form ) => {
        try {
            await elMerkadeoAPI.put(`/auth-user/reset-password/${ token }`, form );
            startOpenAlert({
                title: 'Tu password fue reestablecido correctamente',
                text: 'Ya puedes iniciar sesión',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: error.response.data.message,
                text: 'Revisa la información ingresada',
                button: true,
            });
            return false;
        }
    };

    const changeUserName = async( form ) => {
        try {
            await checkUserAuthToken();
            const { data } = await elMerkadeoAPI.put('/auth-user/change-user-name', form);
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isUserAuth', true);
            dispatch( onLoginUser( data ) );
            startOpenAlert({
                title: 'Tu nombre de usuario fue actualizado correctamente',
                text: 'Se ha actualizado tu panel de administración',
                button: true,
            });
            return true;
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
                    title: 'Hubo un error al actualizar tu nombre de usuario',
                    text: 'Intenta más tarde',
                    button: true,
                });
                return false;
            }
        }
    };

    const changeUserEmail = async( form ) => {
        try {
            await checkUserAuthToken();
            const { data } = await elMerkadeoAPI.put('/auth-user/change-user-email', form);
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isUserAuth', true);
            dispatch( onLoginUser( data ) );
            startOpenAlert({
                title: 'Tu correo fue actualizado correctamente',
                text: `En tu próximo inicio de sesión tu nuevo usuario sera: ${ form.email }`,
                button: true,
            });
            return true;
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
                    title: 'Hubo un error al actualizar tu correo',
                    text: 'Intenta más tarde',
                    button: true,
                });
                return false;
            }
        }
    };

    const changeUserPassword = async( form ) => {
        try {
            await checkUserAuthToken();
            const { data } = await elMerkadeoAPI.put('/auth-user/change-user-password', form);
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isUserAuth', true);
            dispatch( onLoginUser( data ) );
            startOpenAlert({
                title: 'El password fue actualizado correctamente',
                text: 'Asegúrate de cambiar tu password en el próximo cambio de sesión',
                button: true,
            });
            return true;
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
                    title: 'Hubo un error al actualizar el password',
                    text: 'Intenta más tarde',
                    button: true,
                });
                return false;
            }
        }
    };

    const changeUserAdress = async( form ) => {
        try {
            await checkUserAuthToken();
            const { data } = await elMerkadeoAPI.put('/auth-user/change-user-adress', form);
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('isUserAuth', true);
            dispatch( onLoginUser( data ) );
            startOpenAlert({
                title: 'La dirección fue actualizada correctamente',
                text: 'A esta dirección se enviará tu próximo pedido',
                button: true,
            });
            return true;
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
                    title: 'Hubo un error al actualizar la dirección',
                    text: 'Intenta más tarde',
                    button: true,
                });
                return false;
            }
        }
    };

    const checkUserAuthToken = async() => {
        const token = localStorage.getItem('token');
        !token && dispatch( onLogoutUser() );
        try {
            const { data } = await elMerkadeoAPI.get('/auth-user/renew-user-token');
            const { authToken, cart, purchased } = data;
            localStorage.setItem('token', authToken);
            dispatch( onLoginUser( data ) );
            dispatch( onLoadCart( cart ) );
            dispatch( onLoadPurchasedCart( purchased ) );
        } catch (error) {
            dispatch( onLogoutUser() );
            dispatch( onLogoutCart() );
            localStorage.clear();
            console.log( error );
        }
    };

    return {
        registerUser,
        loginUser,
        logoutUser,
        reqChangeUserPassword,
        checkUserAuthToken,
        resetUserPassword,
        changeUserName,
        changeUserEmail,
        changeUserPassword,
        changeUserAdress,
    };
};
import elMerkadeoAPI from "../../api/elMerkadeoAPI";
import { useAlertMessage } from "./useAlertMessage";


export const useAdminAuth = () => {

    const { startOpenAlert } = useAlertMessage();

    const loginAdmin = async( form ) => {
        const { email, password } = form;
        try {
            const { data } = await elMerkadeoAPI.post('/auth-admin/login-admin', { email, password });
            document.cookie = `auth-token=${ data.authToken }; max-age=1200; domain=.elmerkadeo.com; path=/; samesite=none; secure`;
            // document.cookie = `auth-token=${ data.authToken }; max-age=1200`;
            window.location.href = import.meta.env.VITE_ADMIN_SITE_URL;
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: error.response.data.message,
                text: error.response.data.text,
                button: true,
            });
            return false;
        }
    };  

    const startActivateAdmin = async( token ) => {
        try {
            const { data } = await elMerkadeoAPI.get(`auth-admin/activate-admin/${ token }`);
            startOpenAlert({
                title: data.message,
                text: data.text,
                button: true,
            });
            return true;
        } catch (error) {
            console.log(error);
            startOpenAlert({
                title: error.response.data.message,
                text: error.response.data.text,
                button: true,
            });
            return false;
        }
    };

    const reqChangeAdminPassword = async( form ) => {
        try {
            await elMerkadeoAPI.post('/auth-admin/request-reset-password', form);
            startOpenAlert({
                title: 'El reestablecimento de tu password fue procesado exitosamente',
                text: 'Te hemos enviado un correo con las instrucciones para reestablecer tu password',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            if ( error.response.status === 404 ) {
                startOpenAlert({
                    title: error.response.data.message,
                    text: 'Ingresa tu correo de administrador',
                    button: true,
                });
                return false;
            }
            else {
                startOpenAlert({
                    title: 'Hubo un error al solicitar el nuevo password',
                    text: 'Intenta más tarde',
                    button: true,
                });
                return false;
            }
        }
    };

    const resetAdminPassword = async( token, form ) => {
        try {
            const { data } = await elMerkadeoAPI.put(`auth-admin/reset-password/${ token }`, form );
            startOpenAlert({
                title: data.message,
                text: data.text,
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: error.response.data.messages,
                text: 'Revisa la información ingresada',
                button: true,
            });
            return false;
        }
    };


    return {
        loginAdmin,
        startActivateAdmin,
        resetAdminPassword,
        reqChangeAdminPassword,
    };
};
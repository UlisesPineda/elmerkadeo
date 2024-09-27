import elMerkadeoAPI from "../../api/elMerkadeoAPI";

import { useAlertMessage } from "./useAlertMessage";

export const useSuscriberData = () => {

    const { startOpenAlert } =  useAlertMessage();

    const addSuscriber = async( form ) => {
        try { 
            await elMerkadeoAPI.post('suscribers/add-suscriber', form);
            startOpenAlert({
                title: 'Tu correo fue dado de alta exitosamente',
                text: 'Gracias por tu suscripción 😃',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            if ( error.response.status === 400 ) {
                startOpenAlert({
                    title: error.response.data.message,
                    text: '',
                    button: true,
                });
                return true;
            }
            else {
                startOpenAlert({
                    title: 'Hubo un error al agregar tu correo al listado de suscriptores',
                    text: 'Intenta más tarde',
                    button: true,
                });
                return true;
            }
        }
    };

    const unsuscribeSus = async( id ) => {
        try {
            const { data } = await elMerkadeoAPI.put(`suscribers/unsuscribe/${ id }`);
            console.log( data );
            startOpenAlert({
                title: 'Tu correo fue dado de baja',
                text: 'Agradecemos tu tiempo e interés',
                button: false,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un error al dar de baja tu correo al listado de suscriptores',
                text: 'Intenta más tarde',
                button: true,
            });
        }
    } 

    return {
        addSuscriber,
        unsuscribeSus,
    };
};
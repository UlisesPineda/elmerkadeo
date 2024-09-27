import { useState } from "react";
import { useAlertMessage } from "./useAlertMessage.js";

export const useValidateForm = () => {

    const [files, setFiles] = useState([]);
    const [isMounted, setIsMounted] = useState(true);
    
    const { startOpenAlert } = useAlertMessage();

    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordFormat = /^(?=.*[a-zA-Z0-9])(?=.*[/*\-+]).{8,16}$/;
    const nameFormat = /^[a-zA-Z\u00C0-\u02AF\s]{1,30}$/;
    const textFormat = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ,¿?¡!,'\s]*$/;
    const sizeArrayFormat = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s,]*$/;
    const zipcodeFormat = /^\d{5}$/;

    const validateEmptyInput = ( form ) => {
        // eslint-disable-next-line no-unused-vars
        for (const [ key, value ] of Object.entries( form )) {
            return value === '' 
                ? startOpenAlert({
                    title: 'Hay campos con información vacía', 
                    text: 'Ingresa la información requerida',
                    button: true, 
                  })
                : true;
        }
    };

    const validateSelectInput = ( size, color ) => {
        if ( color === '' ) {
            startOpenAlert({
                title: 'No has seleccionado el color de tu prenda',
                text: 'Selecciona un color',
                button: true,
            });
            return false;
        }
        if ( size === '' ) {
            startOpenAlert({
                title: 'No has seleccionado la talla de tu prenda',
                text: 'Selecciona tu talla',
                button: true,
            });
            return false;
        }
        return true;
    };

    const validateInputFiles = ( images ) => {
        return images.length === 0
        ?
            startOpenAlert({
                title: 'No has seleccionado las imágenes del producto',
                text: 'Selecciona tus nuevas imágenes',
                button: true,
            })
        :
            true;
    };

    const getInputFiles = (e) => {
        setFiles(e.target.files);
    };

    const resetInputfile = () => {
        setIsMounted(!isMounted);
        setFiles([]);
    };

    const disableButtonForm = ( title, text, button ) => {
        startOpenAlert({
            title,
            text,
            button,
        });
        return true;
    };


    const validateLoginForm = ( form ) => {
        const { email, password } = form;
        if ( !emailFormat.test( email ) ) {
            startOpenAlert({
                title: 'El formato de correo es incorrecto',
                text: 'Revisa el correo ingresado',
                button: true,
            });
            return false;
        }
        if ( !passwordFormat.test( password ) ) {
            startOpenAlert({
                title: 'El formato del password es incorrecto',
                text: 'El password debe contener de 8 a 16 caracteres, debe contener números y letras y al menos uno de los siguientes caracteres especiales: / * - +',
                button: true,
            });
            return false;
        }
        return true;
    };

    const validateSearchProductForm = ( form ) => {
        const { queryItem } = form;
        if ( !textFormat.test( queryItem ) ) {
            startOpenAlert({
                title: 'El término de búsqueda contiene caracteres que no son admitidos',
                text: 'Corrige el término de búsqueda',
                button: true,
            });
            return false;
        }
        return true;
    };

    const validateUserName = ( form ) => {
        const { userName } = form;
        if ( userName === '' ) {
            startOpenAlert({
                title: 'El campo de nombre de usuario está vacío',
                text: 'Agrega el nuevo nombre de usuario',
                button: true,
            });
            return false;    
        }
        if ( !nameFormat.test( userName ) ) {
            startOpenAlert({
                title: 'Para el nombre no puedes usar caracteres especiales',
                text: 'Corrige tu nuevo nombre de usuario',
                button: true,
            });
            return false;    
        }
        return true;
    };

    const validateUserEmail = ( form ) => {
        const { email } = form;
        if ( email === '' ) {
            startOpenAlert({
                title: 'El campo del correo de usuario está vacío',
                text: 'Agrega el nuevo correo',
                button: true,
            });
            return false;    
        }
        if ( !emailFormat.test( email ) ) {
            startOpenAlert({
                title: 'El correo no tiene un formato de correo válido',
                text: 'Corrige el correo ingresado',
                button: true,
            });
            return false;    
        }
        return true;
    };

    const validateUserPassword = ( form ) => {
        const { password, newPassword } = form;
        if ( newPassword === '' ) {
            startOpenAlert({
                title: 'No has agregado el nuevo password',
                text: 'Agrega el nuevo password',
                button: true,
            });
            return false;    
        }
        if ( password === '' ) {
            startOpenAlert({
                title: 'Por seguridad es necesario que ingreses tu password actual',
                text: 'Ingresa tu password actual',
                button: true,
            });
            return false;    
        }
        if ( !passwordFormat.test( password ) & !passwordFormat.test( newPassword ) ) {
            startOpenAlert({
                title: 'El formato del password es incorrecto',
                text: 'El password debe contener de 8 a 16 caracteres, debe contener números y letras y al menos uno de los siguientes caracteres especiales: / * - +',
                button: true,
            });
            return false;
        }
        if ( password !== newPassword ) {
            startOpenAlert({
                title: 'Los passwordos no coinciden',
                text: 'Corrije la información ingresada',
                button: true,
            });
            return false;
        }
        return true;
    };

    const validateNewUserPassword = ( form ) => {
        const { password } = form;
        if ( password === '' ) {
            startOpenAlert({
                title: 'No has agregado el nuevo password',
                text: 'Agrega el nuevo password',
                button: true,
            });
            return false;    
        }
        if ( !passwordFormat.test( password ) ) {
            startOpenAlert({
                title: 'El formato del password es incorrecto',
                text: 'El password debe contener de 8 a 16 caracteres, debe contener números y letras y al menos uno de los siguientes caracteres especiales: / * - +',
                button: true,
            });
            return false;
        }
    };

    const validateUserPasswordSingle = ( form ) => {
        const { password } = form;
        if ( password === '' ) {
            startOpenAlert({
                title: 'No has agregado el nuevo password',
                text: 'Agrega el nuevo password',
                button: true,
            });
            return false;    
        }
        if ( !passwordFormat.test( password ) ) {
            startOpenAlert({
                title: 'El formato del password es incorrecto',
                text: 'El password debe contener de 8 a 16 caracteres, debe contener números y letras y al menos uno de los siguientes caracteres especiales: / * - +',
                button: true,
            });
            return false;
        }
        return true;
    };


    const validateUserAdress = ( form ) => {
        if( form.adress === '' || form.district === '' || form.district === '' || form.city === '' ) {
                startOpenAlert({
                    title: 'Los datos de la nueva dirección están incompletos',
                    text: 'Todos los datos son requeridos',
                    button: true,
                });
                return false;    
        }
        if ( !sizeArrayFormat.test( form.adress ) ) {
            startOpenAlert({
                title: 'La calle y número contiene caracteres no permitidos',
                text: 'Corrige la dirección ingresada',
                button: true,
            });
            return false;    
        }
        if ( !sizeArrayFormat.test( form.district ) ) {
            startOpenAlert({
                title: 'La colonia contiene caracteres no permitidos',
                text: 'Corrige el nombre de la colonia ingresada',
                button: true,
            });
            return false;    
        }
        if ( !zipcodeFormat.test( form.zipcode ) ) {
            startOpenAlert({
                title: 'El formato del código postal es incorrecto',
                text: 'Corrige el código postal ingresado',
                button: true,
            });
            return false;    
        }
        if ( !textFormat.test( form.city ) ) {
            startOpenAlert({
                title: 'La ciudad contiene caracteres no permitidos',
                text: 'Corrige el nombre de la ciudad',
                button: true,
            });
            return false;    
        }
        return true;
    };

    const validateSuscriberForm = ( form ) => {
        const { suscriber, email } = form;
        if ( !emailFormat.test( email ) ) {
            startOpenAlert({
                title: 'El correo tiene un formato inválido',
                text: 'Corrige el correo ingresado',
                button: true,
            });
            return false;    
        }
        if ( !nameFormat.test( suscriber ) ) {
            startOpenAlert({
                title: 'El nombre contiene caracteres que no son admitidos',
                text: 'Corrige el nombre',
                button: true,
            });
            return false;    
        }
        return true;
    };

    const validateRegisterUserForm = ( form ) => {
        const { userName, email, password, confirmPassword } = form;
        if ( !nameFormat.test( userName ) ) {
            startOpenAlert({
                title: 'El nombre de usuario tiene caracteres no válidos',
                text: 'Corrige el nombre de usuario',
                button: true,
            });
            return false;
        }
        if ( !emailFormat.test( email ) ) {
            startOpenAlert({
                title: 'El correo tiene un formato inválido',
                text: 'Corrige el correo ingresado',
                button: true,
            });
            return false;    
        }
        if ( !passwordFormat.test( password ) ) {
            startOpenAlert({
                title: 'El formato del password es incorrecto',
                text: 'El password debe contener de 8 a 16 caracteres, debe contener números y letras y al menos uno de los siguientes caracteres especiales: / * - +',
                button: true,
            });
            return false;
        }
        if ( password !== confirmPassword ) {
            startOpenAlert({
                title: 'Los passwordos no coinciden',
                text: 'Corrije la información ingresada',
                button: true,
            });
            return false;
        }
        return true;
    };

    const validateTermsInput = ( isAcepted ) => {
        if ( !isAcepted ) {
            startOpenAlert({
                title: 'No has aceptado los términos y condiciones',
                text: 'Marca la casilla para aceptar los términos y condiciones de uso del servicio',
                button: true,
            });
            return false;
        }
        return true;
    };

    return {
        files,
        isMounted,

        resetInputfile,
        getInputFiles,
        validateInputFiles,
        disableButtonForm,
        validateEmptyInput,
        validateLoginForm,  
        validateSearchProductForm,
        validateUserEmail,
        validateUserPassword,
        validateSuscriberForm,
        validateTermsInput,
        validateRegisterUserForm,
        validateSelectInput,
        validateUserName,
        validateNewUserPassword,
        validateUserAdress,
        validateUserPasswordSingle,
    };
};
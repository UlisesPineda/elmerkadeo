import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    mainContainer,
    adminForm,
    disabled,
    linkLoginAdmin,
} from './styles/ChangeAdminPasswordPage.module.css';
import { useAdminAuth, useForm, useValidateForm } from '../hooks';

export const ChangeAdminPasswordPage = () => {

    const { token } = useParams();

    const [isDisabled, setIsDisabled] = useState(false);
    const [isReseted, setIsReseted] = useState(false);

    const { resetAdminPassword } = useAdminAuth();
    const { validateEmptyInput, validateUserPassword } = useValidateForm();
    const { form, handleChange, resetForm } = useForm({
        password: '',
        newPassword: '',
    });

    const disabledActions = () => {
        setIsDisabled(true);
        return true;
    };

    const enableActions = () => {
        resetForm();
        setIsDisabled( false );
        setIsReseted( true );
    };

    const handleSetNewPassword = async(e) => {
        e.preventDefault();
        validateEmptyInput( form ) &&
            validateUserPassword( form ) &&
                disabledActions() &&
                    await resetAdminPassword( token, form ) &&
                        enableActions();
    };

  return (
    <div
        className="imageHeroeContainer"
    >
        <div
            className={ mainContainer }
        >
            {
                isReseted
                    ?
                        <a 
                            className={ linkLoginAdmin }
                            href='/login-admin'
                            title='Inicia sesión de administrador'
                        >
                            INICIAR SESIÓN DE ADMINISTRADOR
                        </a>
                    :
                        <form
                            className={ adminForm }
                            onSubmit={ handleSetNewPassword }
                        >
                            <label htmlFor="password">NUEVO PASSWORD</label>
                            <input 
                                type="text" 
                                name='password' 
                                id='password' 
                                placeholder='Nuevo password'
                                onChange={ handleChange } 
                                value={ form.password }
                            />
                            <label htmlFor="newPassword">CONFIRMA TU NUEVO PASSWORD</label>
                            <input 
                                type="text" 
                                name='newPassword' 
                                id='newPassword' 
                                placeholder='Confirma el password' 
                                onChange={ handleChange }
                                value={ form.newPassword }
                            />
                            <button
                                className={ isDisabled ? disabled : '' }
                                type='submit'
                                disabled={ isDisabled }
                            >
                                CREAR NUEVO PASSWORD

                            </button>
                        </form>
            }
        </div>
    </div>
  );
};

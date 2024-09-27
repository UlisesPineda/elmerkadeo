import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    mainContainer,
    adminForm,
    disabled,
    linkLoginAdmin,
} from './styles/ChangeAdminPasswordPage.module.css';
import { useForm, useValidateForm } from '../hooks';
import { useUserAuth } from '../hooks';

export const ChangeUserPasswordPage = () => {

    const { token } = useParams();

    const [isDisabled, setIsDisabled] = useState(false);
    const [isReseted, setIsReseted] = useState(false);

    const { resetUserPassword } = useUserAuth();
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
                    await resetUserPassword( token, form ) &&
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
                            href='/login'
                            title='Inicia sesión de administrador'
                        >
                            INICIAR SESIÓN
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

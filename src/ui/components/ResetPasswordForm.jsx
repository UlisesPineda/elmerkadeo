import PropTypes from 'prop-types';

import {
    formContainer,
    disabledButton,
    forgotLink,
} from './styles/LoginForm.module.css';

import { useLocation } from 'react-router-dom';
import { useAdminAuth, useForm, useUserAuth, useValidateForm } from '../hooks';

export const ResetPasswordForm = ({ handleTypeForm }) => {

    const { pathname } = useLocation();

    const { reqChangeUserPassword } = useUserAuth();
    const { reqChangeAdminPassword } = useAdminAuth();
    const { validateEmptyInput, validateUserEmail } = useValidateForm();
    const { 
        form, 
        handleChange, 
        isDisabled, 
        disabledActions, 
        enableActions, 
        setIsDisabled 
    } = useForm({ email: '' });

    const actionForm = async() => {
        if( pathname === '/login' ) {
          return await reqChangeUserPassword( form );
        }
        if ( pathname === '/login-admin' ) {
          return await reqChangeAdminPassword( form );
        }
      };    

    const handleResetPassword = async(e) => {
        e.preventDefault();
        validateEmptyInput( form ) &&
          validateUserEmail( form ) &&
            disabledActions() &&
              await actionForm() ?
                enableActions() :
                    setIsDisabled( false );
      };

  return (
    <form
        className={`animationPage ${ formContainer }`}
        onSubmit={ handleResetPassword }
    >
        <label htmlFor="email">Correo</label>
        <input 
            type="text"
            name="email"
            id="email" 
            placeholder="Correo de administrador"
            value={ form.email }
            onChange={ handleChange }
            autoComplete='on'
        />
        <button
            type="submit"
            disabled={ isDisabled }
            className={ isDisabled ? disabledButton : '' }
        >
            Reestablecer Password
        </button>
        <span
            className={ forgotLink }
            onClick={ handleTypeForm }
        >
            Iniciar Sesión
        </span>
    </form>
  );
};

ResetPasswordForm.propTypes = {
    handleTypeForm: PropTypes.func,
};

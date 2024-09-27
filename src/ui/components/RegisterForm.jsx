import PropTypes from 'prop-types';

import {
    formContainer,
    linkForm,  
    checkboxContainer,
    disabled,
} from './styles/LoginForm.module.css';
import { useForm, useUserAuth, useValidateForm } from '../hooks';
import { useState } from 'react';

export const RegisterForm = ({ handleTypeForm }) => {

    const [isAccepted, setIsAccepted] = useState( false );

    const { registerUser } = useUserAuth();
    const { validateEmptyInput, validateTermsInput, validateRegisterUserForm } = useValidateForm();
    const { form, handleChange, isDisabled, enableActions, disabledActions } = useForm({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { userName, email, password, confirmPassword } = form;

    const handleCheckboxValue = (e) => {
        setIsAccepted( e.target.checked );
    };

    const handleRegisterUser = async(e) => {
        e.preventDefault();
        validateEmptyInput( form ) &&
            validateTermsInput( isAccepted ) &&
                validateRegisterUserForm( form ) &&
                    disabledActions() &&
                        await registerUser( form, isAccepted ) &&
                            enableActions();
    };
      
  return (
    <form
        className={`animationPage ${ formContainer }`}
        onSubmit={ handleRegisterUser }
    >
        <label htmlFor="userName">Nombre de usuario</label>
        <input 
            type="text"
            name="userName"
            id="userName" 
            placeholder="Tu nombre de usuario"
            value={ userName }
            onChange={ handleChange }
            autoComplete='on'
        />
        <label htmlFor="email">Correo</label>
        <input 
            type="text"
            name="email"
            id="email" 
            placeholder="Correo"
            value={ email }
            onChange={ handleChange }
            autoComplete='on'
        />
        <label htmlFor="password">Password</label>
        <input 
            type="text" 
            name="password"
            id="password"
            placeholder="Crea tu password"
            value={ password }
            onChange={ handleChange }
        />
        <label htmlFor="confirmPassword">Confirma tu password</label>
        <input 
            type="text" 
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirma tu password"
            value={ confirmPassword }
            onChange={ handleChange }
        />
        <div
            className={ checkboxContainer }
        >
            <label htmlFor="terms">
                Acepto los <br /> 
                <a 
                    href="/terminos-y-condiciones"
                    target='_blank'
                    rel='noreferer noopener'    
                >
                    Términos y Condiciones
                </a>
            </label>
            <input 
                onChange={ handleCheckboxValue }
                key={ isDisabled }
                type="checkbox" 
                id='terms'
            />
        </div>
        <button
            className={ isDisabled ? disabled : '' }
            disabled={ isDisabled }
            type="submit"
        >
            REGISTRARSE
        </button>
        <span
            className={ linkForm }
        >
        ¿Ya tienes cuenta?<br />
        <span
            onClick={ handleTypeForm }
        >
            Inicia Sesión
        </span>
        </span>
    </form>
  );
};

RegisterForm.propTypes = {
    handleTypeForm: PropTypes.func.isRequired,
};

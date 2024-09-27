import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  loginFormContainer,
} from './styles/LoginUserPage.module.css';

import { Navigate } from 'react-router-dom';
import { LoginForm, RegisterForm } from '../components';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const LoginUserPage = () => {

  const { isUserAuth } = useSelector( state => state.userAuth );

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isResetForm, setIsResetForm] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isRender, setIsRender] = useState(false);


  const renderRegisterForm = () => {
    setIsLoginForm( false );
    setIsResetForm( false );
    setIsRegisterForm( true );
    setIsRender(!isRender);
  };
  
  const renderLoginForm = () => {
    setIsRegisterForm( false );    
    setIsResetForm( false );
    setIsLoginForm( true );
    setIsRender(!isRender);
  };
  
  const renderResetPasswordForm = () => {
    setIsRegisterForm( false );    
    setIsResetForm( true );
    setIsLoginForm( false );
    setIsRender(!isRender);
  };
  

  return (
    isUserAuth
      ? 
        <Navigate to='/carrito' />
      : 
        <div className="imageHeroeContainer">
          <div
            className={ loginFormContainer }
          >
            <h2 
              className='animationPage'
              key={ isRender }
            >
              {
                isLoginForm && 'Inicia sesión en tu cuenta de El Merkadeo' ||
                isResetForm && 'Solicita un nuevo password' ||
                isRegisterForm && 'Crea una cuenta en El Merkadeo'
              }
            </h2>
            {
              isLoginForm &&
                <LoginForm 
                  handleTypeForm={ renderRegisterForm }
                  handleResetPassForm={ renderResetPasswordForm }
                />
              }
            {
              isRegisterForm &&
                <RegisterForm 
                  handleTypeForm={ renderLoginForm }
                />
            }
            {
              isResetForm &&
                <ResetPasswordForm 
                  handleTypeForm={ renderLoginForm }
                />
            }
          </div>
        </div>
  );
};

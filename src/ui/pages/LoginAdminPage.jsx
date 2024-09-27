import { useState } from 'react';

import { LoginForm } from '../components';
import {
  loginFormContainer,
} from './styles/LoginAdminPage.module.css';
import { ResetPasswordForm } from '../components/ResetPasswordForm';



export const LoginAdminPage = () => {

  const [isLoginForm, setIsLoginForm] = useState(true);

  const renderAdminForm = () => {
    setIsLoginForm( !isLoginForm );
  };

  return (
    <div className="imageHeroeContainer">
      <div
        className={ loginFormContainer }
        >
        <h2 className='animationPage'>
          { isLoginForm ? 'Inicia sesión en tu panel de administración' : 'Solicita el reestablecimiento de tu password' }
        </h2>
        {
          isLoginForm 
            ?
              <LoginForm 
                handleResetPassForm={ renderAdminForm }
              />
            :
              <ResetPasswordForm 
                handleTypeForm={ renderAdminForm }
              />
        }
      </div>
    </div>
  );
};

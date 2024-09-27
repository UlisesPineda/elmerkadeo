import { useState } from 'react';

import {
  sectionContainer,
  settingsContainer,
  editIcon,
  settingsUserForm,
  inputContainer,
  confirmIcon,
  show,
  hide,
  formContainer,
  adressIcon,
  disabled,
} from './styles/SettingsUserPage.module.css';
import { useForm, useUserAuth, useValidateForm } from '../hooks';
import { useSelector } from 'react-redux';

export const SettingsUserPage = () => {

  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditAdress, setIsEditAdress] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { user } = useSelector( state => state.userAuth );

  const { validateUserName, validateUserEmail, validateUserPasswordSingle, validateUserAdress } = useValidateForm();
  const { 
    changeUserName, 
    changeUserEmail, 
    changeUserPassword, 
    changeUserAdress,
  } = useUserAuth();
  const { form, handleChange, resetForm } = useForm({
    userName: '',
    email: '',
    password: '',
    adress: '',
    district: '',
    zipcode: '',
    city: '',
  });
  const { 
    userName,
    email,
    password,
    adress,
    district,
    zipcode,
    city,
  } = form;

  const disableFormActions = () => {
    setIsDisabled( true );
    return true;
  };

  const enableFormActions = () => {
    resetForm();
    setIsEditName( false );
    setIsEditEmail( false );
    setIsEditPassword( false );
    setIsEditAdress( false );
    setIsDisabled( false );
    return true;
  };

  const handleEditMode = (e) => {
    const inputType = e.target.getAttribute('data-type');
    switch ( inputType ) {
      case 'user-name':
        setIsEditEmail( false );
        setIsEditPassword( false );
        setIsEditAdress( false );
        setIsEditName( true );
        break;    
      case 'user-email':
          setIsEditName( false );
          setIsEditPassword( false );
          setIsEditAdress( false );
          setIsEditEmail( true );
        break;    
      case 'user-password':
          setIsEditName( false );
          setIsEditEmail( false );
          setIsEditAdress( false );
          setIsEditPassword( true );
        break;   
      case 'user-adress':
          setIsEditName( false );
          setIsEditEmail( false );
          setIsEditPassword( false );
          setIsEditAdress( true );
        break;   
    } 
  };

  const handleChangeData = async(e) => {
    e.preventDefault();
    isEditName &&
      validateUserName( form ) &&
        disableFormActions() &&
          await changeUserName( form ) &&
            enableFormActions();
    isEditEmail &&
      validateUserEmail( form ) &&
        disableFormActions() &&
          await changeUserEmail( form ) &&
            enableFormActions();
    isEditPassword &&
      validateUserPasswordSingle( form ) &&
        disableFormActions() &&
          await changeUserPassword( form ) &&
            enableFormActions(); 
    isEditAdress &&
      validateUserAdress( form ) &&
        disableFormActions() &&
          await changeUserAdress( form ) &&
            enableFormActions();
  };


  return (
    <div
        className='imageHeroeContainer'
    >
      <section
        className={`animationPage ${ sectionContainer }`}
      >
        <h2>Información de tu cuenta</h2>
        <div
          className={ settingsContainer }
        >
          <div
            className={ formContainer }
          >
            <form
              className={ settingsUserForm }
              onSubmit={ handleChangeData }
            >
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditName ? hide : show }
                `}
              >
                <p>Nombre:</p>
                <p> { user.userName } </p>
                <button
                  className={ editIcon }
                  onClick={ handleEditMode }
                  data-type='user-name'
                  type='button'
                  title='Cambiar nombre'
                ></button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditName ? show : hide }
                `}            
              >
                <label htmlFor="userName">Nombre:</label>
                <input 
                  type="text" 
                  name='userName'
                  placeholder='Ingresa tu nuevo nombre'
                  value={ userName }
                  onChange={ handleChange }
                />
                <button
                    className={`
                      ${ confirmIcon }
                      ${ isDisabled ? disabled : '' } 
                    `}
                    disabled={ isDisabled }
                    type='submit'
                    title='Confirmar cambios'                
                >
                </button>
              </div>
            </form>
            <form
              className={ settingsUserForm }
              onSubmit={ handleChangeData }
            >
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditEmail ? hide : show }
                `}          
              >
                <p>Correo:</p>
                <p> { user.email } </p>
                <button
                  className={ editIcon }
                  onClick={ handleEditMode }
                  data-type='user-email'
                  type='button'
                  title='Cambiar correo'
                ></button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditEmail ? show : hide }
                `}                        
              >
                <label htmlFor="email">Correo:</label>
                <input 
                  type="email" 
                  name='email' 
                  id='email'
                  placeholder='Ingresa tu nuevo correo'
                  value={ email }
                  onChange={ handleChange }
                />
                <button
                    className={`
                      ${ confirmIcon }
                      ${ isDisabled ? disabled : '' } 
                    `}
                    disabled={ isDisabled }
                    type='submit'
                    title='Confirmar cambios'                
                >
                </button>
              </div>
            </form>
            <form
              className={ settingsUserForm }
              onSubmit={ handleChangeData }
            >
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditPassword ? hide : show }
                `}          
              >
                <p>Password:</p>
                <p>**********</p>
                <button
                  className={ editIcon }
                  onClick={ handleEditMode }
                  data-type='user-password'
                  type='button'
                  title='Cambiar password'
                ></button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditPassword ? show : hide }
                `}                    
              >
                <label htmlFor="password">Password:</label>
                <input 
                  type="text" 
                  name='password' 
                  id='password'
                  placeholder='Ingresa tu nuevo password'
                  value={ password }
                  onChange={ handleChange }
                />
                <button
                    className={`
                      ${ confirmIcon }
                      ${ isDisabled ? disabled : '' } 
                    `}
                    disabled={ isDisabled }
                    type='submit'
                    title='Confirmar cambios'                
                >
                </button>
              </div>
            </form>
          </div>
          <div  
            className={ formContainer }
          >
            <form
              className={ settingsUserForm }
              onSubmit={ handleChangeData }
            >
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditAdress ? hide : show }
                `}          
              >
                <p>Dirección:</p>
                <p> { user.adress?.adress } </p>
                <button
                  className={ editIcon }
                  onClick={ handleEditMode }
                  data-type='user-adress'
                  type='button'
                  title='Editar dirección de entrega'
                ></button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditAdress ? show : hide }
                `}                    
              >
                <label htmlFor="adress">Dirección:</label>
                <input 
                  type="text" 
                  name='adress' 
                  id='adress'
                  placeholder='Ingresa tu calle y número exterior e interior'
                  value={ adress }
                  onChange={ handleChange }
                />
                <button
                    className={`
                      ${ confirmIcon }
                      ${ isDisabled ? disabled : '' } 
                    `}
                    disabled={ isDisabled }
                    type='submit'
                    title='Confirmar cambios'                
                >
                </button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditAdress ? hide : show }
                `}          
              >
                <p>Colonia:</p>
                <p> { user.adress?.district } </p>
                <button
                  className={`
                    ${ editIcon }
                    ${ adressIcon }
                  `}
                  type='button'
                ></button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditAdress ? show : hide }
                `}                    
              >
                <label htmlFor="district">Colonia:</label>
                <input 
                  type="text" 
                  name='district' 
                  id='district'
                  placeholder='Ingresa tu colonia'
                  value={ district }
                  onChange={ handleChange }
                />
                <button
                  className={`
                    ${ confirmIcon }
                    ${ adressIcon }
                  `}
                  type='button'
                >
                </button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditAdress ? hide : show }
                `}          
              >
                <p>Código Postal:</p>
                <p> { user.adress?.zipcode } </p>
                <button
                  className={`
                    ${ editIcon }
                    ${ adressIcon }
                  `}
                  type='button'
                ></button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditAdress ? show : hide }
                `}                    
              >
                <label htmlFor="zipcode">Código Postal:</label>
                <input 
                  type="text" 
                  name='zipcode' 
                  id='zipcode'
                  placeholder='Ingresa tu código postal'
                  value={ zipcode }
                  onChange={ handleChange }
                />
                <button
                  className={`
                    ${ confirmIcon }
                    ${ adressIcon }
                  `}
                  type='button'
                >
                </button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditAdress ? hide : show }
                `}          
              >
                <p>Ciudad y Estado:</p>
                <p> { user.adress?.city } </p>
                <button
                  className={`
                    ${ editIcon }
                    ${ adressIcon }
                  `}
                  data-type='user-adress'
                  type='button'
                ></button>
              </div>
              <div
                className={`
                  ${ inputContainer }
                  ${ isEditAdress ? show : hide }
                `}                    
              >
                <label htmlFor="city">Ciudad y Estado:</label>
                <input 
                  type="text" 
                  name='city' 
                  id='city'
                  placeholder='Ingresa tu ciudad y estado'
                  value={ city }
                  onChange={ handleChange }
                />
                <button
                    className={`
                      ${ confirmIcon }
                      ${ adressIcon }
                    `}
                    type='button'
                    title='Confirmar cambios'                
                >
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

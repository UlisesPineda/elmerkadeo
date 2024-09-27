import { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  siteFooter,
  blockFooterOne,
  linkFooter,
  blockFooterContainer,
  blockFooterTwo,
  suscribeForm,
  iconCard,
  masterCard,
  visa,
  amex,
  stripe,
  secure,
  disabled,
} from './styles/Footer.module.css';

import { useForm, useSuscriberData, useValidateForm } from '../hooks';

export const Footer = () => {

  const [isDisabled, setIsDisabled] = useState(false);

  const { addSuscriber } = useSuscriberData();
  const { validateEmptyInput, validateSuscriberForm } = useValidateForm();
  const { form, handleChange, resetForm } = useForm({
    suscriber: '',
    email: '',
  });

  const disabledActions = () => {
    setIsDisabled( true );
    return true;
  };

  const enableActions = () => {
    setIsDisabled( false );
    resetForm();
  };

  const handleSuscription = async(e) => {
    e.preventDefault();
    validateEmptyInput( form ) &&
      validateSuscriberForm( form ) &&
        disabledActions() &&
          await addSuscriber( form ) &&
            enableActions();
  };

  return (
      <footer 
        className={ siteFooter }
      >
        <div className={ blockFooterContainer }>
          <div className={ blockFooterOne }>
          <h4>NEWSLETTER</h4>
            <form 
              className={ suscribeForm }
              onSubmit={ handleSuscription }
            >
              <p>Suscríbete y recibe actualizaciones de esta plantilla y ofertas especiales para tu ecommerce.</p>
              <label htmlFor="suscriber">Nombre:</label>
              <input 
                type="text" 
                id='suscriber'
                name='suscriber'
                placeholder='Ingresa tu nombre'
                value={ form.suscriber }
                onChange={ handleChange }
              />
              <label htmlFor="email">Correo:</label>
              <input 
                type="text" 
                id='email'
                name='email'
                placeholder='Ingresa tu correo'
                value={ form.email }
                onChange={ handleChange }
                autoComplete='on'
              />
              <button 
                type='submit'
                disabled={ isDisabled }
                className={ isDisabled ? disabled : '' }
              >
                Suscribirse
              </button>
            </form>

          </div>
          <div className={ blockFooterOne }>
            <h4>ACERCA DE EL MERKADEO</h4>
            <p>Este sitio web es una demo de un ecommerce funcional, todos los productos y precios publicados en este sitio son solo demostrativos y no representan una oferta real por lo que, no representa en manera alguna obligación o responsabilidad por parte de: www.elmerkadeo.com.</p>
            <p>Aunque todos los productos y precios son solo con fines ilustrativos, sí podrás abrir una cuenta de usuario para conocer todas las funcionalidades de esta plantilla de ecommerce.</p>
            <p>Si deseas comprar esta plantilla para tu propio ecommerce con todas las funcionalidades aquí presentadas, por favor ponte en contacto con nuestro departamento de ventas: <strong>ventas@codigoliquido.com</strong></p>
          </div>
          <div className={ blockFooterOne }>
            <h4>ATRIBUCIONES</h4>
            <p>Todas las imagenes que se usaron en el desarrollo de este sitio web son de uso grauito y fueron descargadas desde el sitio web: <a href="https://unsplash.com/es" target='_blank' rel='nofollow noopener noreferrer'>www.unsplash.com</a>.</p>
            <p>En el siguiente listado puedes ver el trabajo de cada uno de los autores en donde podrás ver más de su portafolio:</p>
            <a href="https://unsplash.com/es/@pawel_czerwinski" target='_blank' rel='nofollow noopener noreferrer'>Pawel Czerwinski</a>
            <a href="https://unsplash.com/es/@saradabaghian" target='_blank' rel='nofollow noopener noreferrer'>Sara Dabaghian</a>
            <a href="https://unsplash.com/es/@patrick_gillespie" target='_blank' rel='nofollow noopener noreferrer'>Patrick Gillespie</a>
            <a href="https://unsplash.com/es/@photography_by_feaver" target='_blank' rel='nofollow noopener noreferrer'>James Feaver</a>
            <a href="https://unsplash.com/es/@photologic" target='_blank' rel='nofollow noopener noreferrer'>Bruce Christianson</a>
            <a href="https://unsplash.com/es/@kermen_photography" target='_blank' rel='nofollow noopener noreferrer'>Kermen Tutkunova</a>
            <a href="https://unsplash.com/es/@ilonapurdes" target='_blank' rel='nofollow noopener noreferrer'>Ilona Purdes</a>
            <a href="https://unsplash.com/es/@laurachouette" target='_blank' rel='nofollow noopener noreferrer'>Laura Chouette</a>
            <a href="https://unsplash.com/es/@enginakyurt" target='_blank' rel='nofollow noopener noreferrer'>Engin Akyurt</a>
            <a href="https://unsplash.com/es/@elashv" target='_blank' rel='nofollow noopener noreferrer'>Valerie Elash</a>
            <a href="https://unsplash.com/es/@melbinjacob" target='_blank' rel='nofollow noopener noreferrer'>Melbin Jacob</a>
            <a href="https://unsplash.com/es/@concretelies_photography" target='_blank' rel='nofollow noopener noreferrer'>Emmeline T.</a>
            <a href="https://unsplash.com/es/@photosbychalo" target='_blank' rel='nofollow noopener noreferrer'>Chalo Garcia</a>
            <a href="https://unsplash.com/es/@fromsarahtophotography" target='_blank' rel='nofollow noopener noreferrer'>Sarah Crego</a>
            <a href="https://unsplash.com/es/@pieschwarzler" target='_blank' rel='nofollow noopener noreferrer'>Pietra Schwarzler</a>
          </div>
        </div>
        <div className={ blockFooterContainer }>
          <div
            className={ blockFooterTwo }
          >
            <h4>Enlaces del Sitio</h4>
            <Link
              to='/login-admin'
              className={ linkFooter }
              title='Inicia sesión en tu panel de administrador'
            >
              Panel de Administración
            </Link>
            <Link
              to='/terminos-y-condiciones'
              className={ linkFooter }
              title='Consulta los términos y condiciones'
            >
              Términos y condiciones
            </Link>
            <Link
              to='/politica-de-cookies'
              className={ linkFooter }
              title='Consulta nuestra política de cookies'
            >
              Política de Cookies
            </Link>
            <Link
              to='/politica-de-privacidad'
              className={ linkFooter }
              title='Consulta nuestra política de privacidad'
            >
              Política de Privacidad
            </Link>
          </div>
          <div
            className={ blockFooterTwo }
          >
            <div
              className={`${ iconCard } ${ masterCard }`}
            ></div>
            <div
              className={`${ iconCard } ${ visa }`}
            ></div>
            <div
              className={`${ iconCard } ${ amex }`}
            ></div>
            <div
              className={`${ iconCard } ${ stripe }`}
            ></div>
            <div
              className={`${ iconCard } ${ secure }`}
            ></div>
          </div>
        </div>
      </footer>
    );   
};

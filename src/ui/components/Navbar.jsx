import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { 
  siteNavbar,
  menuContainer, 
  linkMenu,
  linkMenuBlack,
  logoDesktop,
  logoDesktopBlack,
  iconsMenu,
  cartBlack,
  userBlack,
  searchBlack,
  siteNavbarWhite,
  logoutBlack,
  settingsBlack,
  cartNumberInactive,
  cartNumberActive,
  siteNavbarScrolled,
  logoDesktopActive,
} from './styles/Navbar.module.css';

import { useUserAuth } from '../hooks';
import { calculateValue } from '../helpers/calculateValue';

export const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  const { logoutUser } = useUserAuth();

  const { isUserAuth } = useSelector( state => state.userAuth );
  const { userCart } = useSelector( state => state.cart );

  const products = userCart.map( cart => parseFloat( cart.quantity ) );
  const totalProducts = calculateValue( products );

  const startLogoutUser = () => {
    logoutUser();
  };

  const handleScroll = () => {
    window.scrollY > 85 
      ? setIsScrolled( true ) 
      : setIsScrolled( false );     
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <nav className={`
        ${ siteNavbar }
        ${ isScrolled ? siteNavbarWhite : '' }
        ${ isScrolled ? siteNavbarScrolled : '' }
      `}>
        <div className={ menuContainer }>
          <NavLink 
            to='/tienda' 
            title='Catálogo 2024'
            className={`
              ${ linkMenu }
              ${ linkMenuBlack }
            `}
          >
            COLECCIÓN 2024
          </NavLink>
        </div>
        <div className={ menuContainer }>
          <Link 
            to='/'
            title='El Merkadeo'
            className={`
              ${ logoDesktop } 
              ${ logoDesktopBlack }
              ${ isScrolled ? logoDesktopActive : '' }
            `} 
          ></Link>
        </div>
        <div className={ menuContainer }>
          <Link 
            to='/buscar'
            title='Buscar en la tienda'
            className={`
              ${ iconsMenu } 
              ${ searchBlack }
            `} 
          ></Link>
          <Link
            to='/carrito' 
            title='Carrito'
            className={`
              ${ iconsMenu } 
              ${ cartBlack }
            `} 
          >
            <span
              className={ userCart.length > 0 ? cartNumberActive : cartNumberInactive }
              key={ userCart.length }
            >
              { totalProducts }
            </span>
          </Link>
          {
            isUserAuth
              ?
                <>
                  <Link
                    to='configuracion'
                    title='Administra tu cuenta'
                    className={`
                      ${ iconsMenu }
                      ${ settingsBlack }
                    `}
                  />
                  <Link
                    to='/login' 
                    title='Terminar sesión'
                    onClick={ startLogoutUser }
                    className={`
                      ${ iconsMenu } 
                      ${ logoutBlack }
                    `} 
                  ></Link>
                </>
              :
                <Link
                  to='/login' 
                  title='Inicia sesión'
                  className={`
                    ${ iconsMenu } 
                    ${ userBlack }
                  `} 
                ></Link>
          }
        </div>
      </nav>
    </header>
  );
};

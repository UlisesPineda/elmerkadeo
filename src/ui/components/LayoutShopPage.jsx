import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { 
    categoryContainer,
    shopContainer,
    menuContainer, 
    menuTitleContainer,
    menuLinksContainer,
} from './styles/LayoutShopPage.module.css';
  
export const LayoutShopPage = ({ children }) => {

  const { categories } = useSelector( state => state.category );

  return (
    <section className="imageHeroeContainer">
      <div className={`${ shopContainer } ${ 'animationPage' }`}>
        <nav
          className={ menuContainer }
        >
          <div className={ menuTitleContainer }>
            Categorías:
          </div>
          <div className={ menuLinksContainer }>
            <NavLink to='/tienda' end>
              Todas
            </NavLink>
            {
              categories.map(
                ( category ) => {
                  return (
                    <NavLink 
                      key={ category._id }
                      to={ category.categoryUrl }
                    >
                      { category.categoryTitle }
                    </NavLink>
                  )
                }
              )
            }
          </div>
        </nav>
        <div 
          className={ categoryContainer }
        >
          { children }
        </div>
      </div>
    </section>
  );
};

LayoutShopPage.propTypes = {
    children: PropTypes.element.isRequired,
};

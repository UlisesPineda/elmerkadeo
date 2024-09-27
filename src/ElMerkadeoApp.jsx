import { useDispatch, useSelector } from 'react-redux';

import { HeroeCarousel, WhiteHeroeSection } from './ui/components';

import { onSelectedCategory } from './store/slices';


export const ElMerkadeoApp = () => {

  const dispatch = useDispatch()
  
  const { promos } = useSelector( state => state.promo );
  const { categories } = useSelector( state => state.category );
  const { totalProductsUser } = useSelector( state => state.productsUser );

  const handleSelectedCategory = (e) => {
    const category = e.target.getAttribute('data-category');
    const selectedCategory = totalProductsUser.filter( products => products.category === category );
    dispatch( onSelectedCategory( selectedCategory ) );
  };

  return (
    <>
      <section className="imageHeroeContainer">
        <HeroeCarousel 
          promos={ promos }
        />
      </section>
      <section className="whiteHeroeSection">
        <WhiteHeroeSection 
          handleSelectedCategory={ handleSelectedCategory }
          categories={ categories }
        />
      </section>
    </>
  );
};

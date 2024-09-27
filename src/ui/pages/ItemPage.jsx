import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { 
  itemContainer,
  imgContainer,
  infoContainer,
  counterContainer,
  addCartButton,
  selectContainer,
  priceItem,
  animaTion,
  isSoldOutClass,
} from './styles/ItemPage.module.css';
import { useCartData, useValidateForm } from '../hooks';
import { createArray } from '../../helpers';
import { ItemCarousel } from '../components';


export const ItemPage = () => {
  
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(1);
  const [colorSelected, setColorSelected] = useState('');
  const [sizeSelected, setSizeSelected] = useState('');
  
  const { item } = useParams();
  const { validateSelectInput } = useValidateForm();
  const { addItemToCart } = useCartData();
  const { totalProductsUser } = useSelector( state => state.productsUser );
  const { userCart } = useSelector( state => state.cart );

  const selectedProduct = totalProductsUser.filter( product => product.url === item );
  const { images, item: itemTitle, description, price, urlProduct, isSoldOut } = selectedProduct[0];
  const priceFormat = price.replace(",", "");
  const priceNumber = parseFloat(priceFormat);
  const colorArray = createArray( selectedProduct[0].color );
  const sizeArray = createArray( selectedProduct[0].size );
  
  const increaseCounter = () => setCounter(counter + 1);
  const decreaseCounter = () => counter === 1 ? counter : setCounter( counter -1 );
  const handleSelectColor = (e) => {
    setColorSelected( e.target.value );
  };
  const handleSelectSize = (e) => {
    setSizeSelected( e.target.value );
  };

  useEffect(() => {
    setIsClicked( true )
    const animation = setInterval(() => {
      setIsClicked( false );
    }, 1000);
    return () => {
      clearInterval( animation );
    }
  }, [ userCart.length ]);

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const itemCart = {
      prductId: v4(),
      itemTitle,
      price,
      size: sizeSelected,
      color: colorSelected,
      quantity: counter,
      image: images[0].url,
      subtotal: parseFloat((priceNumber * counter).toFixed(2)),
      url: urlProduct,
    };
    validateSelectInput( sizeSelected, colorSelected ) &&
      addItemToCart( itemCart );    
  };  
  

  return (
    <div className="imageHeroeContainer">
      <div className={` ${ itemContainer } ${ 'animationPage' } `}>
        <div className={ imgContainer }>
          <ItemCarousel 
            item={ images }
          />
        </div>
        <form 
          className={ infoContainer }
          onSubmit={ handleAddItemToCart }
        >
          <h3> { itemTitle } </h3>
          <p>
            { description }
          </p>
          <big className={ priceItem }>
            $ <span> { price } </span>
          </big>
          <div
            className={ selectContainer }
          >
            <select 
              name='color' 
              id='color'
              onChange={ handleSelectColor }
            >
              <option value="Selecciona">Selecciona el color</option>
              {
                colorArray.map(
                  (color, i) => {
                    return (
                      <option
                        key={ i }
                        value={ color }
                      >
                        { color }
                      </option>
                    )
                  }
                )
              }
            </select>
          </div>
          <div
            className={ selectContainer }
          >
            <select 
              name='size' 
              id='size'
              onChange={ handleSelectSize }
            >
              <option value="Selecciona">Selecciona tu talla</option>
              {
                sizeArray.map(
                  ( size, i ) => {
                    return (
                      <option
                        key={ i }
                        value={ size }
                      >
                        { size }
                      </option>
                    )
                  }
                )
              }
            </select>
          </div>
          <div
            className={ counterContainer }
          >
            <button
              onClick={ decreaseCounter }
              type='button'
            >-</button>
            <span>{ counter }</span>
            <button
              onClick={ increaseCounter }
              type='button'
            >+</button>
          </div>
          <button 
            className={` 
              ${ addCartButton } 
              ${ isClicked ? animaTion : '' } 
              ${ isSoldOut ? isSoldOutClass : '' }
            `}
            disabled={ isSoldOut }
            type='submit'
          >
            { isSoldOut ? 'AGOTADO' : 'AÑADIR AL CARRITO' }
          </button>
        </form>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { 
  cartContainer,
  contentContainer,
  itemContainer,
  resumeContainer,
  itemImg,
  itemDescription,
  itemPrice,
  itemDeleteIcon,
  itemBox,
  descriptionContainer,
  itemQuantity,
  itemColor,
  itemSize,
  cardInput,
  formPayment,
  dataPayment,
  safePayment,
  safePaymentLogo,
  hideButton,
  showFormPayment,
  quantityPayment,
  disablePayButton,
  itemPurchased,
  purchasedContainer,
  itemDate,
  itemOrder,
} from './styles/CartPage.module.css';

import { useCartData } from '../hooks';
import { formatOrderDate, formatPrice } from '../helpers';
import { calculateValue } from '../helpers/calculateValue';
import { useAlertMessage } from '../hooks/useAlertMessage';

export const CartPage = () => {

  const [isGonnaPay, setIsGonnaPay] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [renderInput, setRenderInput] = useState(false);

  const { deleteItemCart, processPayment } = useCartData();
  const { startOpenAlert } = useAlertMessage();
  const stripe = useStripe();
  const elements = useElements();

  const { userCart, userPurchased } = useSelector( state => state.cart );
  const { isUserAuth, user } = useSelector( state => state.userAuth );

  const descriptions = userCart.map( cart => cart.itemTitle );
  const products = userCart.map( cart => parseFloat( cart.quantity ) );
  const subtotal = userCart.map( cart => parseFloat(cart.subtotal) );
  const totalProducts = calculateValue( products );
  const total = calculateValue( subtotal );  
  const displayPrice = formatPrice( total );

  const enableFormActions = () => {
    setIsPaying( false );
    setIsGonnaPay( false );
    setRenderInput( true );
  };

  const handleDeleteCartItem = (e) => {
    const id = e.target.getAttribute('data-id');
    const cartUpdated = userCart.filter( item => item.prductId !== id  );
    deleteItemCart( cartUpdated, setRenderInput, setIsGonnaPay );
  };

  const handlePaymentForm = () => {
    if ( !isUserAuth ) {
      startOpenAlert({
        title: 'Inicia sesión para realizar tu pago',
        text: 'Si áun no tienes cuenta, ¡registrate!',
        button: true,
      });
      return;
    }
    if ( displayPrice === '0.00' ) {
      startOpenAlert({
        title: 'Aún no tienes productos en tu carrito de compras',
        text: 'Visita nuestra tienda y selecciona algún producto',
        button: true,
      });
      return;
    }
    else {
      setIsGonnaPay( true );
    }
  };

  const handlePayment = async(e) => {
    e.preventDefault();
    setIsPaying( true );
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement( CardElement ),
    });
    if( error ) {
      console.log( error );
      startOpenAlert({
        title: error.message,
        text: 'Ingresa la información completa',
        button: true
      });
      setIsPaying( false );
    }
    else {
      const totalAmount = Number.parseInt( total * 100 );
      const { id } = paymentMethod;
      if( totalAmount === 0 ){
        startOpenAlert({
          title: 'Aún no hay productos en el carrito',
          text: 'Selecciona algún producto del catálogo',
          button: true,
        });
        setIsPaying( false );
        return;
      }
      await processPayment( id, totalAmount, descriptions, userCart, setRenderInput, setIsGonnaPay ) &&
        enableFormActions();
    }
  };

  return (
    <div className='imageHeroeContainer'>
        <div className={`animationPage ${ cartContainer }`}>
          {
            isUserAuth 
              ?
                <h2>Hola <span> { user.userName } </span>, estos son tus pedidos</h2>
              :
                <h2>Carrito de Compras</h2>
          }
          <div  
            className={ contentContainer }
          >
            <div
              className={ itemBox }
            >
              {
                userCart.length ?
                  userCart.map(
                    ( item, i ) => {
                      return (
                        <div
                          key={ i }
                          className={ itemContainer }
                        >
                          <img 
                            className={ itemImg }
                            src={ item.image }
                            alt={ item.itemTitle } 
                          />
                          <div  
                            className={ itemDescription }
                          >
                            { item.itemTitle }
                          </div>
                          <div  
                            className={ itemColor }
                          >
                            { item.color }
                          </div>
                          <div  
                            className={ itemSize }
                          >
                            { item.size }
                          </div>
                          <div
                            className={ itemPrice }
                          >
                            $ { item.price }
                          </div>
                          <div
                            className={ itemQuantity }
                          >
                            { item.quantity }
                          </div>
                          <div
                            className={ itemDeleteIcon }
                          >
                            <button
                              data-id={ item.prductId }
                              onClick={ handleDeleteCartItem }
                            >
                              X

                            </button>
                          </div>
                        </div>      
                      )
                    }
                  )
                :
                  <h3>Aún no has agreado productos al carrito</h3>
              }
            </div>

            <div
              className={ resumeContainer }
            >
                <div
                  className={ descriptionContainer }
                >
                  <p><span>{ totalProducts }</span> Prendas:</p>
                  <p>$ { displayPrice }</p>
                </div>
                <div
                  className={ descriptionContainer }
                >
                  <p><span>{ userCart.length }</span> Modelo(s)</p>
                </div>
                <div
                  className={ descriptionContainer }
                >
                  <p>Total</p>
                  <p>$ { displayPrice }</p>
                </div>
                <button
                  onClick={ handlePaymentForm }
                  className={ isGonnaPay ? hideButton : '' }
                >
                  PAGAR
                </button>
                <form
                  onSubmit={ handlePayment }
                  className={`
                    ${ formPayment }
                    ${ isGonnaPay ? showFormPayment : '' }
                  `}
                >
                  <div
                    className={ dataPayment }
                  >
                    <label htmlFor="card-input">completa tu pedido</label>
                    <CardElement 
                      className={ cardInput }
                      key={ renderInput }
                      id='card-input'
                    />
                    <div
                      className={ quantityPayment }
                    >
                      <span>Total a Pagar:</span>
                      <span> <span>$</span> { displayPrice } </span>
                    </div>
                    <button
                      className={ isPaying ? disablePayButton : '' }
                      disabled={ isPaying }
                      type='submit'
                    >
                      { isPaying ? 'PROCESANDO PAGO...' : 'PAGAR' }
                    </button>
                    <div
                      className={ safePayment }
                    >
                      <small>Pago Seguro Por</small>
                      <span className={ safePaymentLogo }></span>
                    </div>
                  </div>
                </form>
            </div>
          </div>
          {
            userPurchased?.length > 0 &&
              <div
                className={ purchasedContainer }
              >
                <h2>Pedidos Procesados</h2>
                <div
                  className={ itemPurchased }
                >
                  {
                    userPurchased.map(
                      ( item, i ) => {
                        return (
                          <Link
                            to={ item.url }
                            key={ i }
                            className={ itemContainer }
                          >
                            <img 
                              className={ itemImg }
                              src={ item.image }
                              alt={ item.itemTitle } 
                            />
                            <div  
                              className={ itemDescription }
                            >
                              { item.itemTitle }
                            </div>
                            <div  
                              className={ itemColor }
                            >
                              { item.color }
                            </div>
                            <div  
                              className={ itemSize }
                            >
                              { item.size }
                            </div>
                            <div
                              className={ itemQuantity }
                            >
                              { item.quantity }
                            </div>
                            <div
                              className={ itemDate }
                            >
                              <span>Fecha de compra:</span>
                              <span> { formatOrderDate( item.date ) } </span>
                            </div>
                            <div
                              className={ itemOrder }
                            >
                              <span>No Pedido:</span>
                              <span> { item.order } </span>
                            </div>
                          </Link>      
                        )
                      }
                    )
                  }
                </div>

              </div>
          }
        </div>
    </div>
  );
};

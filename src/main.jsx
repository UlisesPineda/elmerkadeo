import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';

import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter.jsx';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { store } from './store';

const stripePromise = loadStripe( import.meta.env.VITE_STRIPE_PUBLIC_KEY );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <Elements stripe={ stripePromise } >
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </Elements>
    </Provider>
  </React.StrictMode>
);

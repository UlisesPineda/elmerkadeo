import { useSelector } from 'react-redux';
import { useAlertMessage } from '../hooks/useAlertMessage';

import { 
    alertMessageContainer,
    messageContainer,
    hideButton,
} from './styles/AlertMessage.module.css'

export const AlertMessage = () => {

  const { startCloseAlert } = useAlertMessage();
  const { messages } = useSelector( state => state.alertMessage );

  return (
    <div
        className={ alertMessageContainer }
    >
      <div
        className={ messageContainer }
      >
        <h2>{ messages.title }</h2>
        <p>{ messages.text }</p>
        <button
          onClick={ startCloseAlert }
          className={ !messages.button ? hideButton : '' }
        >
          OK
        </button>
      </div>
    </div>
  );
};

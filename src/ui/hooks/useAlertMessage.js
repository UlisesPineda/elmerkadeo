import { useDispatch } from "react-redux";
import { onCloseAlertMessage, onOpenAlertMessage } from "../../store/slices";

export const useAlertMessage = () => {
    const dispatch = useDispatch();

    const startOpenAlert = ( title, text, button ) => {
        dispatch( onOpenAlertMessage( title, text, button ) );
    };

    const startCloseAlert = () => {
        dispatch( onCloseAlertMessage() );
    };

    return {
        startOpenAlert,
        startCloseAlert,
    };
};
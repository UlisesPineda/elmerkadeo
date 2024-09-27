import { useDispatch } from "react-redux";

import elMerkadeoAPI from "../../api/elMerkadeoAPI";
import { onLoadedPromos } from "../../store/slices";

export const usePromoData = () => {

    const dispatch = useDispatch();

    const getPromos = async() => {
        try {
            const { data } = await elMerkadeoAPI.get('promos/get-promos');
            if( !data.promos.length ){
                return;
            }
            else {
                dispatch( onLoadedPromos( data.promos ) );
            }
        } catch (error) {
            console.log( error );
        }
    };

    return {
        getPromos,
    };
};
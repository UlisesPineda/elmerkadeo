import { useDispatch } from "react-redux";

// import elMerkadeoAPI from "../../api/elMerkadeoAPI";
import { onLoadedPromos } from "../../store/slices";
import { promosJSON } from "../../data/ElMerkadeo.promos";

export const usePromoData = () => {

    const dispatch = useDispatch();

    const getPromos = async() => {
        try {
            // const { data } = await elMerkadeoAPI.get('promos/get-promos');
            // if( !data.promos.length ){
            //     return;
            // }
            if( !promosJSON.length ){
                return;
            }
            else {
                // dispatch( onLoadedPromos( data.promos ) );
                dispatch( onLoadedPromos( promosJSON ) );
            }
        } catch (error) {
            console.log( error );
        }
    };

    return {
        getPromos,
    };
};
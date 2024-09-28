import { useDispatch } from "react-redux";

// import elMerkadeoAPI from "../../api/elMerkadeoAPI.js";
import { onLoadedCategories } from "../../store/slices/categorySlice.js";
import { categoryJSON } from "../../data/ElMerkadeo.categories.js";

export const useCategoryData = () => {

    const dispatch = useDispatch();

    const getCategories = async() => {
        try {
            // const { data } = await elMerkadeoAPI.get('category/get-categories');
            // if ( !data.categories.length ){
            //     return;
            // }
            if( !categoryJSON.length ){
                return;
            }
            else {
                // dispatch( onLoadedCategories( data.categories ) );
                dispatch( onLoadedCategories( categoryJSON ) );
            }
        } catch (error) {
            console.log( error );
        }
    };


    return {
        getCategories,
    };
};
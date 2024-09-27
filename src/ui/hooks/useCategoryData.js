import { useDispatch } from "react-redux";

import elMerkadeoAPI from "../../api/elMerkadeoAPI.js";
import { onLoadedCategories } from "../../store/slices/categorySlice.js";

export const useCategoryData = () => {

    const dispatch = useDispatch();

    const getCategories = async() => {
        try {
            const { data } = await elMerkadeoAPI.get('category/get-categories');
            if ( !data.categories.length ){
                return;
            }
            else {
                dispatch( onLoadedCategories( data.categories ) );
            }
        } catch (error) {
            console.log( error );
        }
    };


    return {
        getCategories,
    };
};
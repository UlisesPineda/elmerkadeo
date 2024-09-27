import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { 
    catalogContainer,
    cardContainer,
    cardItem, 
} from './styles/CategoryCatalog.module.css';

export const CategoryCatalog = ({ products, keyValue }) => {


    return (
    <div className={ catalogContainer }>
        <div 
            key={ keyValue }
            className={` ${ cardContainer } ${ 'animationPage' } `}
        >
            {
                products.map(
                    ( card ) => {
                        return (
                            <div 
                                className={ cardItem }
                                key={ card._id }
                            >
                                <Link
                                    to={`/tienda/${card.normalizedUrlCategory}/${card.url}`}
                                >
                                    <img 
                                        src={ card.images[0].url }
                                        alt={ card.item } 
                                        data-id={ card._id }
                                    />
                                </Link>
                                <p>{ card.item }</p>
                                <p><span>$ </span>{ card.price }</p>
                            </div>
                        )
                    }
                )
            }
        </div>
    </div>
  );
};

CategoryCatalog.propTypes = {
    products: PropTypes.array,
    keyValue: PropTypes.any,
};

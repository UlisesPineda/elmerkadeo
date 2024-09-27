import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    whiteSectionContainer,
    cardContainer,
    cardCategory,
    imgCategory,
    imageLinkContainer,
} from './styles/WhiteHeroeSection.module.css';

export const WhiteHeroeSection = ({ categories, handleSelectedCategory }) => {
  return (
    <div
        className={`animationPage ${ whiteSectionContainer }`}
    >
        <h1>Plantilla Profesional de Comercio Electrónico</h1>
        <div
            className={ cardContainer }
        >
            {
                categories.map(
                    (card, i) => {
                        return (
                            <div
                                key={ i }
                                className={ cardCategory }
                            >
                                <Link
                                    to={ card.categoryUrl }
                                    onClick={ handleSelectedCategory }
                                    className={ imageLinkContainer }
                                >
                                    <img 
                                        src={ card.image[0].url } 
                                        alt={ card.categoryTitle } 
                                        className={ imgCategory }
                                        data-category={ card.categoryTitle }
                                    />
                                </Link>
                                <h3>
                                    { card.categoryTitle }
                                </h3>
                                <p>
                                    { card.categoryDescription }
                                </p>
                            </div>
                        )
                    }
                )
            }
        </div>
    </div>
  );
};

WhiteHeroeSection.propTypes = {
    categories: PropTypes.array.isRequired,
    handleSelectedCategory: PropTypes.func.isRequired,
};
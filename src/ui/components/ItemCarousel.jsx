import { useState } from 'react';
import PropTypes from 'prop-types';

import { 
    carouselContainer,
    carouselWrapper,
    carouselCard,
    carouselCardActive,
    imgCarousel,
    arrowLeft,
    arrowRight,
    carouselPagination,
    paginationDot,
    paginationDotActive,
    hidePagination,
  } from './styles/ItemCarousel.module.css';

export const ItemCarousel = ({ item }) => {

    const [current, setCurrent] = useState(0);

    const slideRight = () => {
        setCurrent(current === item.length - 1 ? 0 : current + 1);
    };
    const slideLeft = () => {
        setCurrent(current === 0 ? item.length - 1 : current - 1);
    };

    return (
        <div 
        className={ carouselContainer }
        >
            <div className={ carouselWrapper }>
                {
                    item.map(
                        ( slide, i ) => {
                            return (
                                <div
                                    key={ i }
                                    className={ `${ carouselCard } ${ i === current && carouselCardActive  }` }
                                >
                                <img 
                                    className={ imgCarousel }
                                    src={ slide.url } 
                                    alt={ slide } 
                                />
                                </div>
                            )
                        }
                    )
                }
                <div 
                    className={` ${ carouselPagination } ${ item.length <= 1 ? hidePagination : '' } `}
                >
                    <div
                        className={ arrowLeft }
                        onClick={ slideLeft }
                    >
                        &lsaquo;
                    </div>
                        {
                            item.map(
                            ( figure, i ) => {
                                return (
                                    <div
                                        key={ i }
                                        className={`${ paginationDot } ${ i === current && paginationDotActive }`}
                                    ></div>
                                )
                            }
                            )
                        }
                    <div
                        className={ arrowRight }
                        onClick={ slideRight }
                    >
                        &rsaquo;
                    </div>
                </div>
            </div>
        </div>
    );    
};

ItemCarousel.propTypes = {
    item: PropTypes.array,
};

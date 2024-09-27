import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { 
  buttonCarousel,
  carouselContainer,
  carouselWrapper,
  carouselCard,
  carouselCardActive,
  cardTextContainer,
  imgCarousel,
  arrowLeft,
  arrowRight,
  carouselPagination,
  paginationDot,
  paginationDotActive,
} from './styles/HeroeCarousel.module.css';

export const HeroeCarousel = ({ promos }) => {

  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  let timeOut;
  
  const slideRight = () => {
    setCurrent(current === promos.length - 1 ? 0 : current + 1);
  };
  const slideLeft = () => {
    setCurrent(current === 0 ? promos.length - 1 : current - 1);
  };

  const stopCarousel = () => {
    setAutoPlay( false );
    clearTimeout( timeOut );
  };
  const startCarousel = () => {
    setAutoPlay( true );
  };

  useEffect(() => {
    timeOut = 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    autoPlay && 
      setTimeout(() => {
        slideRight();
      }, 4000);
  });

  return (
    <div 
      className={`${ carouselContainer } ${ 'animationPage' }`}
      onMouseEnter={ stopCarousel }
      onMouseLeave={ startCarousel }
    >
      <div className={ carouselWrapper }>
        {
          promos.map(
            ( slide, i ) => {
              return (
                <div
                  key={ i }
                  className={ `${ carouselCard } ${ i === current && carouselCardActive  }` }
                >
                  <img 
                    className={ imgCarousel }
                    src={ slide.image[0].url } 
                    alt={ slide.promoItem } 
                  />
                  <Link
                    to={ slide.urlPromo }
                    title={ slide.promoItem }
                    className={ buttonCarousel }
                  >
                    ver detalles
                  </Link>
                  <div
                    className={ cardTextContainer }
                  >
                    <h2>
                      { slide.promoItem }
                    </h2>
                    <big>
                      { slide.promoDescription }
                    </big>
                  </div>
                </div>
              )
            }
          )
        }
        <div
          className={ arrowLeft }
          onClick={ slideLeft }
        >
          &lsaquo;
        </div>
        <div
          className={ arrowRight }
          onClick={ slideRight }
        >
          &rsaquo;
        </div>
        <div className={ carouselPagination }>
          {
            promos.map(
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
        </div>
      </div>
    </div>
  );
};

HeroeCarousel.propTypes = {
  promos: PropTypes.array,
};

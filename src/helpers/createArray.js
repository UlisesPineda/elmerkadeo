export const createArray = ( text ) => {
    return text.split(',').map( el => el.trim() );
};
  
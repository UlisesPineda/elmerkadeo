export const formatOrderDate = ( time ) => {
    let formatedDate;
    const date = new Date( time );
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    formatedDate = `${ day} / ${ month } / ${ year }`;
    return formatedDate;
};
export const calculateValue = ( arrayNumber ) => {
    const totalValue = arrayNumber.reduce(
        ( currentValue, value ) => {
            return currentValue + value;
        }, 0
    );
    return totalValue;
};
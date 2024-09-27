import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CategoryCatalog } from '../components';
import { useForm, useProductData, useValidateForm } from '../hooks';
import { 
  searchContainer, 
  formContainer,
  searchForm,
  resultContainer,
  disabled,
} from './styles/SearchPage.module.css';

export const SearchPage = () => {

  const [isDisabled, setIsDisabled] = useState( false );

  const { isSearchloaded, searchProducts, totalProductsUser } = useSelector( state => state.productsUser );
  const activeProducts = searchProducts.filter( products => products.isSoldOut === false );
  const defaultProducts = totalProductsUser.filter( product => product.category === 'Rebajas' )

  const { searchProduct } = useProductData();
  const { validateEmptyInput, validateSearchProductForm } = useValidateForm();
  const { form, handleChange, resetForm } = useForm({
    queryItem: '',
  });

  const disabledActions = () => {
    setIsDisabled( true );
    return true;
  };

  const enableActions = () => {
    setIsDisabled( false );
    resetForm();
  };

  const handleSearchProduct = (e) => {
    e.preventDefault();
    validateEmptyInput( form ) &&
      validateSearchProductForm( form ) &&
        disabledActions() &&
          searchProduct( form ) &&
            enableActions()
  };

  console.log( defaultProducts );

  return (
    <section className="imageHeroeContainer">
        <div className={`animationPage ${ searchContainer }`}>
          <div className={ formContainer }>
            <form 
              className={ searchForm }
              onSubmit={ handleSearchProduct }
            >
              <label htmlFor="queryItem">Buscar producto</label>
              <input 
                type="text" 
                name="queryItem" 
                id="queryItem" 
                placeholder='Término de búsqueda'
                value={ form.queryItem }
                onChange={ handleChange }
              />
              <button
                type='submit'
                disabled={ isDisabled }
                className={ isDisabled ? disabled : '' }
              >
                BUSCAR
              </button>
            </form>
          </div>
          <div
            className={ resultContainer }
          >
            <h3> { isSearchloaded ? 'Resultados de tu última búsqueda:' : 'Busca una prenda de tu interés o explora nuestra sugerencia del día' } </h3>
            {
              <CategoryCatalog 
                products={ isSearchloaded ? activeProducts : defaultProducts }
                keyValue={ isSearchloaded ? activeProducts : defaultProducts }
                isSearchloaded={ isSearchloaded }
              />
            }
          </div>
        </div>
    </section>
  );
};


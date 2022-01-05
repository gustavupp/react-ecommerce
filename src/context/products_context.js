import React, { useContext, useState, useReducer, useEffect } from 'react';
import productsReducer from '../reducers/productsReducer';
import {commerce} from '../lib/commerce'

const ProductsContext = React.createContext();

const initialState = {
products: [],
featured_products: [],
isSidebarOpen: false,
products_loading: false,
products_error: false,
single_product: [],
single_product_loading: false,
single_product_error: false,
}

const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);

      //fetch all products from commerceJs API 
    const fetchProducts = async () => {
      dispatch({ type: 'GET_PRODUCTS_BEGIN' });
      await commerce.products.list().then((res) => {
       dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: res.data });
      }).catch(() => {
        dispatch({ type: 'GET_PRODUCTS_ERROR' });
      });
    }

    //fetch single product when a product is clicked on
    const fetchSingleProduct = async (id) => {
      dispatch({ type: 'GET_SINGLE_PRODUCT_BEGIN' });
      await commerce.products.retrieve(id).then((product) => {
       dispatch({ type: 'GET_SINGLE_PRODUCT_SUCCESS', payload: product });
       console.log(product)
      }).catch(() => {
        dispatch({ type: 'GET_SINGLE_PRODUCT_ERROR' });
      });
    }

    //call fetch when the app first renders.
    useEffect(() => {
      fetchProducts();
    },[])

    const openSidebar = () => {
      dispatch({ type: 'OPEN_SIDEBAR' })
    }

    const closeSidebar = () => {
      dispatch({ type: 'CLOSE_SIDEBAR' })
    }



    return (
   <ProductsContext.Provider value={{
     ...state,
     openSidebar,
     closeSidebar,
     fetchProducts,
     fetchSingleProduct,
   }}>
     {children}
   </ProductsContext.Provider>
 )
}

export {ProductsContext, ProductsProvider};

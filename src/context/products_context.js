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
     closeSidebar
   }}>
     {children}
   </ProductsContext.Provider>
 )
}

export {ProductsContext, ProductsProvider};

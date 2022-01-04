import React, { useContext, useState, useReducer } from 'react';
import reducer from '../reducers/reducer';

const ProductsContext = React.createContext();

const initialState = {
products: [],
isSidebarOpen: false,
products_loading: false,
}

const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

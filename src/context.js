import React, { useContext, useState, useReducer } from 'react';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
cart: [],
itemTotal: '',
valueTotal: '',
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
      setIsSidebarOpen(true);
    }

    const closeSidebar = () => {
      setIsSidebarOpen(false);
    }

    return (
   <AppContext.Provider value={{
     ...state,
     isSidebarOpen,
     openSidebar,
     closeSidebar
   }}>
     {children}
   </AppContext.Provider>
 )
}

export {AppProvider, AppContext};

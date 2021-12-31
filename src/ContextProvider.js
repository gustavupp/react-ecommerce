Import { React, useContext, useState, useReduce } from 'react';

const appProvider = react.createContext();

const initialState = {
cart: [],
itemTotal: '',
valueTotal: ''
}

const useProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
   <appProvider.Provider value={}>
     {children}
   </appProvider.Provider>
 )
}

export {useProvider};

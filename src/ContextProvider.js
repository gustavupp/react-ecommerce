Import React from 'react';

const appProvider = react.createContext();

const initialState = {
cart: [],
itemTotal: '',
valueTotal: ''
}

const reducer = (state, action) => {
     return state;
}

const useProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
   <appProvider.Provider value={}>
     {children}
   </appProvider.Provider>
 )
}

export default useProvider;

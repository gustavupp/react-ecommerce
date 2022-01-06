import React, { useContext, useReducer, useEffect } from "react";
import { commerce } from "../lib/commerce";
import cartReducer from "../reducers/cartReducer";

const CartContext = React.createContext();

const initialState = {
    cart: {},
    total_items: 0,
    total_unique_items: 0,
    subtotal: 0,
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const fetchCart = async () => {
      dispatch({ type: 'GET_CART', payload: await commerce.cart.retrieve() });
    }

    const addToCart = async (id, amount) => {
      const item = await commerce.cart.add(id, amount);
      dispatch({ type: 'GET_CART', payload: item.cart });
      console.log(item);
      //fetchCart();
    }
    //commerce.cart.refresh();
    const updateCart = async () => {
      const updatedCart = await commerce.cart.update('item_7RyWOwmK5nEa2V', {quantity: 6});
    }

    useEffect(() => {
      fetchCart();
    },[])

    return (
        <CartContext.Provider value={{
            ...state,
            addToCart,
            updateCart,
        }}>
            { children }
        </CartContext.Provider>
        )
}

export { CartProvider, CartContext };
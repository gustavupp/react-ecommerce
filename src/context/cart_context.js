import React, { useContext, useReducer, useEffect } from 'react'
import { commerce } from '../lib/commerce'
import cartReducer from '../reducers/cartReducer'

const CartContext = React.createContext()

const initialState = {
  cart: {
    total_items: 0,
    line_items: [],
    subtotal: { formatted_with_symbol: '' },
  },
  isCartLoading: false,
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const fetchCart = async () => {
    dispatch({ type: 'GET_CART', payload: await commerce.cart.retrieve() })
  }

  const addToCart = async (id, amount) => {
    dispatch({ type: 'CART_IS_LOADING' })
    const item = await commerce.cart.add(id, amount)
    dispatch({ type: 'GET_CART', payload: item.cart })
  }

  const clearCart = async () => {
    dispatch({ type: 'CART_IS_LOADING' })
    await commerce.cart.refresh()
    dispatch({ type: 'GET_CART', payload: await commerce.cart.retrieve() })
  }

  // const updateCart = async () => {
  //   const updatedCart = await commerce.cart.update('item_7RyWOwmK5nEa2V', {
  //     quantity: 6,
  //   })
  // }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }

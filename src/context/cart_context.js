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
  availableDefault: 10,
  isCartLoading: false,
  isClearCartLoading: false,
  isSingleItemLoading: false,
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
    dispatch({ type: 'CLEAR_CART_IS_LOADING' })
    await commerce.cart.refresh()
    dispatch({ type: 'GET_CART', payload: await commerce.cart.retrieve() })
  }

  const removeFromCart = async (id) => {
    dispatch({ type: 'SINGLE_ITEM_IS_LOADING' })
    await commerce.cart.remove(id)
    dispatch({ type: 'GET_CART', payload: await commerce.cart.retrieve() })
  }

  const updateCartItem = async (id, qty) => {
    dispatch({ type: 'SINGLE_ITEM_IS_LOADING' })
    const updatedCart = await commerce.cart.update(id, {
      quantity: qty,
    })
    dispatch({ type: 'GET_CART', payload: await commerce.cart.retrieve() })
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        removeFromCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }

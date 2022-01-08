const cartReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CART':
      return { ...state, cart: action.payload, isCartLoading: false }
    case 'CART_IS_LOADING':
      return { ...state, isCartLoading: true }
    default:
      return state
  }
}

export default cartReducer

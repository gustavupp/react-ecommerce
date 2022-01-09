const cartReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CART':
      return {
        ...state,
        cart: action.payload,
        isCartLoading: false,
        isClearCartLoading: false,
        isSingleItemLoading: false,
      }
    case 'CART_IS_LOADING':
      return { ...state, isCartLoading: true }
    case 'CLEAR_CART_IS_LOADING':
      return { ...state, isClearCartLoading: true }
    case 'SINGLE_ITEM_IS_LOADING':
      return { ...state, isSingleItemLoading: true }
    default:
      throw new Error('THERE IS NO SUCH ACTION ON cartReducer.js')
  }
}

export default cartReducer

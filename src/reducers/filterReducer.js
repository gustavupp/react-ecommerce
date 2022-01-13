const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_SORTING_TYPE':
      return { ...state, sort: action.payload }
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      }
    case 'SORT_PRODUCTS':
      const { filtered_products, sort } = state
      let tempProducts = [...filtered_products]
      if (sort === 'lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price.raw - b.price.raw)
      }
      if (sort === 'highest') {
        tempProducts = tempProducts.sort((a, b) => b.price.raw - a.price.raw)
      }
      if (sort === 'az') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'za') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return { ...state, filtered_products: tempProducts }
    default:
      throw new Error('No such case on switch statement')
  }
}

export default filterReducer

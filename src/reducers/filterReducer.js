const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_SORTING_TYPE':
      return { ...state, sort: action.payload }
    case 'LOAD_PRODUCTS':
      let prices = action.payload.map((item) => item.price.raw)
      let maxPrice = Math.max(...prices)
      let minPrice = Math.min(...prices)
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          min_price: minPrice,
          price: maxPrice,
        },
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
    case 'UPDATE_FILTER':
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }
    case 'FILTER_PRODUCTS':
      const { all_products } = state
      const { max_price, min_price, price, search_text, category } =
        state.filters
      let tempFilteredProducts = [...all_products]
      if (search_text) {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          return product.name.toLowerCase().includes(search_text)
        })
      }
      return { ...state, filtered_products: tempFilteredProducts }
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          search_text: '',
          price: state.filters.max_price,
          category: 'All',
        },
      }
    default:
      throw new Error('No such case on switch statement')
  }
}

export default filterReducer

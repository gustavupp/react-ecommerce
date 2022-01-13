import React, { useContext, useReducer, useEffect } from 'react'
import filterReducer from '../reducers/filterReducer'
import { ProductsContext } from './products_context'

const FilterContext = React.createContext()

const initialState = {
  filtered_products: [],
  all_products: [],
  sort: 'lowest',
  filters: {
    search_text: '',
    min_price: 0,
    max_price: 0,
    price: 0,
    category: 'All',
  },
}

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState)
  const { products } = useContext(ProductsContext)

  useEffect(() => {
    dispatch({ type: 'LOAD_PRODUCTS', payload: products })
  }, [products])

  useEffect(() => {
    dispatch({ type: 'FILTER_PRODUCTS' })
    dispatch({ type: 'SORT_PRODUCTS' })
  }, [products, state.sort, state.filters])

  const handleSort = (typeOfSort) => {
    dispatch({ type: 'SELECT_SORTING_TYPE', payload: typeOfSort })
  }

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' })
  }

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'price') value = parseFloat(value) //range input transforms the numbers in strings..we revert it back to a number
    dispatch({ type: 'UPDATE_FILTER', payload: { name, value } })
  }

  return (
    <FilterContext.Provider
      value={{ ...state, handleSort, clearFilters, updateFilters }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export { FilterProvider, FilterContext }

import React, { useContext, useReducer, useEffect } from 'react'
import filterReducer from '../reducers/filterReducer'
import { ProductsContext } from './products_context'

const FilterContext = React.createContext()

const initialState = {
  filtered_products: [],
  all_products: [],
  sort: 'lowest',
}

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState)
  const { products } = useContext(ProductsContext)

  useEffect(() => {
    dispatch({ type: 'LOAD_PRODUCTS', payload: products })
  }, [products])

  useEffect(() => {
    dispatch({ type: 'SORT_PRODUCTS' })
  }, [products, state.sort])

  const handleSort = (typeOfSort) => {
    dispatch({ type: 'SELECT_SORTING_TYPE', payload: typeOfSort })
  }

  return (
    <FilterContext.Provider value={{ ...state, handleSort }}>
      {children}
    </FilterContext.Provider>
  )
}

export { FilterProvider, FilterContext }

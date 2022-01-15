import React, { useReducer, useEffect } from 'react'
import productsReducer from '../reducers/productsReducer'
import { commerce } from '../lib/commerce'

const ProductsContext = React.createContext()

const initialState = {
  products: [],
  featured_products: [],
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  //single product has this dummy initial value so it doesnt come as undefined before the product is fetched.
  single_product: {
    name: '',
    price: { formatted_with_symbol: '' },
    assets: [{ url: '' }, { url: '' }, { url: '' }, { url: '' }],
    description: '',
    inventory: { available: 1 },
    sku: 1,
  },
  single_product_loading: false,
  single_product_error: false,
}

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  //fetch all products from commerceJs API
  const fetchProducts = async () => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' })
    await commerce.products
      .list()
      .then((res) => {
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: res.data })
      })
      .catch(() => {
        dispatch({ type: 'GET_PRODUCTS_ERROR' })
      })
  }

  //fetch single product when a product is clicked on
  const fetchSingleProduct = async (id) => {
    dispatch({ type: 'GET_SINGLE_PRODUCT_BEGIN' })
    await commerce.products
      .retrieve(id)
      .then((product) => {
        dispatch({ type: 'GET_SINGLE_PRODUCT_SUCCESS', payload: product })
      })
      .catch(() => {
        dispatch({ type: 'GET_SINGLE_PRODUCT_ERROR' })
      })
  }

  //call fetch when the app first renders.
  useEffect(() => {
    fetchProducts()
  }, [])

  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR' })
  }

  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' })
  }

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchProducts,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export { ProductsContext, ProductsProvider }

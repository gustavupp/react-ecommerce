import React, { useContext } from 'react'
import { ProductsContext } from '../context/products_context'
import { FilterContext } from '../context/filter_context'
import Error from '../components/Error'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import '../styles/productList.css'

const ProductList = () => {
  const { products_loading: loading, products_error: error } =
    useContext(ProductsContext)
  const { filtered_products } = useContext(FilterContext)

  if (error) return <Error />
  if (loading) return <Loading />

  return (
    <div className="product-list-container">
      <div className="list-container">
        {filtered_products.map((product, index) => {
          return <ProductCard key={index} {...product} />
        })}
      </div>
    </div>
  )
}

export default ProductList

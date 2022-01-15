import React, { useContext } from 'react'
import { ProductsContext } from '../context/products_context'
import Error from '../components/Error'
import Loading from '../components/Loading'
import FeaturedProductCard from '../components/FeaturedProductCard'
import '../styles/featuredProducts.css'

const FeaturedProducts = () => {
  const {
    featured_products,
    products_loading: loading,
    products_error: error,
  } = useContext(ProductsContext)

  if (error) return <Error />
  if (loading) return <Loading />

  return (
    <div className="home-featured-products">
      <div className="featured-container">
        {featured_products.map((product, index) => {
          return <FeaturedProductCard key={index} {...product} />
        })}
      </div>
    </div>
  )
}

export default FeaturedProducts

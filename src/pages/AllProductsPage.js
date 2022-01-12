import React from 'react'
import ProductList from '../components/ProductList'
import Filter from '../components/Filter'
import SortFilter from '../components/SortFilter'
import '../styles/allProductsPage.css'

const AllProductsPage = () => {
  return (
    <main className="all-products-page-main">
      <SortFilter />
      <ProductList />
    </main>
  )
}

export default AllProductsPage

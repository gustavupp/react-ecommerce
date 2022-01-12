import React, { useContext } from 'react'
import { FilterContext } from '../context/filter_context'
import '../styles/sortFilter.css'

const SortFilter = () => {
  const { handleSort } = useContext(FilterContext)

  return (
    <section className="sort-filter-section">
      <p>Sort By:</p>
      <select onChange={(e) => handleSort(e.target.value)}>
        <option value="lowest">Price (Low - High)</option>
        <option value="highest">Price (High - Low)</option>
        <option value="az">Name (A - Z)</option>
        <option value="za">Name (Z - A)</option>
      </select>
    </section>
  )
}

export default SortFilter

import React, { useContext } from 'react'
import '../styles/filter.css'
import { FilterContext } from '../context/filter_context'

const Filter = () => {
  const {
    all_products,
    filters: { search_text, min_price, max_price, price, category },
    clearFilters,
    updateFilters,
  } = useContext(FilterContext)

  //get unique categories
  const allCategories = [
    'All',
    ...new Set(all_products.map((product) => product.categories[0].name)),
  ]

  return (
    <section className="filters-container">
      <div className="filter-categories">
        <ul>
          {allCategories.map((cat, index) => (
            <li key={index}>
              <button
                value={cat}
                name="category"
                onClick={updateFilters}
                className={`${category === cat ? 'active-btn' : null}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-search">
        <input
          type="text"
          placeholder="Search"
          name="search_text"
          value={search_text}
          onChange={updateFilters}
        ></input>
      </div>
      <div className="filter-range">
        <p>Price</p>
        <input
          type="range"
          name="price"
          onChange={updateFilters}
          min={min_price}
          max={max_price}
          value={price}
        ></input>
      </div>
      <button onClick={clearFilters}>CLEAR FILTERS</button>
    </section>
  )
}

export default Filter

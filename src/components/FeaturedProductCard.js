import React, { useContext } from 'react'
import { ProductsContext } from '../context/products_context'
import { Link } from 'react-router-dom'
import '../styles/featuredProductCard.css'

const FeaturedProductCard = ({
  id,
  name,
  assets: [{ url }],
  price: { formatted_with_symbol, raw },
  description,
}) => {
  return (
    <div className="featured-individual" key={id}>
      <h2 className="featured-title">{name}</h2>
      <div className="featured-img-container">
        <Link to={`/products/${id}`}>
          <img src={url} alt={name} />
        </Link>
      </div>

      {/* <p
        className="description"
        dangerouslySetInnerHTML={{
          __html: `${description.substring(0, 60)}...`,
        }}
      ></p> */}
      <p className="featured-price">
        {formatted_with_symbol} <span>${raw * 1.5}</span>
      </p>
    </div>
  )
}

export default FeaturedProductCard

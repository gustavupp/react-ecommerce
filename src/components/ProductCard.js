import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/productCard.css'

const ProductCard = ({
  id,
  name,
  assets: [{ url }],
  price: { formatted_with_symbol },
}) => {
  return (
    <div className="individual-featured" key={id}>
      <div className="img-container">
        <Link to={`/products/${id}`}>
          <img src={url} alt={name} />
        </Link>
      </div>
      <h2 className="title">{name}</h2>
      {/* <p
        className="description"
        dangerouslySetInnerHTML={{
          __html: `${description.substring(0, 60)}...`,
        }}
      ></p> */}
      <p className="price">{formatted_with_symbol}</p>
    </div>
  )
}

export default ProductCard

import React, { useContext } from 'react';
import { ProductsContext } from '../context/products_context';
import { Link } from 'react-router-dom';
import '../styles/productCard.css';

const ProductCard = ({ id, name, assets: [{url}], price: {formatted_with_symbol}, description }) => {
 
    return (
        <div className='individual-featured' key={id}>
            <h2 className='title'>{`${name.length > 27? name.slice(0, 26) + '...': name}`}</h2>
            <div className='img-container'> 
                <Link to={`/products/${id}`}>
                    <img src={url} alt={name} />
                </Link>
            </div>
            <p className='price'>{formatted_with_symbol}</p>
            <p className='description' dangerouslySetInnerHTML={{__html: `${description.substring(0, 80)}...`}}></p>
        </div>
    )
}

export default ProductCard;
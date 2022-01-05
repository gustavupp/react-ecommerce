import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductsContext } from '../context/products_context';
import '../styles/singleProduct.css'

const SingleProduct = () => {
    const { products } = useContext(ProductsContext);
    const { id } = useParams();
    
    //find the item whose id matches the useParams id and straight away destructure it
    const matchingProduct = products.find(item => item.id === id);
    const { name , price: {formatted_with_symbol: itemPrice}, assets: [{url: url0}, {url: url1}, {url :url2}, {url: url3}], description, inventory: {available}, sku } = matchingProduct;

    return (
        <main className='single-product-main'>
            <Link className='back-btn' to='/products' >BACK TO PRODUCTS</Link>
            <section className='single-product-section'>
                <section className='imgs-container'>
                    <img src={url0} alt={name} />
                    <div className='thumbnails-container'>
                        <img src={url0} alt=''></img>
                        <img src={url1} alt=''></img>
                        <img src={url2} alt=''></img>
                        <img src={url3} alt=''></img>
                    </div>
                </section>
                <section className='info-container'>
                    <h2 className='product-title'>{name}</h2>
                    <p className='price'>{itemPrice}</p>
                    <p className='product-description' dangerouslySetInnerHTML={{__html: description}}></p>
                    <ul className='aditional-info-ul'>
                        <li><span>Amount In Stock: </span>{available}</li>
                        <li><span>SKU: </span>{sku}</li>
                    </ul>
                </section>
            </section>
        </main>
        )
}

export default SingleProduct;
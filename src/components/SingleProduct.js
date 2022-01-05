import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductsContext } from '../context/products_context';
import Loading from './Loading';
import Error from './Error';
import '../styles/singleProduct.css';

const SingleProduct = () => {
    const { single_product, fetchSingleProduct, single_product_loading, single_product_error } = useContext(ProductsContext);
    const { id } = useParams();

    useEffect(() => {
        fetchSingleProduct(id);
    },[id]);

    if (single_product_loading) return <Loading />;
    if (single_product_error) return <Error />;
    console.log(single_product)

    const { name , price: {formatted_with_symbol: itemPrice}, assets: [{url: url0}, {url: url1}, {url :url2}, {url: url3}], description, inventory: {available}, sku } = single_product;
    
    console.log({name, itemPrice, url0, url1, url2, url3, description, available, sku})
    
    return (
        <main className='single-product-main'>
            <section className='single-product-section'>
                <section className='imgs-container'>
                    <Link className='back-btn' to='/products' >BACK TO PRODUCTS</Link>
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
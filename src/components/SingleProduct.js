import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductsContext } from '../context/products_context';
import Loading from './Loading';
import Error from './Error';
import '../styles/singleProduct.css';

const SingleProduct = () => {

     useEffect(() => {
        fetchSingleProduct(id);
    },[]);

    const { single_product, fetchSingleProduct, single_product_loading, single_product_error } = useContext(ProductsContext);
    
    //destructure single product
     const { name , price: {formatted_with_symbol: itemPrice}, assets, assets: [{url = ''}], description, inventory: {available}, sku } = single_product;

    const { id } = useParams();    //get id of the clicked product
    const [mainImage, setMainImage] = useState(assets[0]);
    console.log(assets[0].url)

    useEffect(() => {
        setMainImage(assets[0]);
    },[assets[0]])

    if (single_product_loading) return <Loading />;
    if (single_product_error) return <Error />;

    return (
        <main className='single-product-main'>
            <section className='single-product-section'>
                <section className='imgs-container'>
                    <Link className='back-btn' to='/products' >BACK TO PRODUCTS</Link>
                    <img src={mainImage.url} alt={name} />
                    <div className='thumbnails-container'>
                        {
                        assets.map((item, index) => {
                            const { url, filename } = item;
                            return <img key={index} src={url} alt={filename} onClick={() => setMainImage(assets[index])}/>
                        })
                        }
                    </div>
                </section>
                <section className='info-container'>
                    <h2 className='product-title'>{name}</h2>
                    <p className='price'>{itemPrice}</p>
                    <p className='product-description' dangerouslySetInnerHTML={{__html: description}}></p>
                    <ul className='aditional-info-ul'>
                        <li key='1'><span>Amount In Stock: </span>{available}</li>
                        <li key='2'><span>SKU: </span>{sku}</li>
                    </ul>
                </section>
            </section>
        </main>
        )
}

export default SingleProduct;
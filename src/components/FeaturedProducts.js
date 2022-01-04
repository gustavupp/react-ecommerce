import React, { useContext } from 'react';
import { ProductsContext } from '../context/products_context';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import '../styles/featuredProduct.css';

const FeaturedProducts = () => {
const { featured_products: products, products_loading: loading, products_error: error } = useContext(ProductsContext);

    if (error) return <Error />;
    if (loading) return <Loading />;

    return (
        <div className='home-featured-products'>
            <div className='featured-container'>
                {
                    products.map(product => {
                        const { id, name, image: {url}, price: {formatted_with_symbol}, description } = product;
                        return (
                            <div className='individual-featured' key={id}>
                                <h2 className='title'>{`${name.length > 27? name.slice(0, 26) + '...': name}`}</h2>
                                <div className='img-container'>
                                    
                                    <Link to={`/products/${id}`}><img src={url} alt={name} /></Link>
                                </div>
                                <p className='price'>{formatted_with_symbol}</p>
                                <p className='description' dangerouslySetInnerHTML={{__html: `${description.substring(0, 80)}...`}}></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        )
}

export default FeaturedProducts;
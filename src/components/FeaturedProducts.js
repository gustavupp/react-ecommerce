import React from 'react';
import '../styles/featuredProduct.css'
import jblEarBuds1 from '../assets/jblEarBuds1.png'

const FeaturedProducts = () => {
    return (
        <div className='home-featured-products'>
            <div className='featured-container'>
                <div className='individual-featured'>
                    <h2 className='title'>JBL Earbuds</h2>
                    <div className='img-container'>
                        <img src={jblEarBuds1} alt='product image' />
                    </div>
                    <p className='price'>$210,00</p>
                    <p className='description'>a brief description of the product goes here</p>
                </div>
                <div className='individual-featured'>
                    <h2 className='title'>JBL Earbuds</h2>
                    <div className='img-container'>
                        <img src={jblEarBuds1} alt='product image' />
                    </div>
                    <p className='price'>$210,00</p>
                    <p className='description'>a brief description of the product goes here</p>
                </div>
                <div className='individual-featured'>
                    <h2 className='title'>JBL Earbuds</h2>
                    <div className='img-container'>
                        <img src={jblEarBuds1} alt='product image' />
                    </div>
                    <p className='price'>$210,00</p>
                    <p className='description'>a brief description of the product goes here</p>
                </div>
            </div>
        </div>
        )
}

export default FeaturedProducts;
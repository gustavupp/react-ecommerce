import React from 'react';
import { Link } from 'react-router-dom';
import amazon_gradient_banner from '../assets/amazon_gradient_banner.jpg';
import '../styles/home.css'; 

const Home = () => {
    return (
        <main className='home-main'>
            <article className='article-container'>
                <h1 className='title'>ASIL Online Store</h1>
                <p className='main-text'>The greatest glory in living lies not in never falling, but in rising every time we fall. The way to get started is to quit talking and begin doing. Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma</p>
                
                <Link className='products-btn' to='/products'>SHOP NOW</Link>
            </article>
        </main>
        );
}

export default Home;
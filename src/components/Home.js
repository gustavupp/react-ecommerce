import React from 'react';
import { Link } from 'react-router-dom';
import amazon_gradient_banner from '../assets/amazon_gradient_banner.jpg';
import smartphones from '../assets/smartphones.png';
import '../styles/home.css'; 

const Home = () => {
    return (
        <main className='home-main'>
            <div className='hero-container'>
                <article className='article-container'>
                <h1 className='title'>ASIL Online Store</h1>
                <p className='main-text'>The greatest glory in living lies not in never falling, but in rising every time we fall. The way to get started is to quit talking and begin doing.</p>
                
                <Link className='products-btn' to='/products'>SHOP NOW</Link>
                </article>
                <div className='home-img-container'>
                    <img src={smartphones}></img>
                </div>
            </div>
        </main>
        );
}

export default Home;
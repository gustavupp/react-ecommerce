import React from 'react';
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts';
import '../styles/homepage.css'; 

const HomePage = () => {
    return (
        <main className='home-main'>
            <Hero />
            <FeaturedProducts /> 
        </main>
        );
}

export default HomePage;
import React from 'react'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import '../styles/homepage.css'

const HomePage = () => {
  return (
    <main className="home-main">
      {/* <img className="banner" src={amazon_banner} alt="banner"></img> */}
      <Hero />
      <FeaturedProducts />
    </main>
  )
}

export default HomePage

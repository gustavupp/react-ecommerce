import React from 'react'
import { Link } from 'react-router-dom'
import smartphones from '../assets/smartphones.png'
import '../styles/hero.css'

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="home-img-container">
        <img src={smartphones} alt="eletronic devices"></img>
      </div>
      <article className="article-container">
        <h1 className="title">Productivity that fits in your pocket.</h1>
        <p className="main-text">
          The greatest glory in living lies not in never falling, but in rising
          every time we fall. The way to get started is to quit talking and
          begin doing.
        </p>

        <Link className="products-btn btn" to="/products">
          SHOP NOW
        </Link>
      </article>
    </div>
  )
}

export default Hero

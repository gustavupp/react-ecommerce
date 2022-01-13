import React from 'react'
import '../styles/loading.css'

const Loading = () => {
  // const navbarHeight = document
  //   .querySelector('.main-navbar')
  //   .getBoundingClientRect().height
  // const footerHeight = document
  //   .querySelector('.footer-main')
  //   .getBoundingClientRect().height

  return (
    <div className="loading-component-div">
      <div className="loading-animation"></div>
      <h3>Loading...</h3>
    </div>
  )
}

export default Loading

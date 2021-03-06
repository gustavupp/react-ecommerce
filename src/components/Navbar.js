import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaBars } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { menuLinks } from '../constants/constants'
import { ProductsContext } from '../context/products_context'
import { CartContext } from '../context/cart_context'
import UserAuth from './UserAuth'

//css
import '../styles/navbar.css'
import { AuthenticationContext } from '../context/auth0_context'

const Navbar = () => {
  const [active, setActive] = useState(0)
  const { openSidebar } = useContext(ProductsContext)
  const {
    cart: { total_items },
  } = useContext(CartContext)
  const { myUser } = useContext(AuthenticationContext)

  return (
    <main className="main-navbar">
      <div className="main-header">
        <div className="logo-div">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <p className="logo-text">.com</p>
        </div>

        <button className="toggle-btn" onClick={openSidebar}>
          <FaBars />
        </button>
        {/* Nav links container */}
        <div className="nav-links-container">
          <ul className="nav-links">
            {menuLinks.map((link, index) => {
              return (
                <li key={link.id} onClick={() => setActive(index)}>
                  <Link
                    className={`${active === index ? 'active-page' : null}`}
                    to={link.url}
                  >
                    {link.text}
                  </Link>
                </li>
              )
            })}
            {/* will be active when user is signed in */}
            {total_items > 0 && myUser && (
              <li>
                <Link
                  className={`${active === 3 ? 'active-page' : null}`}
                  to="/checkout"
                  onClick={() => setActive(3)}
                >
                  CHECKOUT
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="cart-login-container">
          <button className="cart-btn">
            <Link to="/cart">
              <FaShoppingCart />
              <span className="cart-value">{total_items}</span>
            </Link>
          </button>

          {/* Authentication Component */}
          <UserAuth />
        </div>
        {/* social icons container */}
        {/* <div className='social-links-container'>
                    <ul className='social-links'>
                        {
                            socialIcons.map((icon) => {
                                return (
                                    <a key={icon.id} href={icon.url}><li >{icon.icon}</li></a>
                                )
                            })
                        }
                    </ul>
                </div> */}
      </div>
    </main>
  )
}

export default Navbar

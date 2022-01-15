import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { menuLinks, socialIcons } from '../constants/constants'
import logo from '../assets/logo.png'
import '../styles/sidebar.css'
import { FaRegWindowClose, FaShoppingCart } from 'react-icons/fa'
import { ProductsContext } from '../context/products_context'
import { CartContext } from '../context/cart_context'
import { AuthenticationContext } from '../context/auth0_context'
import UserAuth from './UserAuth'

const Sidebar = () => {
  const [active, setActive] = useState(0)
  const { isSidebarOpen, closeSidebar } = useContext(ProductsContext)
  const {
    cart: { total_items },
  } = useContext(CartContext)
  const { myUser } = useContext(AuthenticationContext)

  return (
    //if isSidebarOpen is true, show the Sidebar Component
    <main
      className={`${
        isSidebarOpen ? 'sidebar-main show-sidebar' : 'sidebar-main'
      }`}
    >
      <img className="logo" src={logo} alt="logo"></img>
      <div className="links-div">
        <ul className="links-ul">
          {menuLinks.map((link, index) => {
            return (
              <li key={link.id}>
                <Link
                  className={`${active === index ? 'active-page' : null}`}
                  to={link.url}
                  onClick={() => {
                    setActive(index)
                    closeSidebar()
                  }}
                >
                  {link.text}
                </Link>
              </li>
            )
          })}
          {/* appears when cart has at least 1 item */}
          {total_items > 0 && myUser && (
            <li>
              <Link
                className={`${active === 3 ? 'active-page' : null}`}
                to="/checkout"
                onClick={() => {
                  setActive(3)
                  closeSidebar()
                }}
              >
                CHECKOUT
              </Link>
            </li>
          )}
        </ul>
      </div>
      <hr style={{ width: '90%', margin: '15px 0' }} />
      <div className="cart-login-container">
        <button className="cart-btn" onClick={closeSidebar}>
          <Link to="/cart">
            <FaShoppingCart />
            <span className="cart-value-sidebar">{total_items}</span>
          </Link>
        </button>

        {/* Authentication Component */}
        <UserAuth />
      </div>
      <div className="sidebar-social">
        <ul>
          {socialIcons.map((icon) => {
            return (
              <a key={icon.id} href={icon.url}>
                <li>{icon.icon}</li>
              </a>
            )
          })}
        </ul>
      </div>
      <button className="close-btn" onClick={closeSidebar}>
        <FaRegWindowClose />
      </button>
    </main>
  )
}

export default Sidebar

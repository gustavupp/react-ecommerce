import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { menuLinks, socialIcons } from '../constants/constants'
import logo from '../assets/logo.png'
import '../styles/sidebar.css'
import { FaRegWindowClose, FaShoppingCart, FaUserPlus } from 'react-icons/fa'
import { ProductsContext } from '../context/products_context'
import { CartContext } from '../context/cart_context'

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(ProductsContext)
  const {
    cart: { total_items },
  } = useContext(CartContext)

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
          {menuLinks.map((link) => {
            return (
              <li key={link.id}>
                <Link to={link.url} onClick={closeSidebar}>
                  {link.text}
                </Link>
              </li>
            )
          })}
          {/* appears when cart has at least 1 item */}
          {total_items > 0 && (
            <li>
              <Link to="/checkout" onClick={closeSidebar}>
                CHECKOUT
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="cart-login-container">
        <button className="cart-btn" onClick={closeSidebar}>
          <Link to="/cart">
            Cart <FaShoppingCart />
            <span className="cart-value-sidebar">{total_items}</span>
          </Link>
        </button>
        <button className="user-btn">
          Login <FaUserPlus />
          {/* set up redirect to login page auth0 */}
        </button>
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

import React from 'react'
import ShoppingCartItem from '../components/ShoppingCartItem'
import '../styles/cartPage.css'
import { useContext } from 'react'
import { CartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { AuthenticationContext } from '../context/auth0_context'

const CartPage = () => {
  const {
    cart: {
      total_items,
      line_items,
      subtotal: { formatted_with_symbol },
    },
    clearCart,
    isClearCartLoading,
  } = useContext(CartContext)
  const { myUser, loginWithRedirect } = useContext(AuthenticationContext)

  return (
    <main className="cartpage-main">
      <h1 className="cartpage-title">Your Cart ({total_items} items)</h1>
      <div className="cartpage-underline" />
      <div className="cartpage-item-wrrapper">
        {line_items.map((item, index) => {
          return <ShoppingCartItem key={index} {...item} />
        })}
      </div>
      <div className="cartpage-underline" />

      <div className="back-products-clear-cart-container">
        <Link
          style={{ fontSize: '14px' }}
          to="/products"
          className="continue-shopping-btn btn"
        >
          Continue Shopping
        </Link>
        <button
          className={`${
            isClearCartLoading
              ? 'clear-all-cart-btn loading-btn btn'
              : 'clear-all-cart-btn btn'
          }`}
          onClick={clearCart}
        >
          <span className="clear-all-cart-btn-text">Clear Cart</span>
        </button>
      </div>
      <br />
      <section className="order-total-section">
        <div className="order-total-container-with-btn">
          <div className="order-total-container">
            <p className="order-items-total">
              Total Items:
              <span className="order-subtotal-number">{total_items}</span>
            </p>
            <p className="order-subtotal">
              Subtotal:
              <span className="order-subtotal-number">
                {formatted_with_symbol}
              </span>
            </p>
          </div>
          {myUser ? (
            <Link className="go-to-checkout-btn btn" to="/checkout">
              Go To Checkout
            </Link>
          ) : (
            <button
              type="button"
              className="empty-cart-btn btn"
              onClick={loginWithRedirect}
            >
              Login To Checkout
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

export default CartPage

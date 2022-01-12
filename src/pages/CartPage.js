import React from 'react'
import ShoppingCartItem from '../components/ShoppingCartItem'
import '../styles/cartPage.css'
import { useContext } from 'react'
import { CartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

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

  return (
    <main className="cartpage-main">
      <h1 className="cartpage-title">Your Cart ({total_items} items)</h1>
      <div className="cartpage-underline" />
      <div className="cartpage-item-wrrapper">
        {line_items.map((item, index) => {
          return <ShoppingCartItem key={index} {...item} />
        })}

        <button
          className={`${
            isClearCartLoading ? 'clear-cart-btn loading-btn' : 'clear-cart-btn'
          }`}
          onClick={clearCart}
        >
          <span className="clear-cart-btn-text">Clear Cart</span>
        </button>
      </div>

      <section className="order-total-section">
        <div className="order-total-container-with-btn">
          <div className="order-total-container">
            <p className="order-subtotal">
              Subtotal:{' '}
              <span className="order-subtotal-number">
                {formatted_with_symbol}
              </span>
            </p>
            <p className="shipping-fee">
              Shipping Fee: <span className="shipping-fee-number">$00.00</span>
            </p>
            <div className="cartpage-order-total-underline" />
            <h3 className="order-total">
              Order Total:
              <span className="order-total-number">
                {formatted_with_symbol}
              </span>
            </h3>
          </div>
          {total_items > 0 ? (
            <Link className="checkout-btn" to="/checkout">
              CHECKOUT
            </Link>
          ) : (
            <Link
              className="empty-cart-btn"
              to="/products"
              style={{ background: 'rgb(54, 54, 134)' }}
            >
              <FaArrowLeft />
              &nbsp;BACK TO PRODUCTS
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}

export default CartPage

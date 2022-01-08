import React from 'react'
import ShoppingCartItem from '../components/ShoppingCartItem'
import '../styles/cartPage.css'

const CartPage = () => {
  return (
    <main className="cartpage-main">
      <h1 className="cartpage-title">Your Cart (4 items)</h1>
      <div className="cartpage-underline" />
      <div className="cartpage-item-wrrapper">
        <ShoppingCartItem />
      </div>
      <section className="order-total-section">
        <div className="order-total-container">
          <p className="order-subtotal">
            Subtotal: <span className="order-subtotal-number">$640.00</span>
          </p>
          <p className="shipping-fee">
            Shipping Fee: <span className="shipping-fee-number">$20.00</span>
          </p>
          <div className="cartpage-order-total-underline" />
          <h3 className="order-total">
            Order Total: <span className="order-total-number">$660.00</span>
          </h3>
        </div>
      </section>

      <button className="checkout-btn">CHECKOUT</button>
    </main>
  )
}

export default CartPage

import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { RiCloseCircleLine } from 'react-icons/ri'
import jblEarBuds1 from '../assets/jblEarBuds1.png'
import { useContext } from 'react'
import { CartContext } from '../context/cart_context'
import '../styles/shoppingCartItem.css'

const ShoppingCartItem = () => {
  const { cart } = useContext(CartContext)

  return (
    <>
      <div className="single-cart-item-container">
        <img className="cart-img" src={jblEarBuds1} alt="" />
        <div className="cart-item-info-container">
          <h2 className="cart-item-title">
            Fancy Item Title might be a bit longer or even longer
          </h2>
          <div className="cart-price-qty-total">
            <div className="cart-price-div">
              <p className="cart-item-price-label label">Price</p>
              <p className="cart-item-price price">$15.99</p>
            </div>
            <div className="cart-qty-div">
              <p className="cart-item-qty-label label">Qty</p>
              <div className="cart-amount">
                <h2 className="quantity-number">1</h2>
                <button className="cart-item-plus-btn cart-btns">
                  <FaPlus />
                </button>
                <button className="cart-item-minus-btn cart-btns">
                  <FaMinus />
                </button>
              </div>
            </div>
            <div className="cart-total-div">
              <p className="cart-item-total-label label">Total</p>
              <p className="cart-item-total price">$15.99</p>
            </div>
            <br />
          </div>
        </div>
        <button className="cart-item-delete-btn">
          <RiCloseCircleLine />
        </button>
      </div>
      <div className="line-through" />
      <br />
    </>
  )
}

export default ShoppingCartItem

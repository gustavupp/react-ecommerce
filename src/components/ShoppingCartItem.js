import React, { useContext, useEffect, useState, useRef } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { RiCloseCircleLine } from 'react-icons/ri'
import Loading from '../components/Loading'
import jblEarBuds1 from '../assets/jblEarBuds1.png'
import { CartContext } from '../context/cart_context'
import { ProductsContext } from '../context/products_context'
import PropTypes from 'prop-types'
import '../styles/shoppingCartItem.css'

const ShoppingCartItem = ({
  id,
  product_id,
  name,
  quantity,
  image: { url },
  line_total: { formatted_with_symbol: totalItemPrice = 0 },
  price: { formatted_with_symbol: itemSinglePrice = 0 },
}) => {
  const { removeFromCart, updateCartItem, isSingleItemLoading } =
    useContext(CartContext)
  const { products } = useContext(ProductsContext)
  const loadingContainer = useRef('')

  //find the product that matches the id passed in and get the amount of items available
  const matchingProduct = products.find((product) => product.id === product_id)

  //then create a numbers array of the same size so we can use it as a drop down menu max option
  const stockNumberArray = Array.from(
    { length: matchingProduct?.inventory.available || 1 },
    (_, index) => {
      return index + 1
    }
  )

  const handleUpdateItem = (e) => {
    updateCartItem(id, e.target.value)
  }

  const handleRemoveFromCart = () => {
    removeFromCart(id)
  }

  //add or remove show-loading class from loading container based on the value of isSingleItemLoading
  if (isSingleItemLoading && loadingContainer.current)
    loadingContainer.current.classList.add('show-loading')
  else if (!isSingleItemLoading && loadingContainer.current)
    loadingContainer.current.classList.remove('show-loading')
  else loadingContainer.current = null

  return (
    <>
      <div className="single-cart-item-container">
        <div className="loading-div" ref={loadingContainer}></div>
        <img className="cart-img" src={url} alt="" />
        <div className="cart-item-info-container">
          <h2 className="cart-item-title">{name}</h2>
          <div className="cart-price-qty-total">
            <div className="cart-price-div">
              <p className="cart-item-price-label label">Price:</p>
              <p className="cart-item-price price">{itemSinglePrice}</p>
            </div>
            <div className="cart-qty-div">
              <p className="cart-item-qty-label label">Qty:</p>
              <div className="cart-amount">
                <select
                  name="quantity"
                  id="quantity"
                  defaultValue={quantity}
                  onChange={handleUpdateItem}
                >
                  {stockNumberArray.map((number, index) => {
                    return (
                      <option value={number} key={index}>
                        {number}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="cart-total-div">
              <p className="cart-item-total-label label">Total:</p>
              <p className="cart-item-total price">{totalItemPrice}</p>
            </div>
            <br />
          </div>
        </div>
        <button className="cart-item-delete-btn" onClick={handleRemoveFromCart}>
          <RiCloseCircleLine />
        </button>
      </div>

      <br />
    </>
  )
}

export default ShoppingCartItem

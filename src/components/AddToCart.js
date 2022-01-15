import React, { useContext, useState } from 'react'
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import { CartContext } from '../context/cart_context'
import { ProductsContext } from '../context/products_context'
import '../styles/addToCart.css'

const AddToCart = () => {
  const {
    single_product: {
      inventory: { available },
    },
    single_product: { id },
  } = useContext(ProductsContext)
  const {
    addToCart,
    isCartLoading,
    cart: { total_items },
  } = useContext(CartContext)
  const [amount, setAmount] = useState(1)

  const addToAmount = () => {
    setAmount((prevAmount) => prevAmount + 1)
    if (amount === available) setAmount(available)
  }

  const subtractFromAmount = () => {
    setAmount((prevAmount) => prevAmount - 1)
    if (amount === 1) setAmount(1)
  }

  return (
    <div className="add-cart-container">
      <h2 className="number">{amount}</h2>
      <button className="plus-btn btns" onClick={addToAmount}>
        <FaPlus />
      </button>
      <button className="minus-btn btns" onClick={subtractFromAmount}>
        <FaMinus />
      </button>
      <button
        className={`${
          isCartLoading
            ? 'add-to-cart-btn loading-btn btn'
            : 'add-to-cart-btn btn'
        }`}
        onClick={() => {
          addToCart(id, amount)
        }}
      >
        <span className="cart-btn-text">Add To Cart</span>
        <FaShoppingCart />
      </button>
    </div>
  )
}

export default AddToCart

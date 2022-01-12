import React, { useContext } from 'react'
import ShippingForm from '../components/ShippingForm'
import { CartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import '../styles/checkoutPage.css'

const CheckoutPage = () => {
  const { cart } = useContext(CartContext)

  // if (cart.total_items === 0)
  //   return (
  //     <div className="checkout-page-container">
  //       <h2>Your Cart is empty! Check Our Products Page</h2>
  //       <br />
  //       <Link to="/products">Go To Products</Link>
  //     </div>
  //   )

  return <ShippingForm />
}

export default CheckoutPage

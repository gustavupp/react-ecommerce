import React, { useContext } from 'react'
import ShippingForm from '../components/ShippingForm'
import { CartContext } from '../context/cart_context'
import '../styles/checkoutPage.css'

const CheckoutPage = () => {
  const { cart } = useContext(CartContext)

  return (
    <main className="checkout-page-container">
      <ShippingForm />
    </main>
  )
}

export default CheckoutPage

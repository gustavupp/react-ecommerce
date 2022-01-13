import React, { useContext } from 'react'
import ShippingForm from '../components/ShippingForm'
import { CartContext } from '../context/cart_context'
import '../styles/checkoutPage.css'

const CheckoutPage = () => {
  const { cart } = useContext(CartContext)

  return <ShippingForm />
}

export default CheckoutPage

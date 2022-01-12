import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cart_context'
import Loading from './Loading'
import '../styles/orderCompleted.css'

const OrderCompleted = ({ fName, lName }) => {
  const { setIsPaymentLoading } = useContext(CartContext)

  useEffect(() => {
    setIsPaymentLoading()
  }, [])

  if (!fName) return <Loading />

  return (
    <div className="order-completed-div">
      <h2>Thank you for your Purchase {`${fName} ${lName}`} ! </h2>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default OrderCompleted

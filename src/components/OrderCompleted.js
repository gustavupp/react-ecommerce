import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cart_context'
import Loading from './Loading'
import '../styles/orderCompleted.css'

const OrderCompleted = ({ fName, lName, email }) => {
  const { setIsPaymentLoading } = useContext(CartContext)

  useEffect(() => {
    setIsPaymentLoading()
  }, [])

  if (!fName) return <Loading />

  return (
    <div className="order-completed-div">
      <p>
        Thank you for your Purchase{' '}
        <span style={{ fontWeight: '600' }}>
          {fName}&nbsp;{lName}
        </span>
        !
      </p>
      <p style={{ marginBottom: '30px' }}>
        An email with the order details has been sent to{' '}
        <span style={{ fontWeight: '600' }}>{email}</span>
      </p>
      <Link className="btn" to="/">
        Back to Home
      </Link>
    </div>
  )
}

export default OrderCompleted

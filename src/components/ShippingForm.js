import React, { useContext, useState, useEffect } from 'react'
import '../styles/shippingForm.css'
import { CartContext } from '../context/cart_context'
import { commerce } from '../lib/commerce'
import Loading from './Loading'
import OrderCompleted from './OrderCompleted'
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const ShippingForm = () => {
  const {
    cartToken,
    fetchToken,
    handleCaptureCheckout,
    cart,
    setIsPaymentLoading,
    isPaymentLoading,
  } = useContext(CartContext)
  const [costumer, setCostumer] = useState({})
  const [countries, setCountries] = useState({})
  const [provinces, setProvinces] = useState({})
  const [province, setProvince] = useState('')
  const [country, setCountry] = useState('')
  const [shippingOption, setShippingOption] = useState({})
  const [formData, setFormData] = useState({})
  //if (!loggedIn) return <h1>Auth0 Login Page </h1>
  // if (loggedIn)

  useEffect(() => {
    fetchToken()
  }, [])

  useEffect(() => {
    fetchCountries(cartToken.id)
  }, [])

  useEffect(() => {
    fetchProvinces(cartToken.id, country)
  }, [country])

  useEffect(() => {
    fetchShippingOptions(cartToken.id, country, province)
  }, [province])

  const handleInputs = (field) => {
    setCostumer({ ...costumer, [field.name]: field.value })
  }

  const fetchCountries = async (tokenId) => {
    if (cartToken) {
      const allCountries = await commerce.services.localeListShippingCountries(
        tokenId
      )
      setCountries(allCountries)
      setCountry(Object.keys(allCountries?.countries)[0])
    }
  }

  const fetchProvinces = async (tokenId, country) => {
    if (country) {
      const allProvinces =
        await commerce.services.localeListShippingSubdivisions(tokenId, country)
      setProvinces(allProvinces)
      setProvince(Object.keys(allProvinces?.subdivisions)[0])
    }
  }

  const fetchShippingOptions = async (tokenId, country, province) => {
    if (country && province) {
      const allShippingOptions = await commerce.checkout.getShippingOptions(
        tokenId,
        {
          country,
          province,
        }
      )

      setShippingOption({
        desc: allShippingOptions[0]?.description,
        price: allShippingOptions[0]?.price.raw,
        shippingId: allShippingOptions[0]?.id,
      })
    }
  }

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) console.log(error)
    else {
      const orderData = {
        line_items: cartToken.live.line_items,
        customer: {
          firstname: costumer.fName,
          lastname: costumer.lName,
          email: costumer.email,
        },
        shipping: {
          name: costumer.fName + costumer.lName,
          street: costumer.address,
          town_city: costumer.city,
          county_state: `${country}-${province}`,
          postal_zip_code: costumer.postalCode,
          country: country,
        },
        fulfillment: { shipping_method: shippingOption.shippingId },

        billing: {
          name: costumer.fName + ' ' + costumer.lName,
          street: costumer.address,
          town_city: costumer.city,
          county_state: `${country}-${province}`,
          postal_zip_code: costumer.postalCode,
          country: country,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      }

      handleCaptureCheckout(cartToken.id, orderData)
      console.log(orderData)
    }
  }

  if (cart.total_items === 0 && costumer)
    return <OrderCompleted {...costumer} />

  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Checkout</h2>
      <article className="form-container">
        <h4>Shipping Details</h4>
        <div
          style={{
            height: '1px',
            width: '100%',
            background: 'rgb(233, 233, 233)',
            margin: '0 0 30px 0',
          }}
        />
        <form className="shipping-form">
          <div className="first-column">
            <div>
              <input
                type="text"
                placeholder="First Name *"
                name="fName"
                onChange={(e) => handleInputs(e.target)}
                required
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name *"
                name="lName"
                onChange={(e) => handleInputs(e.target)}
                required
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Email *"
                name="email"
                onChange={(e) => handleInputs(e.target)}
                required
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Address *"
                name="address"
                onChange={(e) => handleInputs(e.target)}
                required
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="City *"
                name="city"
                onChange={(e) => handleInputs(e.target)}
                required
              ></input>
            </div>
            <div></div>
            <div></div>
          </div>
          <div className="second-column">
            <div>
              <input
                type="text"
                name="postalCode"
                placeholder="ZIP / Postal Code *"
                onChange={(e) => handleInputs(e.target)}
                required
              ></input>
            </div>
            <div>
              <select
                name="countries"
                id="countries"
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries?.countries &&
                  Object.entries(countries.countries).map(([code, name]) => {
                    return (
                      <option key={code} value={code}>
                        {name.length > 20 ? name.slice(0, 15) : name}
                      </option>
                    )
                  })}
              </select>
              <select onChange={(e) => setProvince(e.target.value)}>
                {provinces?.subdivisions &&
                  Object.entries(provinces.subdivisions).map(
                    ([code, province]) => {
                      return (
                        <option key={code} value={code}>
                          {province}
                        </option>
                      )
                    }
                  )}
              </select>
              <select>
                <option>
                  {shippingOption.desc}&nbsp; ${shippingOption.price}.00
                </option>
              </select>
            </div>
          </div>
        </form>

        <section className="order-info">
          <h4 style={{ marginTop: '20px' }}>Order Summary</h4>
          <div
            style={{
              height: '1px',
              width: '100%',
              background: 'rgb(233, 233, 233)',
              margin: '0 0 20px 0',
            }}
          />
          {cartToken &&
            cartToken.live?.line_items.map((item, index) => {
              const {
                price: { raw },
                quantity,
                product_name,
              } = item
              return (
                <div className="item-summary" key={index}>
                  <p className="item-title">{product_name}</p>
                  <div>
                    <p>Quantity: {quantity}</p>
                    <p> ${quantity * raw}</p>
                  </div>
                </div>
              )
            })}

          <div className="opt">
            <p>Shipping</p>
            <p>${shippingOption.price}.00</p>
          </div>
          <br />
          <div className="opt">
            <h4>Total:</h4>
            <h4>
              {shippingOption.price && cartToken
                ? `$${
                    cartToken.live?.subtotal.raw +
                    parseInt(shippingOption.price)
                  }`
                : 'loading...'}
            </h4>
          </div>
        </section>
        <section className="payment-section">
          <h4 style={{ marginTop: '30px' }}>Card Details</h4>
          <p style={{ fontSize: '13px', color: 'grey', marginBottom: '10px' }}>
            Test Card Number: 4242 4242 4242 4242
          </p>
          <div
            style={{
              height: '1px',
              width: '100%',
              background: 'rgb(233, 233, 233)',
              margin: '0 0 20px 0',
            }}
          />
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ elements, stripe }) => (
                <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                  <CardElement />
                  <br />
                  <div className="stripe-pay-div">
                    <button
                      className={
                        isPaymentLoading
                          ? 'stripe-pay-btn loading-btn'
                          : 'stripe-pay-btn'
                      }
                      disabled={!stripe}
                      type="submit"
                      onClick={setIsPaymentLoading}
                    >
                      {shippingOption.price ? (
                        <span className="stripe-pay-btn-text">
                          PAY $
                          {cartToken.live?.subtotal.raw +
                            parseInt(shippingOption.price)}
                        </span>
                      ) : (
                        <span className="stripe-pay-btn-text loading-btn"></span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </ElementsConsumer>
          </Elements>
        </section>
      </article>
    </>
  )
}

export default ShippingForm

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
    fetchCart,
    clearToken,
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

  //STRIPE STATES
  const [errorMsg, setErrorMsg] = useState(null)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    fetchToken(cart.id)
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

  //show stripe validation error message as user fills the card info
  const handleChange = async (e) => {
    console.log(e.empty)
    setDisabled(e.empty)
    setErrorMsg(e.error ? e.error.message : '')
  }

  //send data to stripe and CommerceJs when form is submitted
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    //if there is an error
    if (error) console.log(error)
    //if there is no error and card info is complete
    else {
      //create a data object with all the required costumer info
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

  /*******************************RENDER LOGIC********************************************/
  if (
    cart.total_items === 0 &&
    costumer.fName &&
    costumer.lName &&
    costumer.email
  )
    return <OrderCompleted {...costumer} />

  return (
    <article className="form-container">
      <h3>Shipping Details</h3>
      <div className="underline-form" />
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
        <h3 style={{ marginTop: '20px' }}>Order Summary</h3>
        <div className="underline-form" />
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
        <hr style={{ marginBottom: '10px' }} />
        <div className="opt">
          <p>Shipping</p>
          <p>${shippingOption.price}.00</p>
        </div>
        <hr style={{ marginTop: '10px' }} />
        <br />
        <div className="opt">
          <h4>Total:</h4>
          <h4>
            {shippingOption.price && cartToken
              ? `$${
                  cartToken.live?.subtotal.raw + parseInt(shippingOption.price)
                }`
              : 'loading...'}
          </h4>
        </div>
      </section>

      {/**********************PAYMENT SECTION****************************/}
      <section className="payment-section">
        <h3 style={{ marginTop: '30px' }}>Card Details</h3>
        <div className="underline-form" />
        <p
          style={{
            fontSize: '13px',
            color: 'grey',
            marginBottom: '10px',
            cursor: 'pointer',

            maxWidth: '300px',
            margin: '10px auto',
            borderRadius: '5px',
          }}
          //copy to clipboard functionality
          onClick={(e) => {
            navigator.clipboard.writeText('4242 4242 4242 4242')
            e.target.textContent = 'Card Number Copied To Clipboard'

            setTimeout(() => {
              e.target.textContent = 'Click To Copy: 4242 4242 4242 4242'
            }, 3000)
          }}
        >
          Click To Copy: 4242 4242 4242 4242
        </p>

        {/************ STRIPE CARD FORM ***************/}
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form
                className="payment-form"
                onSubmit={(e) => handleSubmit(e, elements, stripe)}
              >
                <CardElement onChange={handleChange} />
                <br />
                <div className="stripe-pay-div">
                  <button
                    className={
                      isPaymentLoading
                        ? 'stripe-pay-btn btn loading-btn'
                        : 'stripe-pay-btn btn'
                    }
                    //only enable the button if all shipping fields have been filled and stripe is true
                    disabled={!stripe || disabled}
                    type="submit"
                    onClick={() => {
                      if (
                        !costumer.fName ||
                        !costumer.lName ||
                        !costumer.address ||
                        !costumer.email ||
                        !costumer.postalCode ||
                        !costumer.city ||
                        errorMsg ||
                        disabled
                      ) {
                        alert(
                          'Please, Fill Out All Costumer, Shipping and Card Details Correctly'
                        )
                      } else setIsPaymentLoading()
                    }}
                  >
                    {shippingOption.price ? (
                      <span className="stripe-pay-btn-text">
                        PAY USD$
                        {cartToken.live?.subtotal.raw +
                          parseInt(shippingOption.price)}
                      </span>
                    ) : (
                      <span className="stripe-pay-btn-text loading-btn btn"></span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
        <p style={{ padding: '10px 0', fontSize: '14px', color: 'red' }}>
          {disabled ? 'Card Information Is Empty' : errorMsg}
        </p>
        {/*******************************/}
      </section>
    </article>
  )
}

export default ShippingForm

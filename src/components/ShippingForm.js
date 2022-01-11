import React, { useContext, useState, useEffect } from 'react'
import '../styles/shippingForm.css'
import { CartContext } from '../context/cart_context'
import { commerce } from '../lib/commerce'
import { Link } from 'react-router-dom'

const ShippingForm = () => {
  const { cartToken, fetchToken } = useContext(CartContext)
  const [costumer, setCostumer] = useState({})
  const [countries, setCountries] = useState({})
  const [provinces, setProvinces] = useState({})
  const [province, setProvince] = useState('')
  const [country, setCountry] = useState('')
  const [shippingOption, setShippingOption] = useState({})
  const [formData, setFormData] = useState({})
  //if (!loggedIn) return <h1>Auth0 Login Page </h1>
  // if (loggedIn)
  console.log(shippingOption)
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
      })
    }
  }

  return (
    <>
      <article className="form-container">
        <h2>Checkout</h2>
        <h4>Shipping Address</h4>
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
                  {shippingOption.desc}&nbsp;
                  {shippingOption.price}
                </option>
              </select>
            </div>
            {/* <Link to="/checkout/order" className="to-payment-btn">
            Next
          </Link> */}
          </div>
        </form>
        <section className="order-info">
          <h4>Order Summary</h4>
          {cartToken &&
            cartToken.live?.line_items.map((item) => {
              const {
                price: { raw },
                quantity,
                product_name,
              } = item
              return (
                <div className="item-summary">
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
              $
              {cartToken &&
                cartToken.live?.subtotal.raw + parseInt(shippingOption.price)}
            </h4>
          </div>
        </section>
      </article>

      <article className="stripe-payment">Payment</article>
    </>
  )
}

export default ShippingForm

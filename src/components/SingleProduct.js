import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ProductsContext } from '../context/products_context'
import { FaArrowLeft } from 'react-icons/fa'
import Loading from './Loading'
import Error from './Error'
import AddToCart from './AddToCart'
import '../styles/singleProduct.css'

const SingleProduct = () => {
  useEffect(() => {
    fetchSingleProduct(id)
    // eslint-disable-next-line
  }, [])

  const {
    single_product,
    fetchSingleProduct,
    single_product_loading,
    single_product_error,
  } = useContext(ProductsContext)

  //destructure single product
  const {
    name,
    price: { formatted_with_symbol: itemPrice },
    assets,
    assets: [{ url = '' }],
    description,
    inventory: { available },
    sku,
  } = single_product

  const { id } = useParams() //get id of the clicked product
  const [mainImage, setMainImage] = useState(url)

  //added this extra useeffect to update the initial dummy value of var url
  useEffect(() => {
    setMainImage(url)
  }, [url])

  if (single_product_loading) return <Loading />
  if (single_product_error) return <Error />

  return (
    <main className="single-product-main">
      <section className="single-product-section">
        <section className="imgs-container">
          <Link className="back-btn btn" to="/products">
            <FaArrowLeft />
            &nbsp;Products
          </Link>
          <img className="main-img" src={mainImage} alt={name} />
          <div className="thumbnails-container">
            {assets.map((item, index) => {
              const { url, filename } = item
              return (
                <img
                  key={index}
                  src={url}
                  alt={filename}
                  onClick={() => setMainImage(url)}
                />
              )
            })}
          </div>
        </section>
        <section className="info-container">
          <h2 className="product-title">{name}</h2>

          <p
            className="product-description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <h2 className="price">{itemPrice}</h2>
          <ul className="aditional-info-ul">
            <li key="1">
              <span>Amount In Stock: </span>
              {available}
            </li>
            <li key="2">
              <span>SKU: </span>
              {sku}
            </li>
          </ul>
          <br />
          <div
            style={{
              height: '2px',
              width: '300px',
              background: 'rgb(100, 100, 100)',
            }}
          />

          <AddToCart />
        </section>
      </section>
    </main>
  )
}

export default SingleProduct

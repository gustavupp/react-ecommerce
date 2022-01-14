import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { CartProvider } from './context/cart_context'
import { FilterProvider } from './context/filter_context'
import { Auth0Provider } from '@auth0/auth0-react'
import { AuthenticationProvider } from './context/auth0_context'

//global css
import './styles/index.css'

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <AuthenticationProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </AuthenticationProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

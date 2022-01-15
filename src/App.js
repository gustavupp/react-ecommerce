import React from 'react'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'
import AllProductsPage from './pages/AllProductsPage'
import SingleProductPage from './pages/SingleProductPage'
import Sidebar from './components/SideBar'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute'

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/products">
          <AllProductsPage />
        </Route>
        <Route
          exact
          path="/products/:id"
          children={<SingleProductPage />}
        ></Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <PrivateRoute exact path="/checkout">
          <CheckoutPage />
        </PrivateRoute>
        <Route exact path="*">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App

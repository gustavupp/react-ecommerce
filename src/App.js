//import  {commerce}  from './lib/commerce'
import React from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ErrorPage from './pages/ErrorPage'
import AllProductsPage from './pages/AllProductsPage';
import SingleProduct from './components/SingleProduct'
import Sidebar from './components/SideBar';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage'
import CheckoutPage from './pages/CheckoutPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Sidebar/>
      <Switch>
        <Route exact path='/'>
          <HomePage /> 
        </Route>
        <Route exact path='/products'>
          <AllProductsPage />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct />}></Route>
        <Route exact path='/about'>
          <AboutPage />
        </Route>
        <Route exact path='/checkout'>
          <CheckoutPage />
        </Route>
        <Route exact path='*'>
          <ErrorPage /> 
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;

 // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   try {
  //     const { data } = await commerce.products.list();
  //     setProducts(data);
  //   } catch {
  //     console.log('there has been an error fetching data from the API')
  //   }
  // }
  // console.log(products)

  // useEffect(() => {
  //   fetchProducts();
  // },[])
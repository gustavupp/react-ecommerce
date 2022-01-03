//import  {commerce}  from './lib/commerce'
import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Error from './components/Error'
import Products from './components/Products';
import SingleProduct from './components/SingleProduct'
import Sidebar from './components/SideBar';
import Footer from './components/Footer';
import About from './components/About'
import Checkout from './components/Checkout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Sidebar/>
      <Switch>
        <Route exact path='/'>
          <Home /> 
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct />}></Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/checkout'>
          <Checkout />
        </Route>
        <Route exact path='*'>
          <Error /> 
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
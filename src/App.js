//import  {commerce}  from './lib/commerce'
import React from 'react';
import Home from './Home';
import Navbar from './Navbar';
import Error from './Error'
import Products from './Products';
import SingleProduct from './SingleProduct'
import Sidebar from './SideBar';
import Footer from './Footer';
import About from './About'
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
        <Route exact path='products/:id' children={<SingleProduct />}></Route>
        <Route exact path='/about'>
          <About />
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
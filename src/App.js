//import  {commerce}  from './lib/commerce'
import Home from './Home';
import Navbar from './Navbar';
import  Error from './Error'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/'>
          <Home /> 
        </Route>
        <Route exact path='*'>
          <Error /> 
        </Route>
      </Switch>
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
import  {commerce}  from './lib/commerce'
import {useEffect, useState} from 'react'

function App() {
const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
    } catch {
      console.log('there has been an error fetching data from the API')
    }
  }
  console.log(products)

  useEffect(() => {
    fetchProducts();
  },[])

  return <h1>App</h1>
}

export default App;

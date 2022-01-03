import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { ProductsProvider } from './context/products_context';

//global css
import './styles/index.css' 

ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


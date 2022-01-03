import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { AppProvider } from './context';

//global css
import './styles/index.css' 

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


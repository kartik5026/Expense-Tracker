import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Store } from './Redux-Toolkit/store/Store.jsx'
import {Provider} from 'react-redux';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <Provider store={Store}>
      <App />
      </Provider>
    </BrowserRouter>
  
)

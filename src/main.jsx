import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../node_modules/flowbite/dist/flowbite.min.js'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

import React from 'react'

import './App.css'
import './styles/theme.css'
import AppRouter from './Router/AppRouter'
import { CartProvider } from './CartContext'

function App() {


  return (
    <CartProvider>
    <AppRouter/>
    </CartProvider>
  )
}

export default App

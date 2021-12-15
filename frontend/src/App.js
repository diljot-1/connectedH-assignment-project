import React from 'react'
import HomePage from './Componets/HomePage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Products from './Componets/Products';
import Cart from './Componets/Cart';
export default function App(props) {
  

  return (
    <>
        <Router>

        <Routes>
          <Route path="/cart" element={<Cart/>}>
          </Route>
          <Route path="/dashboard " element={ <Products />}>
          </Route>
          <Route exact path="/" element={<HomePage />}>
          </Route>
        </Routes>
      
      </Router>
    </>
  )
}

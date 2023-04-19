import React from "react";
import './css/header.css';
import {Link} from 'react-router-dom'

const Header = ({loggedIn, setLoggedIn}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoggedIn(false);

    window.localStorage.clear();
  }
  return(
    <div id = "headclan">
     <Link to='/'><h1>StoneCaps</h1></Link>
      <Link to='/cart'><img src="https://w7.pngwing.com/pngs/1008/303/png-transparent-shopping-cart-icon-product-return-shopping-cart-retail-supermarket-objects.png"></img></Link>
      <Link to='/shop'><img src="https://freeiconshop.com/wp-content/uploads/edd/shopping-bag-outline.png"></img></Link>
      <button id = 'menu' type = 'button'><img src="https://cdn-icons-png.flaticon.com/512/2801/2801909.png"></img></button>
      
      {!loggedIn ? <Link to='/login'>Login/Register</Link> : <button id= 'logout' onClick={handleSubmit}>Logout</button>}
    </div>
  )
}

export default Header;
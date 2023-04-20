import React from "react";
import './css/header.css';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Header = ({isLoggedIn, setIsLoggedIn}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoggedIn(false);

    window.localStorage.clear();
  }
  return(
    <div id = "headclan">

      <Link to='/shop'> <FontAwesomeIcon id='shop' icon={faBagShopping} /></Link>      
      {!isLoggedIn ? <Link id='login' to='/login'>Login/Register</Link> : <button id= 'logout' onClick={handleSubmit}>Logout</button>}
      <Link to='/'><h1 id='title'>StoneCaps</h1></Link>
      <Link to='/cart'><img id='cart' src="https://w7.pngwing.com/pngs/1008/303/png-transparent-shopping-cart-icon-product-return-shopping-cart-retail-supermarket-objects.png"></img></Link>
      <button type ='button'> <FontAwesomeIcon id ='menu' icon={faBars}/></button>
      
    </div>
  )
}

export default Header;
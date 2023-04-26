import React, { useState } from "react";
import './css/header.css';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('token'));
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoggedIn(false);

    window.localStorage.clear();
  }
  return(
    <div id = "headclan">

      <Link to='/shop'> <FontAwesomeIcon id='shop' icon={faBagShopping} /></Link>      
      {!isLoggedIn ? <Link id='login' to='/login'>Login/Register</Link> : <button id= 'logout' onClick={handleSubmit}>Logout</button>}
      <Link id='title' to='/'><h1>StoneCaps</h1></Link>
      <Link to='/cart'>< FontAwesomeIcon id='cart' icon={faCartShopping} /></Link>
      <button id='menuButton' type ='button'> <FontAwesomeIcon id ='menu' icon={faBars}/></button>
      
    </div>
  )
}

export default Header;
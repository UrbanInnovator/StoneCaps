import React, { useState } from "react";
import './css/header.css';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faMountain } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('stoken'));
  
  const logOut =(e) => {
    localStorage.removeItem('stoken');
    localStorage.removeItem('userId');
    window.location.replace('/');
  }

  return(
    <div id = "headclan">

      <Link to='/shop' className="iconCon"> <FontAwesomeIcon className='icon' icon={faBagShopping} /></Link>      
      {
      !isLoggedIn ? 
        <Link className='log' to='/login'>Sign In</Link> 
        : <button  className='log' onClick={logOut}>Logout</button>}
      <Link id='title' to='/'><h1>StoneCaps</h1></Link>
      <Link to='/cart' className="iconCon">< FontAwesomeIcon className='icon' icon={faCartShopping} /></Link>
      <a href='https://www.petrock.com' className="iconCon"> <FontAwesomeIcon className='icon' icon={faMountain}/></a>

    </div>
  )
}

export default Header;
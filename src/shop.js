//Displays the shop itself
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import './css/shop.css';

const Shop = () => {
  const [ products, setProducts ] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    const getProducts = async() => {
      try{
        const response = await axios.get('/api/products/');
        setProducts(response.data);
        console.log(response.data);
      }catch(error) {
        console.log(error);
      }
    }
    getProducts();
  }, [])

const shophead = {
  color: ''
}

  return(
    <div id='productbox'>
    <h1 style={shophead}>Shop</h1>
      {
        products.map((product, index) => {
          const productRoute = '/' + product.id;
          return (
            <div id='routine' key={index}>
              <img className='pics' src={product.imageURL} />
              <Link to={productRoute} className='titles'>{product.name}</Link>
              <h4 className="price">Price: {product.price}</h4>
              <button className='addcart'>Add To Cart</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Shop;
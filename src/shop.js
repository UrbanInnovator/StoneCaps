//Displays the shop itself
import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/shop.css';

const Shop = () => {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    const getProducts = async() => {
      try{
        const response = await axios.get('/api/products');
        setProducts(response.data);
        console.log(products);
      }catch(error) {
        console.log(error);
      }
    }
    getProducts();
  }, [])

  return(
    <div id='productbox'>
      {/* {
        products.map((product, index) => {
          return (

          )
        })
      } */}
    </div>
  )
}

export default Shop;
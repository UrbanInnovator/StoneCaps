//This component is for when a single product is clicked on
//displays the product's name, price, description, image, and an addToCart option
import React, {useEffect, useState} from "react";
import axios from "axios";
import './css/item.css';
import {useParams} from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState({});
  const {id} = useParams();

  useEffect(() => {
    const getSingleProduct = async(id) => {
      try{
        const response = await axios.get(`/api/products/${id}`);
        console.log(response)
        setProduct(response.data);
      }catch(error){
        console.log(error);
      }
    }
    getSingleProduct(id);
    
  }, []);
  return(
    <div id = "Bio">
      {
        <img className='pics' src={product.imageURL} />
        
      }

    </div>
  )
}

export default Product;
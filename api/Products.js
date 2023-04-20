const express = require('express')
const { getAllProducts } = require('../DB')
const router = express.Router();


//GET /api/products
router.get('/', async (req,res, next)=> {
    try{
        const products = await getAllProducts();
        res.send(products);
    }catch(error){
        next(err);
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();

// ROUTER: /api/products
const productsRouter = require('./Products');
router.use('/products', productsRouter);

// ROUTER: /api/users
const usersRouter = require('./Users');
router.use('/users', usersRouter);

module.exports = router;
const express = require('express');
const router = express.Router();

// ROUTER: /api/products
const productsRouter = require('./Products');
router.use('/products', productsRouter);

// ROUTER: /api/users
const usersRouter = require('./Users');
router.use('/users', usersRouter);

router.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message
    });
});

router.get('*', (req,res,next) => {
    res.status(404).send({
        error: "BROKEN",
        name: "RouteDoesNotExistError",
        message: "Sorry, the page you're looking for isn't here"
    })
})

module.exports = router;
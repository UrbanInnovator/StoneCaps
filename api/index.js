const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env

router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next()
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({name, message}) {
            next({name, message});
        }
    } else {
        next({
            name: "AuthorizationHeaderError",
            message: `Authorization token must start with ${prefix}`
        });
    }
})

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
const { Client } = require('pg');
// const {
//     getUser,
//     getAllUsers,
//     getUserById,
//     getUserByUsername
// } =  require('./users');
// const {
//     getAllProducts,
//     getProductById
// } =  require('./products');

const client = new Client(process.env.DATABASE_URL || 'postgress://localhost:5432/stonecaps-dev');

module.exports = {
    client,
    // getUser,
    // getAllUsers,
    // getUserById,
    // getUserByUsername,
    // getAllProducts,
    // getProductById
    
};


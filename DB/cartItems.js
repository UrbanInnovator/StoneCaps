const { client } = require("./index.js");

const createCartItem = async (productId, cartId, quantity) => {
    try {
        const { rows: [cartItem] } = await client.query(`
            INSERT INTO cart_items("productId", "cartId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [productId, cartId, quantity]);
        
        return cartItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllCartItemsByCartId = async (cartId) => {
    try {
        const { rows: cartItems } = await client.query(`
            SELECT *
            FROM cart_items
            WHERE "cartId" = $1
        `, [cartId]);
        return cartItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createCartItem,
    getAllCartItemsByCartId
}
const { client } = require("./index.js");
const {
    getAllCartItemsByCartId
} = require("./cartItems.js");

const createOrder = async (userId, total, cartId) => {
    try {
        const cartItems = await getAllCartItemsByCartId(cartId);
        const productIds = cartItems.map((i) => {
            return i.id;
        });

        const { rows: [order] } = await client.query(`
            INSERT INTO orders("userId", total)
            VALUES ($1, $2)
            RETURNING *;
        `, [userId, total]);

        productIds.map(async (j) => {
            const { rows: [orderItem] } = await client.query(`
                INSERT INTO order_items("orderId", "productId")
                Values ($1, $2)
                RETURNING *;
            `, [order.id, j]);
        });

        const { rows: [deletedCartItem] } = await client.query(`
            DELETE FROM cart_items
            WHERE "cartId" = $1
            RETURNING *;
        `, [cartId]);
        return order;
    } catch (error) {
        throw error;
    }
}

const getOrderById = async (id) => {
    try {
        const { rows: [order] } = await client.query(`
            SELECT *
            FROM orders
            WHERE id = $1;
        `, [id]);
        return order;
    } catch (error) {
        throw error;
    }
}

const getAllOrdersByUserId = async (userId) => {
    try {
        const { rows: order } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId" = $1
        `, [userId]);
        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getAllOrdersByUserId
}


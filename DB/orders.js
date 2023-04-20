const { client } = require("./index.js");

const createOrder = async (userId, total, orderedAt) => {
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders("userId", total, "orderedAt")
        VALUES ($1, $2, $3)
        RETURNING *;
        `, userId, total, orderedAt);
        return order;
    } catch (error) {
        throw error;
    }
}


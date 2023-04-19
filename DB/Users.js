const {client} = require("./index.js");

const createUser = async ({
    username,
    password,
    isAdmin
}) => {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, "isAdmin")
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
    `, [username, password, isAdmin])
    return user;
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        const { rows: users } = await client.query(`
            SELECT *
            FROM users;
        `)
        return users;
    } catch (error) {
        throw error;
    }
}

module.exports = {createUser, getAllUsers};
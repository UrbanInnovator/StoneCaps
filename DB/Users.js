const { client } = require("./index.js");

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

const getUser = async (username, password) => {
    if (!username || !password) {
        return;
    }
    try {
        const user = await getUserByUsername(username);
        // const matchPasswords = await bcrypt.compare(password, user.password);

        if (!user) {
            return;
        }
        // if (!matchPasswords) {
        //     return;
        // }
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (userId) => {
    try {
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE id=${userId}`);

        if (!user) {
            return null
        }
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByUsername = async (username) => {
    try {
        const { rows : [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1`, [username]);

    if(!user){
      return null;
    }
    delete user.password;
    return user;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    createUser, 
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername
};
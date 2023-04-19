const client = require("./index");

const dropTables = async () => {
    try {
        console.log("Dropping All Tables...");

        await client.query(`
            DROP TABLE IF EXISTS users cascade;
            DROP TABLE IF EXISTS products cascade;
        `);

    } catch (error) {
        console.log("error dropping tables")
        throw error;
    }
}

const createTables = async () => {
    try {
        console.log("Starting to build tables...");

        await client.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
            );

            CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            description varchar(255) NOT NULL,
            price float NOT NULL
            );
          `);

    } catch (error) {
        console.log("error creating tables");
        throw error;
    }
}

const rebuildDB = async() => {
    try {
        client.connect();

        await dropTables();
        await createTables();
    } catch (error) {
        console.log("error rebuilding database");
        throw error;
    }
}

rebuildDB();
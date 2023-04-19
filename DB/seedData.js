const client = require("./client");

const {
    createUser,
    getAllUsers
} = require("./users");

const {
    createProduct,
    getAllProducts
} = require("./products");

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
            "imageURL" varchar(255) NOT NULL,
            price float NOT NULL
            );
          `);

    } catch (error) {
        console.log("error creating tables");
        throw error;
    }
}

const createInitialUsers = async() => {
    try {
        console.log('creating initial users...');
        await createUser({
            username: "bob",
            password: "password",
            isAdmin: false
        });
        await createUser({
            username: "lassy",
            password: "password",
            isAdmin: true
        });
        await createUser({
            username: "phillis",
            password: "password",
            isAdmin: false
        });
        console.log('finished creating initial users...');
    } catch (error){
        console.log('error creating initial user');
        throw error;
    }
    
}

const createInitialProducts = async() => {
    try {
        console.log('creating initial products...')
        await createProduct({
            name: "Yankees Hat", 
            description: "a hat for yankees",
            imageURL: "../StoneCapImages/NYHat.jpg",
            price: 20.32
        });
        await createProduct({
            name: "Cowboy Hat", 
            description: "a cowboy hat for rocks",
            imageURL: "../StoneCapImages/Beanie.jpg",
            price: 19.07
        });
        await createProduct({
            name: "Storm Trooper Hat", 
            description: "a hat for someone who can't hit a lazer",
            imageURL: "../StoneCapImages/StormTrooperHelmet.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Beanie", 
            description: "a beanie for rocks",
            imageURL: "../StoneCapImages/Beanie.jpg",
            price: 5.00
        });
        console.log('finished creating initial products...')
    } catch (error){
        console.log("error creating initial product");
        throw error;
    }
}

const rebuildDB = async() => {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialProducts();

    } catch (error) {
        console.log("error rebuilding database");
        throw error;
    }
}

const testDB = async() => {
    try {

        console.log ("starting to test database...");
        console.log("calling getAllUsers...");
        const users = await getAllUsers();
        console.log("Users Result:", users);
        console.log("calling getAllProducts...");
        const products = await getAllProducts();
        console.log("Products Result:",  products);
        console.log("Finished database tests!");
        console.log("Disconnecting client...");
        client.end();
        console.log("Client disconneted!");
        
    } catch(error) {
        console.log("Error during testDB");
        throw error;
    }
}

rebuildDB()
    .then(testDB);

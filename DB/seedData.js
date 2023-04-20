const {client} = require('./index');

const {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername
} = require("./users");

const {
    createProduct,
    getAllProducts,
    getProductById
} = require("./products");

const dropTables = async () => {
    try {
        console.log("Dropping All Tables...");

        await client.query(`
            DROP TABLE IF EXISTS users cascade;
            DROP TABLE IF EXISTS products cascade;
            DROP TABLE IF EXISTS orders cascade;
            DROP TABLE IF EXISTS order_items cascade;
            DROP TABLE IF EXISTS cart_items cascade;
            DROP TABLE IF EXISTS cart cascade;

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

            CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                total float NOT NULL,
                "orderedAt" timestamp NOT NULL
            );

            CREATE TABLE order_items (
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id),
                "productId" INTEGER REFERENCES products(id),
                UNIQUE ("orderId")
            );

            CREATE TABLE cart (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id)
            );

            CREATE TABLE cart_items (
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id),
                "cartId" INTEGER REFERENCES cart(id),
                quantity INTEGER NOT NULL
            );

          `);

    } catch (error) {
        console.log("error creating tables");
        throw error;
    }
}

const createInitialUsers = async() => {
    try {
        console.log('Creating initial users...');
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
        console.log('Finished creating initial users...');
    } catch (error){
        console.log('error creating initial user');
        throw error;
    }
    
}

const createInitialProducts = async() => {
    try {
        console.log('Creating initial products...')
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
        console.log('Finished creating initial products...')
    } catch (error){
        console.log("error creating initial product");
        throw error;
    }
}

const createInitialOrders = async () => {

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

        console.log ("Starting to test database...");
        console.log("Calling getAllUsers...");
        const users = await getAllUsers();
        console.log("Users Result:", users);
        console.log("Calling getUser...");
        const user = await getUser("bob", "password");
        console.log("User bob returned:", user);
        console.log("Calling getUserById...");
        const userById = await getUserById('2');
        console.log("User lassy returned:", userById);
        console.log("Calling getUserByUsername...");
        const userByUsername = await getUserByUsername('phillis');
        console.log("User phillis returned:", userByUsername);
        console.log("calling getAllProducts...");
        const products = await getAllProducts();
        console.log("Products Result:",  products);
        console.log("Calling getProductById...");
        const productById = await getProductById('1');
        console.log("Product 1 returned:", productById);
        console.log("Finished database tests!");
        console.log("Disconnecting from the matrix...");
        client.end();
        console.log("Matrix disconneted!");
        
    } catch(error) {
        console.log("Error during testDB");
        throw error;
    }
}

rebuildDB()
    .then(testDB);

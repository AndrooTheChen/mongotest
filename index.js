// initialize mongodb client
const {MongoClient} = require("mongodb");
//const MongoClient = require("mongodb").MongoClient;

// host uri
const uri = "mongodb://localhost:27017"
connect();

// function to try and connect to databse
async function connect() {
    const client = new MongoClient(uri);
    try {
        // attempt to establish TCP connection
        await client.connect();
        const db = client.db("db0");
        console.log(`Connected to database ${db.databaseName}`);
        
    }
    catch (ex) {
        // connection failed, print error message
        console.error(`Connection failed: ${ex}`);
    }
    finally {
        // close connection
        client.close();
    }
}

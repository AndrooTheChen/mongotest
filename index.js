// initialize mongodb client
const {MongoClient} = require("mongodb");
//const MongoClient = require("mongodb").MongoClient;

// host uri
const uri = "mongodb://localhost:27017"
//connect();
const name = "Aqua"
const rating = 8;

// create client instance
const client = new MongoClient(uri);

// populateDb(name, rating);
checkIfExists("Aquaa");


async function populateDb(name, rating) {
    try {
        await client.connect();
        const db = client.db("mydb");
        console.log(`Connnected to datasbase ${db.databaseName}`);

        // get collection
        const mycollection = db.collection("mycollection");
        
        // insert entry into collection
        const insertCursor = await mycollection.insertOne({
            "name": name,
            "rating": rating,
        });
        console.log(`Successfully inserted ${insertCursor.insertedCount} entries`);
    }
    catch (ex) {
        console.log(`Connection failed! Error: ${ex}`);
    }
    finally {
        console.log("Closing TCP connection");
        client.close();
    }
}

async function checkIfExists(name) {
    try {
        await client.connect();
        const db = client.db("mydb");
        console.log(`Connected to database ${db.databaseName}`);

        // get collection
        const mycollection = db.collection("mycollection");
        
        // search db
        await mycollection.findOne({"name": name}, function (err, result) {
            // if (err || result === undefined || result.length == 0) {
            //     console.log(`Search returned empty!`);
            //     throw err;
            // } else {
            //     // console.log(result[0].name);
            //     console.log(result);
            // }
            if (err || result == null) {
                console.log('no results');
                return;
            }
            console.log(result);
        });
    }
    catch(ex) {
        console.log(`Connection failed! Error: ${ex}`);
    }
    finally {
        console.log("Closing TCP connection");
        client.close();
    }
}


// function to try and connect to databse
async function connect() {
    const client = new MongoClient(uri);
    try {
        // attempt to establish TCP connection
        await client.connect();
        const db = client.db("db0");
        console.log(`Connected to database ${db.databaseName}`);
        
        // get all collections
        // const collections = await db.collections();
        // collections.forEach(c => console.log(c.collectionName));

        // get 'employee' collection
        const employees = db.collection("employees");
        //const searchCursor = await employees.find({"name":"Hayasaka"}); // search specific field
        const searchCursor = await employees.find();

        // wait for cursor to return everything from promise, VERY BAD!!
        const result = await searchCursor.toArray();
        result.forEach(r=>console.log(r));
        //console.table(result);  // return in table format


        // console.log(await searchCursor.hasNext());
        // while (await searchCursor.hasNext()) {
        //     console.log(await searchCursor.next());
        // }

        // Insert into collection
        // const insertCursor = await employees.insertMany([
        //     {
        //         "name": "Chika",
        //         "ssn":555,
        //     },
        //     {
        //         "name":"Ishigami",
        //         "ssn":444
        //     }
        // ]);

        // Print insertion
        //console.log(`Inserted ${insertCursor.insertedCount} entries`);
    
        // Update entry
        const updateCursor = await employees.updateOne(
            {"name":"Hayasaka"}, 
            {"$set": {"ssn":"24"}}
        );

        console.log(`Updated ${updateCursor.modifiedCount} entries`);

        // const addJunk = await employees.insertOne({"name":"Jar Jar", "ssn":"69"});
        // console.log(`Added ${addJunk.insertedCount} piece of shit`);

        // const deleteCursor = await employees.deleteOne(
        //     {"name": "Ishigami"}
        // );
        // console.log(`Deleted ${deleteCursor.deletedCount} entries`);
    }
    catch (ex) {
        // connection failed, print error message
        console.error(`Connection failed: ${ex}`);
    }
    finally {
        // close connection
        console.log(`Closing TCP connection.`)
        client.close();
    }
}

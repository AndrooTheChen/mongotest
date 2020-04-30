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

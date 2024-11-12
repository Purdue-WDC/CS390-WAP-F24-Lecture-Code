// Lecture 23 Code (MongoDB) 
// Here I run basic MongoDB queries using their node.js library.

const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv'); // to load .env variables, we need to import the dotenv library and run config().
dotenv.config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version.
// note that we access .env variables using proces.env.[variable_name].
// MONGO_URI should have the following format: mongodb+srv://<db_username>:<db_password>@cluster0.iehzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // access a particular database
    const database = client.db("DB1");

    // access a particular collection within that database
    const collection = database.collection("Users");

    // perform operation on that collection.
    const res = await collection.insertOne({
        username: "invalid_user",
        password: "invalid_user_password",
        email: "unique"
    });
    console.log(res);
  }
  catch {
    console.error(error);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run();
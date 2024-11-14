// Lecture "24" Code (MongoDB Examples) 
// Here I run basic MongoDB queries within express routes (like what you will do for HW6).
// NOTE: Make sure to add your .env file containing MONGODB_URI.

const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// ESTABLISH MONGODB ATLAS CONNECTION

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// INIT EXPRESS APP

const app = express();

app.use(cors());
app.use(bodyParser.json());

async function signup_handler(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const database = client.db("sample_mflix");
    const collection = database.collection("users");

    // ensure we arent inserting a user with the same email (emails should be distinct).
    // note: we will talk about this on Monday, but this is actually redundant since the database has a unique index set up on email.
    const find_res = await collection.findOne({ email });
    if (find_res?._id) {
      throw new Error("A user with this email already exists");
    }

    // try inserting new user
    const new_user = { name, email, password };
    const insert_res = await collection.insertOne(new_user);
    console.log(insert_res)
    if (insert_res.acknowledged) {
      new_user._id = insert_res.insertedId; // match new_user to new mongodb doc
      res.status(201).json(new_user);
    } else {
      throw new Error("Unable to insert user");
    }
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};

app.post("/signup", (req, res, next) => {
  signup_handler(req, res, next);
});

/**
 * Example requests (try these out in Postman):
 * 
 * POST http://localhost:3000/signup
 * Body: {
 *    "name": "Ned Stark",
 *    "email": "sean_bean@gameofthron.es",
 *    "password": "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
 * }
 * Expected result: Because a user with this email already exists, we have:
 * {
 *    "error_message": "A user with this email already exists"
 * }
 * 
 * POST http://localhost:3000/signup
 * Body: {
 *    "name": "New User",
 *    "email": "new_user@gameofthron.es",
 *    "password": "123"
 * }
 * Expected result: No email conflict, user is added to database and their new document is returned:
 * {
 *    "name": "New User",
 *    "email": "new_user@gameofthron.es",
 *    "password": "123",
 *    "_id": "67355c3508e4c2e4dfdb0cd0" (or some other id of similar format)
 * }
 */

const EXPRESS_PORT = 3000;
app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});
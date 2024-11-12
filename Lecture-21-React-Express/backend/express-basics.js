// Lecture 21 Code (Express) 
// Here I created a basic express app with routers.

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// GLOBAL DATA

const user_data = {
  "arnav": {
    password: "123",
    email: "sup@gmail.com",
    role: "admin"
  },
  "bob": {
    password: "321",
    email: "bobby@gmail.com",
    role: "user"
  }
};

// INIT EXPRESS SERVER

const app = express();

app.use(cors());
app.use(bodyParser.json());

// example of a login handler. you might consider using this for hw5.
// request: POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!user_data[username] || user_data[username].password !== password) {
    res.status(401);
    res.send("Incorrect username or password");
  } else {
    res.status(200);
    res.json(user_data[username]);
  }
});

// if you want to run middleware for a specific set of routes, I recommend placing all that routes into the same router.
const protected_router = express.Router();

// make sure the app (root router) uses the new router we created.
app.use('/account', protected_router);

// note: this is just a placeholder function, we will cover security implementation down the line.
function isSecurityInfoValid(req) {
  return true; // toggle this value to see what our next middleware does in each case.
};

// now, we can specify the middleware to run using .use(...) on the router.
protected_router.use((req, res, next) => {
  const is_authorized = isSecurityInfoValid(req);
  if (!is_authorized) {
    // since methods like .status(...), .send(...), and .json(...) return
    // the response object itself, we can chain them together like this:
    res.status(401).send("Not authorized"); 
    // because next() is not called here, no other middlewares will run.
  } else {
    next(); // run next matching middleware (which is probably the /edit or /delete handlers)
  }
});

// request: POST /account/edit
// '/account' comes from how protected_router is used.
protected_router.post('/edit', (req, res) => {
  // some logic
  res.status(501).send("Request handler not implemented");
});

// request: POST /account/delete.
// '/account' comes from how protected_router is used.
protected_router.post('/delete', (req, res) => {
  // some logic
  res.status(501).send("Request handler not implemented");
});

// start listening on port for http requests
const EXPRESS_PORT = 3000;
app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});
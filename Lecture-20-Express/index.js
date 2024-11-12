// Because this app is not ran in the browser, we need to use CommonJS (Node.js) syntax.
// For imports, this means using require instead of import.
const express = require("express");

const app = express();

const PORT = 3000;

const MW1 = (request, response, next) => {
    const condition = false;
    if (condition) {
        response.send("hello from mw1");
        response.status("200");
    } else {
        next()
    }
};

const MW2 = (request, response, next) => {
    response.send("hello from mw2");
    response.status("200");
};

app.get("/", MW1, MW2);

app.listen(PORT, () => {
    console.log("now listening...")
});
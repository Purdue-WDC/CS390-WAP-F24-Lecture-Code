// Because this app is not ran in the browser, we need to use CommonJS (Node.js) syntax.
// For imports, this means using require instead of import.
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
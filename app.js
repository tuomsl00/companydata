require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT;
app.listen(port || 3000);
module.exports = app;

console.log(`Listening on port ${port}`)

new (require("./get"))(app);




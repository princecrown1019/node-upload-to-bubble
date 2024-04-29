const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config();


// Import router module
const router = require("./src/routes/upset.routes");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use the router module with the app
app.use("/api", router);


// set port, listen for requests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
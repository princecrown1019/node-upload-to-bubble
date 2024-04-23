const express = require("express");
const router = express.Router();

const upsetController = require("../controllers/upset.controllers");

router.post("/createNewProduct", upsetController.createNewProduct);

module.exports = router;
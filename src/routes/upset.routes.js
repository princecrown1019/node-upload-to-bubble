const express = require("express");
const multer = require('multer');

const router = express.Router();
const upload = multer();

const fields = upload.fields([
    { name: 'name' },
    { name: 'category' },
    { name: 'price' },
    { name: 'rate' },
    { name: 'photo', maxCount: 10 },
]);

const upsetController = require("../controllers/upset.controllers");

router.post("/createNewProduct", fields, upsetController.createNewProduct);
router.post("/createNewCategory", upsetController.createNewCategory);

module.exports = router;
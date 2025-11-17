const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const { createProduct, getProducts } = require("../Controller/Product");

// Create product with multiple images
router.post("/create", upload.array("images"), createProduct);

// Optional: Get all products
router.get("/getAll", getProducts);

module.exports = router;

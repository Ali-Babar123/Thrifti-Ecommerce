const express = require("express");
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../Controller/Product");
const { verifyToken } = require("../middleware/authmiddleware");

// Create product with multiple images
router.post("/create", verifyToken, createProduct);

// Optional: Get all products
router.get("/getAll", getProducts);
router.put("/update/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);

module.exports = router;

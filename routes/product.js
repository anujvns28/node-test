const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

const {
    addProduct,
    addProductPage,
    deleteProduct,
    getProducts,
    editProductPage,
    updateProduct
} = productController;

// get
router.get("/", getProducts);

// Add
router.get("/add", addProductPage);
router.post("/add", addProduct);

// Edit
router.get("/edit/:id", editProductPage);
router.post("/edit/:id",updateProduct);

// Delete
router.get("/delete/:id", deleteProduct);

module.exports = router;

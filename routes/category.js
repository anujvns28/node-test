const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");

const {
    addCategory,
    addCategoryPage,
    deleteCategory,
    editCategoryPage,
    getCategories,
    updateCategory
} = categoryController;

// get
router.get("/", getCategories);

// Add
router.get("/add", addCategoryPage);
router.post("/add", addCategory);

// Edit
router.get("/edit/:id", editCategoryPage);
router.post("/edit/:id", updateCategory);

// Delete
router.get("/delete/:id", deleteCategory);

module.exports = router;

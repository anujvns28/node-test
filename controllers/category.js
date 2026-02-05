const db = require("../config/connection");

// get Categories
exports.getCategories = (req, res) => {
  const query = "SELECT * FROM categories";

  db.query(query, (err, results) => {
    if (err) throw err;
    res.render("category/list", { categories: results });
  });
};

// Add category
exports.addCategoryPage = (req, res) => {
  res.render("category/add");
};


exports.addCategory = (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO categories (name) VALUES (?)";

  db.query(query, [name], (err) => {
    if (err) throw err;
    res.redirect("/categories");
  });
};

// Update category
exports.editCategoryPage = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM categories WHERE id = ?",
    [id],
    (err, results) => {
      if (err) throw err;
      res.render("category/edit", { category: results[0] });
    }
  );
};


exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, id],
    (err) => {
      if (err) throw err;
      res.redirect("/categories");
    }
  );
};

// Delete category
exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM categories WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.redirect("/categories");
  });
};

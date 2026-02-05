const db = require("../config/connection");

// get products
exports.getProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const countQuery = "SELECT COUNT(*) AS total FROM products";

  db.query(countQuery, (err, countResult) => {
    if (err) throw err;

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    const dataQuery = `
      SELECT 
        p.id AS productId,
        p.name AS productName,
        c.id AS categoryId,
        c.name AS categoryName
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LIMIT ? OFFSET ?
    `;

    db.query(dataQuery, [limit, offset], (err, products) => {
      if (err) throw err;

      res.render("product/list", {
        products,
        currentPage: page,
        totalPages,
      });
    });
  });
};


// add product
exports.addProductPage = (req, res) => {
  db.query("SELECT * FROM categories", (err, categories) => {
    if (err) throw err;
    res.render("product/add", { categories });
  });
};


exports.addProduct = (req, res) => {
  const { name, category_id } = req.body;

  const query = `
    INSERT INTO products (name, category_id)
    VALUES (?, ?)
  `;

  db.query(query, [name, category_id], (err) => {
    if (err) throw err;
    res.redirect("/products");
  });
};


// delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.redirect("/products");
  });
};


// edit product
exports.editProductPage = (req, res) => {
  const { id } = req.params;

  const productQuery = "SELECT * FROM products WHERE id = ?";
  const categoryQuery = "SELECT * FROM categories";

  db.query(productQuery, [id], (err, productResult) => {
    if (err) throw err;

    db.query(categoryQuery, (err, categories) => {
      if (err) throw err;

      res.render("product/edit", {
        product: productResult[0],
        categories,
      });
    });
  });
};


exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;

  const query = `
    UPDATE products
    SET name = ?, category_id = ?
    WHERE id = ?
  `;

  db.query(query, [name, category_id, id], (err) => {
    if (err) throw err;
    res.redirect("/products");
  });
};



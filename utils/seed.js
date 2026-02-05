const { faker } = require("@faker-js/faker");
const db = require("../config/connection");

const runSeeder = async () => {
  try {
    const categories = [];
    for (let i = 0; i < 10; i++) {
      categories.push([faker.commerce.department()]);
    }

    db.query(
      "INSERT INTO categories (name) VALUES ?",
      [categories]
    );
    console.log("Categories added");

    //products
    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push([
        faker.commerce.productName(),
        faker.number.int({ min: 1, max: 10 }),
      ]);
    }

    db.query(
      "INSERT INTO products (name, category_id) VALUES ?",
      [products]
    );
    console.log("Products added");
    
  } catch (err) {
    console.error("Seeder error:", err);
    
  }
};

runSeeder();

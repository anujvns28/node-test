-- category
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- product
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

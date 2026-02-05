const express = require("express");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
require("dotenv").config();


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// DB
require("./config/connection");

// View Engine
app.set("view engine", "ejs");


// Routes
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

// Home redirect
app.get("/", (req, res) => {
  res.redirect("/categories");
});

// Server
console.log(process.env.port)
const PORT = process.env.port;
app.listen(PORT, () => {
  console.log("server started");
});

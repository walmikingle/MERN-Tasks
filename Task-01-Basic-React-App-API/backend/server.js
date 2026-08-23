const Product = require("./models/Product");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;


app.get("/api/products", async (req,res) => {
  try {
    const products = await Product.find() ;

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetch Products",
    });
  }
});

// app.get("/api/products", (req,res)=> {
//   res.json(products);
// });

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Create Product",
      error: error.message,
    });
  }
});



mongoose 
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT,() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
  })

  .catch((error) => {
    console.log("Mongo DB COnnecion Failed: ", error.message);
  })
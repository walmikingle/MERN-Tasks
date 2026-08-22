const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const products = [
  {
    name: "Laptop",
    price: 55000,
    category: "Electronics",
  },

  {
    name: "Wireless Mouse",
    price: 1200,
    category: "Accessories",
  },

   {
    name: "Mechanical Keyboard",
    price: 2399,
    category: "Accessories",
  }
]


app.get("/",(req,res)=> {
  res.send("Mern backend is Running");
});

app.get("/api/products", (req,res)=> {
  res.json(products);
});



mongoose 
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT,() => {
  console.log(`Server running on https://localhost:${PORT}`);
});
  })

  .catch((error) => {
    console.log("Mongo DB COnnecion Failed: ", error.message);
  })
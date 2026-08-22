const express = require("express")

const app = express();
const PORT = 5000;

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

app.listen(PORT,() => {
  console.log(`Server running on https://localhost:${PORT}`);
});
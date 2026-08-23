const mongoose = require("mongoose");

const productScehma = new mongoose.Schema(
   {
  name: {
    type: String,
    required:true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
},
{
  timestamps:true,
}

);

module.exports = mongoose.model("Product", productScehma);
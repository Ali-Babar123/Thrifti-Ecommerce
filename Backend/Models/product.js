const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    category: String,
    brand: String,
    condition: String,
    colors: [String],
    materials: [String],
    size: String,
    price: Number,
    parcelSize: String,
    images: [String], // URLs from Firebase
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

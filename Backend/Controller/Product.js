const Product = require("../Models/product");
const { uploadToFirebase } = require("../middleware/upload");

// Create new product
exports.createProduct = async (req, res) => {
  try {
    // Upload images to Firebase Storage
    console.log(req.files)
    const imageUrls = await uploadToFirebase(req.files);

    // Create product document
    const product = new Product({
      user: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      condition: req.body.condition,
      colors: JSON.parse(req.body.colors || "[]"),
      materials: JSON.parse(req.body.materials || "[]"),
      size: req.body.size,
      price: req.body.price,
      parcelSize: req.body.parcelSize,
      images: imageUrls,
    });

    await product.save();

    res.status(201).json({ success: true, data: product });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Optional: Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

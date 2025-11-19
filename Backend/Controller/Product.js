const Product = require("../Models/product");
const { uploadImages } = require("../middleware/uploadToCloudinary");

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const base64Images = Array.isArray(req.body.images)
      ? req.body.images
      : [req.body.images];

    const imageUrls = await uploadImages(base64Images);

    const product = new Product({
      user: req.user._id,
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

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // If images are provided, upload them
    let imageUrls;
    if (req.body.images) {
      const base64Images = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
      imageUrls = await uploadImages(base64Images);
    }

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      condition: req.body.condition,
      colors: req.body.colors ? JSON.parse(req.body.colors) : undefined,
      materials: req.body.materials ? JSON.parse(req.body.materials) : undefined,
      size: req.body.size,
      price: req.body.price,
      parcelSize: req.body.parcelSize,
      ...(imageUrls && { images: imageUrls }), // Only set images if new ones uploaded
    };

    // Remove undefined fields
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const product = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

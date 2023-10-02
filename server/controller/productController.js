import express from "express";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // You may need to configure multer storage

// Import the Product model if it's defined
import Product from "../models/Product";

// ADD PRODUCT
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, category, description, price, stock_quantity } = req.body;
    const image = req.file ? req.file.path : null;

    const product = new Product({
      name,
      category,
      description,
      price,
      stock_quantity,
      image,
    });

    await product.save();

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// ALL PRODUCT
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// SINGLE PRODUCT
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// UPDATE PRODUCT
router.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, category, description, price, stock_quantity } = req.body;
    const image = req.file ? req.file.path : product.image;

    product.set({
      name,
      category,
      description,
      price,
      stock_quantity,
      image,
    });

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// DELETE PRODUCT
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// FILTER PRODUCT BY CATEGORY
router.get("/products/filter", async (req, res) => {
  try {
    const { category } = req.query;

    const filteredProducts = await Product.find({ category });

    if (filteredProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the specified category" });
    }

    return res.status(200).json({ products: filteredProducts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;

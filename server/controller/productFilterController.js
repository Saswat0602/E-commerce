import express from "express";
import Product from "../models/Product"; // Assuming you have a Product model defined

const router = express.Router();

// Route for filtering products by category
router.get("/filterByCategory", async (req, res) => {
  const { category } = req.query;

  try {
    const filteredProducts = await Product.find({ category });

    if (filteredProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the specified category" });
    }

    res.status(200).json({ products: filteredProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

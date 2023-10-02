import express from "express";
import Rating from "../models/rating"; // Assuming you have a Rating model
import User from "../models/user"; // Assuming you have a User model
import authMiddleware from "../middleware/auth"; // Assuming you have authentication middleware

const router = express.Router();

// Create a rating
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { product_id, rating, review } = req.body;
    const user = req.user; // User object from authentication middleware

    // Fetch the user's name from the User model
    const user_name = user.name;

    const existingRating = await Rating.findOne({
      user_id: user._id,
      product_id: product_id,
    });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();
    } else {
      await Rating.create({
        user_id: user._id,
        user_name: user_name, // Store the user's name
        product_id: product_id,
        rating: rating,
        review: review,
      });
    }

    return res.status(200).json({
      message: "Rating and review stored successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
});

// Get all ratings for a product
router.get("/:product_id", async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const ratings = await Rating.find({ product_id: product_id });

    return res.status(200).json({
      ratings: ratings,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
});

// Edit a rating
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const rating = await Rating.findById(id);

    if (!rating) {
      return res.status(404).json({
        message: "Rating not found",
        status: 404,
      });
    }

    const user = req.user; // User object from authentication middleware

    if (rating.user_id.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to edit this rating",
        status: 403,
      });
    }

    const { rating: newRating, review } = req.body;

    rating.rating = newRating;
    rating.review = review;
    await rating.save();

    return res.status(200).json({
      message: "Rating edited successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
});

// Delete a rating
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const rating = await Rating.findById(id);

    if (!rating) {
      return res.status(404).json({
        message: "Rating not found",
        status: 404,
      });
    }

    const user = req.user; // User object from authentication middleware

    if (rating.user_id.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this rating",
        status: 403,
      });
    }

    await rating.delete();

    return res.status(200).json({
      message: "Rating deleted successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
});

export default router;

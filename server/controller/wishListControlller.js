import Wishlist from "../models/wishlist";
import User from "../models/user";


// ADD TO WISHLIST

const addToWishlist =  async (req, res) => {
  try {
    const user = req.user; // Assuming user information is provided in the request
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlistItem = await Wishlist.findOne({
      user_id: user._id,
      product_id: product._id,
    });

    if (wishlistItem) {
      return res.status(200).json({ message: "Product already wishlisted" });
    }

    await Wishlist.create({
      user_id: user._id,
      product_id: product._id,
    });

    return res.status(201).json({ message: "Product wishlisted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}



const removeFromWishlist = async (req, res) => {
  try {
    const user = req.user; // Assuming user information is provided in the request

    const wishlistItems = await Wishlist.find({ user_id: user._id }).populate(
      "product_id"
    );

    return res.status(200).json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getWishlistItem =  async (req, res) => {
  try {
    const user = req.user; // Assuming user information is provided in the request
    const { id } = req.params;

    const wishlistItem = await Wishlist.findOne({
      user_id: user._id,
      _id: id,
    }).populate("product_id");

    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    return res.status(200).json(wishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getAllWishListItems = async (req, res) => {
  try {
    const user = req.user; 
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlistItem = await Wishlist.findOneAndDelete({
      user_id: user._id,
      product_id: product._id,
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export {addToWishlist,removeFromWishlist,getAllWishListItems,getWishlistItem}
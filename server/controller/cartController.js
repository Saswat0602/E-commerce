import express from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";

const router = express.Router();



const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user; // Assuming user information is available in the request

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await Cart.findOne({
      user_id: user._id,
      product_id: product._id,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        user_id: user._id,
        product_id: product._id,
        quantity: 1,
      });
      await cartItem.save();
    }

    return res
      .status(200)
      .json({ message: "Product added to cart successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const viewCart = async (req, res) => {
  try {
    const user = req.user; // Assuming user information is available in the request

    const cartItems = await Cart.find({ user_id: user._id }).populate(
      "product"
    );

    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};




const removeFromCart= async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const user = req.user; // Assuming user information is available in the request

    const cartItem = await Cart.findOne({ _id: cartItemId, user_id: user._id });

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cartItem.remove();

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}



const clearCart = async (req, res) => {
  try {
    const user = req.user; // Assuming user information is available in the request

    await Cart.deleteMany({ user_id: user._id });

    return res
      .status(200)
      .json({ message: "Cart has been cleared successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};



export {clearCart ,addToCart,removeFromCart,viewCart}
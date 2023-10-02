import express from "express";
import Order from "../models/Order"; // Assuming you have an Order model defined
import Cart from "../models/Cart"; // Assuming you have a Cart model defined
import authMiddleware from "../middleware/auth"; // Assuming you have an authentication middleware

const router = express.Router();

// Store order from user's cart
router.post("/store", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const cartItems = await Cart.find({ user_id: user._id });

    for (const cartItem of cartItems) {
      await Order.create({
        user_id: user._id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        order_date: new Date(),
      });

      await cartItem.remove();
    }

    return res
      .status(200)
      .json({ message: "Cart items have been ordered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error processing the order", error: error.message });
  }
});

// Get orders for a single user
router.get("/singleUserOrder", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const orderedItems = await Order.find({ user_id: user._id }).populate(
      "product"
    );

    return res.status(200).json({ ordered_items: orderedItems });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching ordered items", error: error.message });
  }
});

// Get all orders
router.get("/index", async (req, res) => {
  try {
    const products = await Order.find();

    return res.status(200).json({ products: products });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error fetching ordered products",
        error: error.message,
      });
  }
});

// Update order status
router.put("/updateOrderStatus/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const orderedItem = await Order.findById(orderId);

    if (!orderedItem) {
      return res.status(404).json({ message: "Ordered item not found" });
    }

    orderedItem.order_status = true;
    await orderedItem.save();

    return res
      .status(200)
      .json({ message: "Order status updated to true successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
});

export default router;

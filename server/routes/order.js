
import { changeOrderStatus, createOrder, getAllorder, getSingleOrder } from "../controller/orderControlller";
import authMiddleware from "../middleware/auth";
import express from "express";

const router = express.Router();

// Store order from user's cart
router.post("/store", authMiddleware,createOrder);

// Get orders for a single user
router.get("/singleUserOrder", authMiddleware,getSingleOrder );

// Get all orders
router.get("/index",getAllorder);

// Update order status
router.put("/updateOrderStatus/:orderId",changeOrderStatus );

export default router;

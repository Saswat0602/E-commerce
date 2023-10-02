import express from "express";
import Coupon from "../models/coupon";

const router = express.Router();

// ADD COUPON
router.post("/createCoupon", async (req, res) => {
  try {
    const { title, code, min_order, value, type, is_active } = req.body;

    const coupon = await Coupon.create({
      title,
      code,
      min_order,
      value,
      type,
      is_active,
    });

    res.status(201).json({
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error });
  }
});

// GET ALL COUPONS
router.get("/getAllCoupons", async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error });
  }
});

// GET SINGLE COUPON
router.get("/showCoupon/:id", async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ coupon });
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupon", error });
  }
});

// EDIT COUPON
router.put("/editCoupon/:id", async (req, res) => {
  try {
    const { title, code, min_order, value, type, is_active } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        title,
        code,
        min_order,
        value,
        type,
        is_active,
      },
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating coupon", error });
  }
});

// DELETE COUPON
router.delete("/deleteCoupon/:id", async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error });
  }
});

export default router;

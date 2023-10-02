import { createCoupon, deleteCoupon, editCoupon, getAllCoupons, singleCoupon } from "../controller/couponController";

import express from "express";

const router = express.Router();



// ADD COUPON
router.post("/createCoupon",createCoupon );

// GET ALL COUPONS
router.get("/getAllCoupons",getAllCoupons);

// GET SINGLE COUPON
router.get("/showCoupon/:id", singleCoupon);

// EDIT COUPON
router.put("/editCoupon/:id",editCoupon );

// DELETE COUPON
router.delete("/deleteCoupon/:id",deleteCoupon);

export default router;

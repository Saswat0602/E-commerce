import mongoose from "mongoose";

const { Schema } = mongoose;

const couponSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true, // Ensure coupon codes are unique.
  },
  min_order: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;

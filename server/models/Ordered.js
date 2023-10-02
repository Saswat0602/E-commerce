import mongoose from "mongoose";

const { Schema } = mongoose;

const orderedSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

const Ordered = mongoose.model("Ordered", orderedSchema);

export default Ordered;

import mongoose from "mongoose";

const { Schema } = mongoose;

const formDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  alternateNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model, adjust this reference as needed.
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", // Assuming you have an Order model, adjust this reference as needed.
  },
});

const FormData = mongoose.model("FormData", formDataSchema);

export default FormData;

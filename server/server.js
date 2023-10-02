import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user.js"; 
import productRouter from "./routes/product.js"
import couponRouter from "./routes/coupon.js";
import paymentRouter from "./routes/payment.js";
import ratingRouter from "./routes/rating.js";
import cartRouter from "./routes/cart.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());


app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/", couponRouter);
app.use("/", paymentRouter);
app.use("/", paymentRouter);
app.use("/", userRouter);
app.use("/", ratingRouter);
app.use("/", cartRouter);






const dbUrl = "mongodb://localhost:27017/Shop-Shop";
mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Database connected");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

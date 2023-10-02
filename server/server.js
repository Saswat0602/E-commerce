import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";

const dbUrl = "mongodb://localhost:27017/Shop-Shop";

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.use(helmet());



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

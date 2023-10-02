import {
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
  toggleUser,
} from "../controller/userController.js";

import express from "express";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", getSingleUser);

router.get("/", getAllUsers);

router.put("/toggle-activation/:id", toggleUser);

export default router;

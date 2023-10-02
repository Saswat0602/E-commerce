import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import validate from "../middleware/validate";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("hello from property backend server");
});

// Route for register
router.post("/api/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(403).json({ error: "Please fill up all fields" });
  }

  if (!password || !cpassword) {
    return res.status(401).json({ error: "Passwords are required!" });
  }

  const check = await User.findOne({ email: email });
  if (check) {
    return res.status(401).json({ msg: "User already exists" });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ msg: "User created successfully" });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

// Route for login
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Field missing" });
  }
  try {
    const findEmail = await User.findOne({ email: email });

    if (findEmail) {
      const userPass = await bcrypt.compare(password, findEmail.password);

      if (!userPass) {
        return res.status(400).json({ msg: "Invalid credentials" });
      } else {
        // Generate the user token
        const userToken = await findEmail.generateToken();
        const userId = findEmail._id;

        if (!userToken) {
          return res.status(500).json({ msg: "Internal server error" });
        } else {
          res.status(200).json({
            msg: "User logged in successfully",
            token: userToken,
            userId: userId,
          });
        }
      }
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in login", error: error });
  }
});

router.put("/api/login/:id", async (req, res) => {
  console.log(req.body);
});

// Route for Property page
router.get("/api/property", validate, (req, res) => {
  console.log(req.correctUser);

  const finalUser = req.correctUser;

  res.send(finalUser);
});

export default router;

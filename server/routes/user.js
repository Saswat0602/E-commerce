import { getAllUsers, getSingleUser, loginUser, registerUser, toggleUser } from "../controller/userController";


router.post("/register", registerUser);

// Log in a user
router.post("/login", loginUser);

// Get specific user by ID
router.get("/:id", getSingleUser);

// Get all users
router.get("/", getAllUsers);

// Toggle user's activation status
router.put("/toggle-activation/:id",toggleUser);

export default router;

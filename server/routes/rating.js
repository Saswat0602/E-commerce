import { createRating, deleteRating, editRating, getAllRatingsForSingleProduct } from "../controller/ratingController";





// Create a rating
router.post("/", authMiddleware,createRating);

// Get all ratings for a product
router.get("/:product_id", getAllRatingsForSingleProduct );

// Edit a rating
router.put("/:id", authMiddleware,editRating);

// Delete a rating
router.delete("/:id", authMiddleware, deleteRating);

export default router;

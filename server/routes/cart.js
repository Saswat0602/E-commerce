import { addToCart, clearCart, removeFromCart, viewCart } from "../controller/cartController";



// ADD PRODUCT TO THE CART
router.post("/addToCart/:productId",addToCart);

// VIEW CART ITEMS
router.get("/viewCart",viewCart);

// REMOVE FROM CART
router.delete("/removeFromCart/:cartItemId", removeFromCart);

// CLEAR CART
router.delete("/clearCart", clearCart);

export default router;

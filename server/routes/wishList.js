import { addToWishlist, getAllWishListItems, getWishlistItem, removeFromWishlist } from "../controller/wishListControlller";

app.post("/addToWishlistItem/:productId",addToWishlist);

// VIEW WISHLISTED ITEMS
app.get("/showWishlist", getAllWishListItems);

// GET SINGLE WISHLIST ITEM
app.get("/getWishlistItem/:id",getWishlistItem);

// REMOVE FROM WISHLIST
app.delete("/removeFromWishlist/:productId",removeFromWishlist );



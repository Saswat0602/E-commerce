import { addProduct, allProducts, deleteProduct, filterProduct, singleProduct, updateProduct } from "../controller/productController";





// ADD PRODUCT
router.post("/products", upload.single("image"), addProduct);

router.get("/products", allProducts);

// SINGLE PRODUCT
router.get("/products/:id", singleProduct);

// UPDATE PRODUCT
router.put("/products/:id", upload.single("image"), updateProduct);

// DELETE PRODUCT
router.delete("/products/:id", deleteProduct);

// FILTER PRODUCT BY CATEGORY
router.get("/products/filter", filterProduct);

export default router;

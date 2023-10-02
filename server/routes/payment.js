import { getAllOrderedData, handlePayment, makePayment, placeOrder } from "../controller/paymentController";




// Create a payment and return an order ID
app.post("/makePayment",makePayment);

// Handle payment and save form data
app.post("/handlePayment", handlePayment );

// Get all form data
app.get("/getAllFormData", getAllOrderedData);

// Place an order
app.post("/placeOrder",placeOrder);

// Create a payment and return an order ID
app.post("/makePayment", (req, res) => {
  try {
    // Implement Razorpay payment logic here
    const order_id = "your_generated_order_id";
    res.json({ order_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making payment" });
  }
});

// Handle payment and save form data
app.post("/handlePayment", async (req, res) => {
  try {
    const user_id = req.user.id; // Assuming you have authentication middleware
    const cartItems = []; // Fetch cart items from MongoDB

    let totalAmount = 0;
    const orderDetails = [];

    for (const cartItem of cartItems) {
      totalAmount += cartItem.quantity * cartItem.product.price;

      orderDetails.push({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
      });
    }

    const formData = new FormData({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      alternateNumber: req.body.alternateNumber,
      address: req.body.address,
      user_id,
    });

    await formData.save();

    // Send order confirmation email
    const transporter = nodemailer.createTransport({
      service: "your_email_service_provider",
      auth: {
        user: "your_email",
        pass: "your_email_password",
      },
    });

    const mailOptions = {
      from: "your_email",
      to: req.user.email,
      subject: "Order Confirmation",
      text: "Your order has been confirmed.",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
      res.json({ message: "Form data saved successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving form data" });
  }
});

// Get all form data
app.get("/getAllFormData", async (req, res) => {
  try {
    const formData = await FormData.find();
    res.json({ data: formData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving form data" });
  }
});

// Place an order
app.post("/placeOrder", (req, res) => {
  try {
    const user_id = req.user.id; // Assuming you have authentication middleware

    const formData = new FormData({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      alternateNumber: req.body.alternateNumber,
      address: req.body.address,
      user_id,
    });

    formData.save((err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "An error occurred while placing the order" });
      }
      res.json({ message: "Payment and order placed successfully" });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while placing the order" });
  }
});

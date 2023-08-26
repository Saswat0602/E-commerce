import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(localStorage.getItem("cartTotal"));
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    alternateNumber: "",
    address: "",
  });
  const token = localStorage.getItem("token");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/makePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: total,
        }),
      });
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        const { order_id } = data;
        console.log(order_id)

        const options = {
          key: "rzp_test_SmXIYo0jcqk9gv",
          amount: total * 100,
          currency: "INR",
          name: "SHOP-SHOP",
          description: "Payment for your order",
          order_id: order_id,
          handler: async function (response) {
            console.log("Payment successful:", response);

            try {
              const res = await fetch("http://localhost:8000/api/handlepayment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  name: formData.name,
                  mobileNumber: formData.mobileNumber,
                  alternateNumber: formData.alternateNumber,
                  address: formData.address,
                  order_id:order_id
                }),
              });
        
              if (res.ok) {
                console.log("Form data saved successfully");
                navigate("/orderSuccess");
              } else {
                console.error("Error saving form data");
              }
            } catch (error) {
              console.error("Error saving form data:", error);
            }
            navigate("/orderSuccess");
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Error creating order:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto  p-6 bg-white shadow-2xl rounded-lg">
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Make Payment</h2>

        <h2 className="text-2xl  mb-4">Fill this for delivery</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-gray-700">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              max={10}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="alternateNumber" className="block text-gray-700">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="alternateNumber"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              max={10}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </form>

        <div className="flex  justify-between">
          <button
            onClick={handlePayment}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Pay Now
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

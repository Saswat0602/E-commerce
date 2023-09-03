import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [total] = useState(localStorage.getItem("cartTotal"));
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    alternateNumber: "",
    address: "",
  });
  const userId = localStorage.getItem("id")
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productIds = queryParams.get("productIds");
  console.log(productIds);
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
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        const { order_id } = data;
        console.log(order_id);

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
              const res = await fetch(
                "http://localhost:8000/api/handlepayment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    amount: total,
                    name: formData.name,
                    mobileNumber: formData.mobileNumber,
                    alternateNumber: formData.alternateNumber,
                    address: formData.address,
                    productIds: productIds.split(","),
                  }),
                }
              );


              if (res.ok) {
                console.log("Form data saved successfully");
                navigate("/orderSuccess");
              } else {
                console.error("Error saving form data");
              }
            } catch (error) {
              console.error("Error saving form data:", error);
            }
            try {
              const res = await fetch(
                "http://localhost:8000/api/order",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    user_id:userId,
                    product_id: productIds.split(","),
                    
                  }),
                }
              );
            } catch (error) {
              
            }
            navigate("/orderSuccess");
              try {
                const response = await fetch("http://localhost:8000/api/cart", {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                if (response.ok) {
                  console.log("clear cart");
                } else {
                  console.log("some error occured");
                }
              } catch (error) {
                console.error("Error clearing cart:", error);
              }
          
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
    <div>
      <div className="max-w-md mx-auto p-4 h-[80%] mt-11 bg-white shadow-2xl rounded-lg">
        <div className="flex flex-col  items-center">
          <h2>Total amount payble : {total}</h2>
          <h2 className="text-2xl mb-4">Fill in for delivery</h2>

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
                maxLength={10}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="alternateNumber" className="block text-gray-700">
                Alternate Mobile Number:
              </label>
              <input
                type="tel"
                id="alternateNumber"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                maxLength={10}
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
          <div className="flex justify-center">
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-3"
            >
              Pay Now
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

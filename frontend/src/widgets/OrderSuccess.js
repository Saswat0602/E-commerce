import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex  gap-4    flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Order Successful!</h1>
          <p className="text-gray-600">Thank you for your purchase.</p>
          <p className="text-gray-600">Your order will be shipped soon.</p>
        </div>

        <div
          onClick={() => navigate("/")}
          className="bg-blue-600  py-2 px-4 border rounded-2xl"
        >
          {" "}
          back to home
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;

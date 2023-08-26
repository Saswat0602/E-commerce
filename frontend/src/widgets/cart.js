import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (const product of products) {
      total += product.product.price * product.quantity;
    }
    return total;
  };

  useEffect(() => {
    localStorage.setItem("cartTotal", calculateTotal());
  }, [products]);

  return (
    <div>
      <div>
        <h2>Your Cart</h2>
        <ul className="grid grid-cols-6 m-4">
        {products.map((product) => (
  <li key={product.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-300">
    <div className="col-span-4">
      <img
        src={`http://localhost:8000/storage/${product.product?.image}`}
        className="w-20 h-16 object-cover rounded"
        alt="Product"
      />
    </div>
    <div className="col-span-4 flex flex-col justify-between">
      <h3 className="font-semibold">{product.product.name}</h3>
      <p className="text-gray-500">{product.product.category}</p>
      <p className="text-gray-600">Price: ₹{product.product.price}</p>
      <p className="text-gray-600">Quantity: {product.quantity}</p>
      <button
        onClick={() => removeFromCart(product.id)}
        className="mt-2 bg-red-500 text-white px-3 py-2 rounded"
      >
        Remove
      </button>
    </div>
  </li>
))}

        
          <div className="col-span-6 text-right font-bold">
            Total: ₹{calculateTotal()}
          </div>
        </ul>
      </div>
      <button
        onClick={() => navigate("/paymentpage")}
        className="flex items-center bg-[#ff9f00]  p-2 md:p-4 border rounded-md mx-2"
      >
        Place order
      </button>
    </div>
  );
};

export default Cart;

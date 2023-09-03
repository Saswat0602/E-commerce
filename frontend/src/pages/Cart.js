import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [coupons, setCoupons] = useState([]);
  const { cart, setCart } = useCart();

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

  const removeFromCart = async (productId , quantity) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setCart(cart - quantity); 
        localStorage.setItem("cartCart", cart - quantity); 
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/coupons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCoupons(data.coupons);
      } else {
        console.error("Error fetching coupons:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
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

  const isCartEmpty = calculateTotal() === 0;

  const handleCoupon = async (couponId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/coupons/${couponId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const coupon = data.coupon;
        if (appliedCoupon === couponId) {
          setAppliedCoupon(null);
          setCouponApplied(false);
          localStorage.setItem("cartTotal", calculateTotal());
          toast.info("Coupon removed");
        } else if (coupon.is_active) {
          console.log("Coupon Clicked:", coupon);

          if (coupon.min_order < calculateTotal()) {
            let discountedTotal = calculateTotal();

            if (coupon.type === "percentage") {
              const discountAmount = (coupon.value / 100) * calculateTotal();
              discountedTotal -= discountAmount;
              console.log("Discounted Total (Percentage):", discountedTotal);
            } else {
              discountedTotal -= coupon.value;
              console.log("Discounted Total (Fixed):", discountedTotal);
            }
            localStorage.setItem("cartTotal", discountedTotal);
            setAppliedCoupon(couponId);
            setCouponApplied(true);

            toast.success("Coupon added");
          } else {
            toast.warn("You are not eligible for this coupon");
          }
        } else {
          toast("this token is not available");
        }
      } else {
        console.error("Error fetching coupon details:", response.statusText);
        toast.error("some error occure");
      }
    } catch (error) {
      console.error("Error fetching coupon details:", error);
    }
  };

  const handlePlaceOrder = () => {
    const productIds = products.map((product) => product.id);

    navigate(`/paymentpage?productIds=${productIds.join(",")}`);
  };

  return (
    <div>
      <div>
        {products.length === 0 ? (
          <h1>Your cart is empty.</h1>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-6 m-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 "
              >
                <div className="col-span-4">
                  <img
                    src={`http://localhost:8000/storage/${product.product?.image}`}
                    className="w-26 h-20 object-cover rounded"
                    alt="Product"
                  />
                </div>
                <div className="col-span-4 flex flex-col justify-between">
                  <h3 className="font-semibold">{product.product.name}</h3>
                  <p className="text-gray-500">{product.product.category}</p>
                  <p className="text-gray-600">
                    Price: ₹{product.product.price}
                  </p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                  <button
                    onClick={() => removeFromCart(product.id,product.quantity )}
                    className="mt-2 bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}

            <div className="col-span-6 text-right font-bold">
              Total: ₹
              {couponApplied
                ? localStorage.getItem("cartTotal")
                : calculateTotal()}
            </div>
          </ul>
        )}
      </div>
      <button
        onClick={handlePlaceOrder}
        className={`flex items-center bg-[#ff9f00] p-2 md:p-4 border rounded-md mx-2 ${
          isCartEmpty ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={isCartEmpty}
      >
        Place order
      </button>

      <div className="w-full">
        <h1 className="text-xl font-semibold mb-4">Use Coupons:</h1>
        <div className="grid grid-cols-4 gap-4">
          {coupons.map((coupon) => (
            <div
              className="bg-white border p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleCoupon(coupon.id)}
              key={coupon.id}
            >
              <h2 className="text-lg font-semibold mb-1">{coupon.title}</h2>
              <p className="text-gray-600">Code: {coupon.code}</p>
              <p className="text-green-500 text-lg mt-1">
                {coupon.value} {coupon.type === "percentage" ? "%" : "off"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Min Order: ₹{coupon.min_order}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;

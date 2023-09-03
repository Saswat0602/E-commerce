import React, { useState, useEffect } from "react";
import { BsCartPlus, BsLightningFill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "../utils/Rating";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {  useCart } from "../context/CartContext"


const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { cart,setCart } = useCart();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Fetching product details...");
    fetch(`http://127.0.0.1:8000/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched product data:", data);
        setProduct(data.product);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  const handleCart = async () => {
    const response = await fetch(
      `http://localhost:8000/api/cart/add/${productId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(),
      }
    );

    const data = await response.json();
    console.log("data", data);
    setCart(cart + 1);
    localStorage.setItem('cartCart',cart+1)
    console.log(cart)
    toast.success(`Added "${product?.name}" to cart`,{
      autoClose: 1000
    });
  };

  const toggleHeart = () => {
    setIsHeartFilled((prevState) => !prevState);
  };

  const handleBuy = () => {
    navigate("/userdetail");
  };


  const addWishlist = async () => {
    const response = await fetch(
      `http://localhost:8000/api/wishlist/add/${productId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(),
      }
    );

    const data = await response.json();
    console.log("data", data);

    toast.success(`${product?.name} wishlisted`);
  };

  const removeWishlist = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/wishlist/remove/${productId}`,  
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        setIsHeartFilled(false);  
        toast.success(`${product?.name} removed from wishlist`);
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  
  
  return (
    <div>
      <div className="p-2 min-h-screen">
        <div className="flex flex-col md:flex-row m-5">
          <div className="w-full md:w-1/2 pr-6 mb-4 md:mb-0">
            <img
              src={`http://localhost:8000/storage/${product?.image}`}
              alt={product?.name}
              className="w-full h-[27rem] border rounded-lg"
            />

            <div className="flex justify-center mt-4">
              <button
                onClick={handleCart}
                className="flex items-center bg-[#ff9f00] p-2 md:p-4 border rounded-md mx-2"
              >
                <BsCartPlus className="mr-2" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuy}
                className="flex items-center bg-[#fb641b] p-2 md:p-4 border rounded-md mx-2"
              >
                <BsLightningFill className="mr-2" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex justify-between">
              <h1 className="mb-5 font-thin text-5xl text-black items-center">
                {product?.name?.toUpperCase()}
              </h1>
              <div onClick={toggleHeart} className="cursor-pointer">
                {isHeartFilled ? (
                  <AiFillHeart onClick={removeWishlist} className="text-4xl " />
                ) : (
                  <AiOutlineHeart
                    
                    onClick={addWishlist}
                    className="text-4xl "
                  />
                )}
              </div>
            </div>
            <span className="text-blue-400">
              Be the first to Review this product
            </span>
            <h1 className="font-bold text-3xl">
              <span>₹ </span>
              {product?.price}
            </h1>
            <span className=" text-green-500"> 53% off</span>
            <div>
              Available offers
              <p> Bank Offer5% Cashback on Flipkart Axis Bank CardT&C</p>
              <p>
                Extra ₹500 Off on Bikes & Scooters on purchase of ₹30,000 or
                moreT&C
              </p>
              <p>
                Partner OfferSign-up for Flipkart Pay Later & get free Times
                Prime Benefits worth ₹10,000*Know More
              </p>
              <p>
                Partner OfferPurchase now & get 1 surprise cashback coupon in
                FutureKnow More
              </p>
              <p>View 1 more offer</p>
            </div>
            <h1>
              <span className="font-bold text-blue-300">
                Product Category :
              </span>
              {product?.category}
            </h1>
            <p>hurry only: {product?.stock_quantity} left </p>
            <div className="mt-4">
              <h1 className="font-bold text-blue-300">About This Product</h1>
              <p>
                Description:
                {product?.description || "No description available"}
              </p>
            </div>
            <Rating productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

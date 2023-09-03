import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/wishlist', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWishlistItems(data);
      })
      .catch((error) => console.error('Error fetching wishlist:', error));
  }, []);

  return (
    <div>
      <div>
        <h2>Your Wishlist</h2>
        <ul className="grid grid-cols-6 m-4">
          {wishlistItems.length === 0 ? (
            <p className="col-span-6 text-center text-gray-500">
              Your wishlist is empty.
            </p>
          ) : (
            wishlistItems.map((product) => (

             <Link key={product.id} to={`/product/${product.id}`}
                className="grid grid-cols-6 gap-4 p-4 border-b border-gray-300"
              >
                <div className="col-span-4">
                  <img
                    src={`http://localhost:8000/storage/${product.product.image}`}
                    className="w-20 h-16 object-cover rounded"
                    alt="Product"
                  />
                </div>
                <div className="col-span-4 flex flex-col justify-between">
                  <h3 className="font-semibold">{product.product.name}</h3>
                  <p className="text-gray-600">Category: {product.product.category}</p>
                  <p className="text-gray-600">Price: ₹{product.product.price}</p>
                 
                </div>
              </Link>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default WishList;

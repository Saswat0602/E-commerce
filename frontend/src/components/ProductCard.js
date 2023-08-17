import React from "react";

const ProductCard = ({product}) => {
  return (
    <div>
      <div key={product.id} className="bg-white p-4 shadow-md">
        <div>
          <img src={product.image} alt="" />
        </div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <div className="mt-2 text-blue-500">Price: ₹ {product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;

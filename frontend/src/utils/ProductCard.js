import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="">
      <div
        key={product.id}
        className="bg-white p-4 border  rounded shadow-md text-center w-full"
      >
        <div>
          <img
            src={`http://localhost:8000/storage/${product.image}`}
            className="w-full h-52   border rounded-md"
            alt={product.name}
          />
        </div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-green-600">Min. 55% off</p>
      </div>
    </div>
  );
};

export default ProductCard;

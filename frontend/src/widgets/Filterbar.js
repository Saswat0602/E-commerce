import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import pant from "../assets/pant.jpg";

const Filterbar = ({ onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory) {
      fetch("http://localhost:8000/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: selectedCategory }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.products);
          onFilter(data.products); 
        })
        .catch((error) => {
          toast.error("Error filtering products by category.");
        });
    }
  }, [selectedCategory]);

  return (
    <div className=" bg-blue-100 border my-2 ">
      <div className="flex justify-evenly flex-col sm:flex-row gap-4 items-center">
        <div
          className="group"
          onClick={() => handleCategoryClick("Electronics")}
        >
          <img
          className="w-16"
            src="https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"
            alt="Electronics"
          />

          <span className=" text-black px-2 py-1 rounded">Electronics</span>
        </div>

        <div onClick={() => handleCategoryClick("Shirts")}>
          <img
          className="w-16"

            src="https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100"
            alt=""
          />
          <span className=" text-black px-2 py-1 rounded">Fashion</span>

        </div>
        <div onClick={() => handleCategoryClick("Mobile")}>
          <img
          className="w-16"

            src="https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"
            alt=""
          />
          <span className=" text-black px-2 py-1 rounded">Mobiles</span>

        </div>
        <div onClick={() => handleCategoryClick("Pants")}>
          <img src={pant} className="w-16" alt="pants" />
          <br/>
          <span className=" text-black px-2 py-1 rounded">Trousers</span>

        </div>

        <div onClick={() => handleCategoryClick("Mobile")}>
          <img
          className="w-16"

            src="https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"
            alt=""
          />
        </div>
        <div onClick={() => handleCategoryClick("Mobile")}>
          <img
          className="w-16"

            src="https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
            alt=""
          />
        </div>
        <div onClick={() => handleCategoryClick("Mobile")}>
          <img
          className="w-16"

            src="https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"
            alt=""
          />
        </div>

        <div onClick={() => handleCategoryClick("Mobile")}>
          <img
          className="w-16"

            src="https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100"
            alt=""
          />
        </div>
      </div>
    
    </div>
  );
};

export default Filterbar;

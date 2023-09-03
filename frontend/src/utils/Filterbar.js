import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import pant from "../assets/pant.jpg";

const Filterbar = ({ onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    if (selectedCategory) {
      try {
        fetch("http://localhost:8000/api/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: selectedCategory }),
        })
          .then((response) => response.json())
          .then((data) => {
            setFilteredProducts(data.products); // Update filteredProducts
            onFilter(data.products);
          })
          .catch((error) => {
            toast.error("Error filtering products by category.");
          });
      } catch (error) {
        toast.warn("Selected category is not available.");
      }
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
        <div  onClick={() => handleCategoryClick("Pants")}>
          <img src={pant} className="w-16 " alt="pants" />
          
          <span className=" text-black px-2 py-1 rounded">Trousers</span>

        </div>

        <div onClick={() => handleCategoryClick("grocery")}>
          <img
          className="w-16"

            src="https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"
            alt=""
          />
         <span className=" text-black px-2 py-1 rounded">Grocery</span>

        </div>
        <div onClick={() => handleCategoryClick("appliances")}>
          <img
          className="w-16"

            src="https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
            alt=""
          />
          <span className=" text-black px-2 py-1 rounded">Appliances</span>
          
          </div>
          <div onClick={() => handleCategoryClick("furniture")}>
          <img
          className="w-16"
          
          src="https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100"
          alt=""
          />
          <span className=" text-black px-2 py-1 rounded">furniture</span>
          </div>
          
        <div onClick={() => handleCategoryClick("toy")}>
        <img
        className="w-16"
        
        src="https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100"
        alt=""
        />
        <span className=" text-black px-2 py-1 rounded">Toys</span>
        </div>
      </div>
    
    </div>
  );
};

export default Filterbar;

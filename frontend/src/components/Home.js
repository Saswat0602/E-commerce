import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Filterbar from "../widgets/Filterbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  const getRandomImageURL = () => {
    const imageId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/800/300?random=${imageId}`;
  };
  return (
    <div>
    <Filterbar onFilter={handleFilter} /> 
    <div className="w-full mb-4">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showStatus={false}
          showThumbs={false}
          autoPlay={true}
          interval={1000}
          showIndicators={false}
        >
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <img
                src={getRandomImageURL()}
                alt="aa"
                style={{ height: "300px" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="grid lg:grid-cols-4 w-[98%] ml-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
      {filteredProducts.length > 0
        ?
          filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))
        : 
          products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
    </div>
  </div>
);
};

export default Home;
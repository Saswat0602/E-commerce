import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "../utils/ProductCard";
import { Link } from "react-router-dom";
import Filterbar from "../utils/Filterbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;


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
    setCurrentPage(1);
  };

  const getRandomImageURL = () => {
    const imageId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/800/300?random=${imageId}`;
  };
  const handleFilter2 = (searchQuery) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredProducts([]);
      setCurrentPage(1);
    } else {
      handleFilter2(value);
    }
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    filteredProducts.length > 0
      ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
      : products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>


    <div className="relative flex justify-center">
    <form className="absolute bottom-[1.08rem] ">
      <input
        type="text"
        className="p-1 rounded border m-2"
        value={search}
        placeholder="search what you desire"
        onChange={handleSearchChange}
        name="searchInput"
      />
      <button type="submit" onClick={(e) => e.preventDefault()}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  </div>
  
  

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
        {currentProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {[
          ...Array(
            Math.ceil(
              filteredProducts.length > 0
                ? filteredProducts.length / productsPerPage
                : products.length / productsPerPage
            )
          ),
        ].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 py-2 px-4 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;

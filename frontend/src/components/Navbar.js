import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CgProfile } from 'react-icons/cg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Navbar = () => {
  const msg = localStorage.getItem("message");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );


  const [showProfile, setShowProfile] = useState(false); 

  const toggleProfilePopup = () => {

    setShowProfile(!showProfile);
  };
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("message");
    setIsLoggedIn(false);
    navigate("/");
  };
  const searchName = async () => {
    try {
      const queryParams = new URLSearchParams({
        q: search,
      });

      const url = `http://localhost:8000/api/show?${queryParams}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.status >= 400) {
        toast.warn("No property match your query", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
      toast.error(`some error occure  ${error}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    searchName();
  };
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-16 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
    

      <form onSubmit={handleSearchFormSubmit}>
        <input
          type="text"
          className="p-1 rounded border m-2"
          value={search}
          placeholder="search what you desire"
          onChange={(e) => {
            setSearch(e.target.value);
            searchName();
          }}
          name="searchInput"
        />
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      

      <div className="flex space-x-4">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-white text-lg cursor-pointer"
          />
          <span className="absolute top-0 left-2 bg-red-500 rounded-full text-white px-1 text-xs">
            3+
          </span>
        </div>

        
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white px-4 py-2 rounded hover:text-slate-500"
          >
          Logout
          </button>
          ) : (
          <button
          onClick={handleLogin}
          className="text-white text-sm cursor-pointer"
          >
          Login
          </button>
          )}
          <CgProfile className="text-white text-3xl cursor-pointer" onClick={toggleProfilePopup}/>
      </div>
      {showProfile && <Profile />}
    </nav>
  );
};

export default Navbar;

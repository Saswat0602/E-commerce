import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate()



  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
    <div className="flex items-center">
    
      <img src={logo} alt="logo" className='w-16' onClick={()=>navigate('/')} />
      </div>

      <div className="flex items-center bg-white rounded-lg shadow-md px-2 py-1">
        <input
          type="text"
          placeholder="Search for products"
          className="w-full bg-transparent focus:outline-none"
        />
        <button className="text-blue-500">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

       <div className="flex space-x-4">
        <div className="relative">
          <FontAwesomeIcon icon={faShoppingCart} className="text-white text-lg cursor-pointer" />
          <span className="absolute top-0 left-2 bg-red-500 rounded-full text-white px-1 text-xs">3+</span>
        </div>
        <button onClick={()=>navigate('/login')} className="text-white text-sm cursor-pointer">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;

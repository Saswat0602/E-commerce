import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { BiSolidEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);
const navigate = useNavigate()
  const fetchCoupons = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/coupons');
      const data = await response.json();
      setCoupons(data.coupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Coupon Dashboard</h2>
      <ul className="space-y-4">
        {coupons.map(coupon => (
          <li key={coupon.id} className="border p-4 flex items-center justify-between">
            <span className="text-lg font-medium">
              {coupon.title} - {coupon.value}% off
            </span>
            <div>
              <button
              onClick={() => navigate(`/coupon/edit/${coupon.id}`)} 
                className="px-3 py-2 w-10 bg-blue-400 text-white rounded mr-2"
              >
                <BiSolidEditAlt size={20} />
              </button>
              <button
                onClick={() => handleDeleteCoupon(coupon.id)}
                className="px-3 py-2 w-10 bg-red-400 text-white rounded"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={()=>navigate('/admindashboard')} className='px-4 py-2 my-6 bg-blue-300 rounded-lg'>
      Dshboard
      </button>
    </div>
  );
};

export default AllCoupons;

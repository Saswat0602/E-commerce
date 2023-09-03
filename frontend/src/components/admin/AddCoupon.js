import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const [couponData, setCouponData] = useState({
    title: "",
    code: "",
    min_order: "",
    value: "",
    type: "percentage",
    is_active: true,
  });
  const navigate = useNavigate()
const token = localStorage.getItem('token')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(token)

  const addCoupon = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/coupons/create", {
        method: "POST",
     
        headers: {
            Authorization: `Bearer ${token}`,
            
          },
        body: JSON.stringify(couponData),
      });
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  return (
    <div className="bg-white p-3 border rounded-xl shadow-xl max-w-xl mt-4 mx-auto sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      <h2 className="text-3xl text-green-700 font-light text-center">
        Add New Coupon
      </h2>
      <form className="flex flex-col gap-3 mt-5">
        <label htmlFor="title" className="ml-2">
          Coupon Title
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="title"
          placeholder="Enter the coupon title"
          onChange={handleChange}
        />
        <label htmlFor="code" className="ml-2">
          Coupon Code
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="code"
          placeholder="Enter the coupon code"
          onChange={handleChange}
        />

        <label>Value:</label>

        <input
          type="number"
          name="value"
          className="p-1 border rounded-lg"
          value={couponData.value}
          placeholder="Enter the value "
          onChange={handleChange}
          required
        />
        <label>Minimum Order:</label>
        <input
          type="number"
          name="min_order"
          className="p-1 border rounded-lg"
          placeholder="Enter the minm order amount "
          min={500}
          value={couponData.min_order}
          onChange={handleChange}
          required
        />
        <label>Type:</label>

        <select
          className="p-1 border rounded-lg"
          name="type"
          value={couponData.type}
          onChange={handleChange}
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>


        <input
        type="checkbox"
        id="is_active"
        name="is_active"
        checked={couponData.is_active}
        onChange={() =>
          setCouponData((prevData) => ({
            ...prevData,
            is_active: !prevData.is_active,
          }))
        }
        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor="is_active" className="text-sm text-gray-700">
        Is Active
      </label>

        <button
          onClick={addCoupon}
          className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600"
        >
          Add Coupon
        </button>
      </form>
      <button onClick={()=>navigate('/admindashboard')} className='px-4 py-2 bg-blue-300 rounded-lg'>
      admindashboard
      </button>
    </div>
  );
};

export default AddCoupon;

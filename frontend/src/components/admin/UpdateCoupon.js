import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateCoupon = () => {
    const { id } = useParams();

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
    

      useEffect(() => {
        fetchCoupon(); 
      }, []);
    
      const fetchCoupon = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/coupons/${id}`);
          const data = await response.json();
          const coupondetails = data.coupon; 
          console.log("coupondetails>>",coupondetails.title)
          setCouponData({
            title: coupondetails.title.toString(),
            code: coupondetails.code.toString(),
            min_order: coupondetails.min_order.toString(),
            value: coupondetails.value.toString(),
            type: coupondetails.type,
            is_active: coupondetails.is_active,
          });
        } catch (error) {
          console.error('Error fetching coupon details:', error);
          toast.error('Error fetching coupon details');
          navigate('/allcoupons');
        }
      };
    const updateCoupon = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/coupons/${id}/edit`, {
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
        value={couponData.title}

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
        value={couponData.code}

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
        onClick={updateCoupon}
        className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600"
      >
        Update Coupon
      </button>
    </form>
  </div>
  )
}

export default UpdateCoupon
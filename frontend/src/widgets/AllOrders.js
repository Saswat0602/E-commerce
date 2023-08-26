import React, { useEffect, useState } from 'react';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/form-data');
      const data = await response.json();
      console.log(data)
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
    return (
        <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
        {orders.length > 0 ? (
          <ul>
            {orders  && orders.map(order => (
              <li key={order.id} className="mb-4 border p-4 rounded">


                <div className="flex items-center mb-2">
                    <span className="font-semibold">Order ID:</span>
                    <span className="ml-2">{order.order_id}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="font-semibold">Name:</span>
                    <span className="ml-2">{order.name}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="font-semibold">Mobile Number:</span>
                    <span className="ml-2">{order.mobileNumber}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="font-semibold">Alternate Number:</span>
                    <span className="ml-2">{order.alternateNumber}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="font-semibold">Address:</span>
                    <span className="ml-2">{order.address}</span>
                </div>
                
                </li>
            ))}
            </ul>
            ) : (
                <p>No orders available.</p>
              )}
        </div>
        </div>
    );
    }

    export default AllOrders;

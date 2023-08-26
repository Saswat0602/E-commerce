import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const navigate = useNavigate()


  return (
<>

    <div className="flex justify-center space-x-4 my-5">
      <button onClick={()=>navigate('/dashboard')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        All Products
      </button>
      <button onClick={()=>navigate('/allusers')} className="bg-violet-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        All Users
      </button>
      <button onClick={()=>navigate('/allorders')}  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
       All AllOrders
      </button>
      <button onClick={()=>navigate('/addproduct')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Add Products
      </button>
    </div>


</>
  );
};

export default AdminDashboard;

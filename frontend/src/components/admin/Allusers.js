import React, { useState, useEffect } from 'react';
import userLogo from "../../assets/user.png"
import { useNavigate } from 'react-router-dom';
const Allusers = () => {
  const [users, setUsers] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleToggleActivation = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/toggle`, {
        method: 'PUT',
      });

      if (response.status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, is_active: !user.is_active } : user
          )
        );
      } else {
        console.error('Failed to toggle activation');
      }
    } catch (error) {
      console.error('Error toggling activation:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <ul className="divide-y divide-gray-300">
        {users.map(user => (
          <li key={user.id} className="py-2">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10">
                <img
                  className="w-10 h-10 rounded-full"
                  src={userLogo}
                  alt={`${user.name}`}
                />
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-black">{user.name}</p>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500">{user.ph_no}</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => handleToggleActivation(user.id)}
                  className={`px-3 py-1 rounded ${
                    user.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={()=>navigate('/admindashboard')} className='px-4 py-2 bg-blue-300 rounded-lg'>
      Dshboard
      </button>
    </div>
  );
};

export default Allusers;

import React, { useState, useEffect } from 'react';

const Allusers = () => {
  const [users, setUsers] = useState([]);



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


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <ul className="divide-y divide-gray-300">
        {users.map((user) => (
          <li key={user.id} className="py-2">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10">
                <img
                  className="w-10 h-10 rounded-full"
                  src=""
                  alt={`${user.name}`}
                />
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-black">{user.name}</p>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500">{user.ph_no}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allusers;;

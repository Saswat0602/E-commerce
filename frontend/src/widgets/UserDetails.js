import React, { useState } from 'react';

const UserDetails = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        alternateNumber: '',
        address: ''
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // You can perform any action with the form data here
        console.log('Form data submitted:', formData);
      };
    
      return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Fill up the Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700">
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="alternateNumber" className="block text-gray-700">
                Alternate Number:
              </label>
              <input
                type="tel"
                id="alternateNumber"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700">
                Address:
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      );
    };

export default UserDetails;

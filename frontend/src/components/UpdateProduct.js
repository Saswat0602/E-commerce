import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddProduct = () => {

    const { id } = useParams();

    const [image, setImage] = useState(null);
    const [input, setInput] = useState({
      name: '',
      description: '',
      category: '',
      price: '',
      stock_quantity: '',
    });
  
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
  





    const handleChange = (e) => {
      const { name, value } = e.target;
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleCancel = () => {
      navigate('/');
    };
  
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
      }
    };
  
    const addProduct = async (e) => {
      e.preventDefault();
      const { name, description, category, price, stock_quantity } = input;
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('stock_quantity', stock_quantity);
      if (image) {
        formData.append('image', image);
      }
  
      try {
        const response = await fetch(`http://localhost:8000/api/update${id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        const data = await response.json();
  
        if (response.status >= 400 || !data) {
          toast.error('Error updating the product');
        } else {
          toast.success('Product updated successfully successfully');
          navigate('/');
        }
      } catch (error) {
        console.error('Error occurred while adding the product', error);
        toast.error('An error occurred while adding the product');
          navigate('/');

      }
    };

    return (
        <div className="bg-white p-3 border rounded-xl shadow-xl max-w-xl mt-4 mx-auto sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
          <h2 className="text-3xl  text-green-700 font-light text-center">Add new Product to the store</h2>
          <form className="flex flex-col gap-3 mt-5" encType="multipart/form-data">
              <label htmlFor="name" className="ml-2">
               Product  Name
              </label>
              <input
                type="text"
                className="p-1 border rounded-lg"
                name="name"
                placeholder="Enter your name of the property"
                onChange={handleChange}
              />
              <label htmlFor="category" className="ml-2">
              Product Category
            </label>
            <input
              type="text"
              className="p-1 border rounded-lg"
              name="category"
              placeholder="Enter your name of the property"
              onChange={handleChange}
            />
              <label htmlFor="image" className="ml-2">
                Picture
              </label>
              <input
                type="file"
                className="p-1 border rounded-lg"
                name="picture"
                accept="image/*" 
                onChange={handleImageChange}
                />
    
              <label htmlFor="stock_quantity" className="ml-2">
                Quantity  Available
              </label>
              <input
                type="text"
                className="p-1 border rounded-lg"
                name="stock_quantity"
                placeholder="Enter the location of this property"
                onChange={handleChange}
              />
    
              <label htmlFor="price" className="ml-2">
                Price
              </label>
              <input
                type="text"
                className="p-1 border rounded-lg"
                name="price"
                placeholder="Add price"
                onChange={handleChange}
              />
     
              <label htmlFor="description" className="ml-2">
                Description
              </label>
              <textarea
                className="p-1 border rounded-lg"
                name="description"
                placeholder="Describe something about this property"
                cols={40}
                rows={3}
                onChange={handleChange}
              />
              <button
              onClick={addProduct}
              className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600"
            >
              Add property
            </button>
            <div className="flex justify-around gap-3 mt-4">
              <div className="flex justify-center items-center">
                <button
                  onClick={handleCancel}
                  className="py-2 px-4 bg-red-500 border rounded-lg text-sm hover:bg-slate-400"
                >
                  Cancel
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => navigate("/")}
                  className="py-2 px-4 bg-blue-300 border rounded-lg text-sm hover:bg-slate-400"
                >
                  Home
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    };

export default AddProduct
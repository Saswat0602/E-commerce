













import { toast } from 'react-toastify';

const addProduct = async (formData, token) => {
  try {
    const response = await fetch('http://localhost:8000/api/addproduct', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.status >= 400 || !data) {
      toast.error('Error adding the product');
    } else {
      toast.success('Product added successfully');
      return true;
    }
  } catch (error) {
    console.error('Error occurred while adding the product', error);
    toast.error('An error occurred while adding the product');
    return false;
  }
};

export default addProduct;




















// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// const  navigate = useNavigate()

// const token = localStorage.getItem('token');





// 
// const addProduct = async (e) => {
    // e.preventDefault();
    // const { name, description, category, price ,stock_quantity } = input;
    // if (!name || !description || !category || !stock_quantity|| !price || !image) {
    //   toast.warn("All fields are required", {
        // position: "top-right",
        // autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "colored",
    //   });
    //   return;
    // }
// 
    // if (!token) {
    //   toast.error("You need to be authenticated to add a new property", {
        // position: "top-right",
        // autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "colored",
    //   });
    //   return;
    // }
// 
    // try {
    //   const formData = new FormData();
    //   formData.append("name", name);
    //   formData.append("description", description);
    //   formData.append("category", category);
    //   formData.append("price", price);
    //   formData.append("stock_quantity", stock_quantity);
    //   if (image) {
        // formData.append("image", image); 
    //   }
    //   const response = await fetch(`http://localhost:8000/api/addproduct`, {
        // method: "POST",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        // body: formData,
    //   });
// 
    //   const data = await response.json();
    //   console.log("data", data);
    //   if (response.status >= 400 || !data) {
        // toast.error("Some error occurred while adding the property", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
    //   } else {
        // toast.success("Property added successfully", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
        // navigate("/property");
    //   }
    // } catch (error) {
    //   console.error("Error occurred while adding the property", error);
    //   toast.error("An error occurred while adding the property", {
        // position: "top-right",
        // autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "colored",
    //   });
    // }
//   };
// 
//   export default  addProduct
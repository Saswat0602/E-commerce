import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const register = async (e) => {
    e.preventDefault();
    const { name, email, password, password_confirmation } = input;
    if (!name || !password || !email || !password_confirmation) {
      toast.warn("field missing", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email address", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (password !== password_confirmation) {
      toast.error("password mismatch", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (password.length < 6) {
      toast.error("password must be 6 character long", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    const passwordRegex = /(?=.*[A-Z])(?=.*[@#$%^&*!])(?=.*\d)/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one special character, and one numeric character",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return false;
    }


    const response = await fetch(`http://127.0.0.1:8000/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    const data = await response.json();
    console.log("data", data);
    if (response.status >= 400 || !data) {
      toast.error("some error occur", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    } else {
      toast.success("User register successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      nav("/");
    }
  };
  const navigate = useNavigate();

  const nav = () => {
    navigate("/login");
  };

  return (
    <>
   <div className="bg-gray-700 flex justify-center items-center min-h-screen">
      <div className="bg-gray-100 p-3 border rounded-xl shadow-xl max-w-md w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
        <h2 className="text-3xl text-blue-700 font-bold text-center">
          Register Yourself
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full px-5 mt-5">
              <form className="flex flex-col gap-1">
                <label htmlFor="name" className="ml-2">
                  Name
                </label>
                <input
                  type="text"
                  className="p-2 border rounded-lg"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handelChange}
                />
                <label htmlFor="email" className="ml-2">
                  Email
                </label>
                <input
                  type="email"
                  className="p-2 border rounded-lg"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handelChange}
                />

                <label htmlFor="password" className="ml-2">
                  Password
                </label>
                <input
                  type="password"
                  className="p-2 border rounded-lg"
                  name="password"
                  placeholder="at least 6 character"
                  onChange={handelChange}
                />
                <p className="text-xs mb-2">
                  {" "}
                  <i>!</i> Passwords must be at least 6 characters. and there
                  should one uppercase one numeric and a special character
                </p>

                <label htmlFor="password_confirmation" className="ml-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="p-2 border rounded-lg"
                  name="password_confirmation"
                  placeholder="Confirm your password"
                  onChange={handelChange}
                />

                <button
                  onClick={register}
                  className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600"
                >
                  Register
                </button>
              </form>

              <div className="flex justify-center items-center gap-4 mt-4">
                <p className="text-[#074FB2] text-base">
                  Already have an account:
                </p>
                <button
                  onClick={nav}
                  className="py-2 px-4 bg-white border rounded-lg text-sm hover:bg-slate-400"
                >
                  Login
                </button>
              </div>

              <div className="flex justify-center items-center gap-4 mt-4">
                <p className="text-[#074FB2] text-base">Back to home:</p>
                <button
                  onClick={() => navigate("/")}
                  className="py-2 px-4 bg-white border rounded-lg text-sm hover:bg-slate-400"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

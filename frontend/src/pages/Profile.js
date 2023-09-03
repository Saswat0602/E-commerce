import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [profileOpen, setProfileOpen] = useState(true);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getAuthData();
  }, []);

  const getAuthData = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      });
      const result = await response.json();
      setUser(result.user);
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const msg = localStorage.getItem("message");

  const handleDashboardClick = () => {
    setProfileOpen(false);
    navigate("/admindashboard");
  };

  const handleWishlistClick = () => {
    setProfileOpen(false);
    navigate("/wishlist");
  };

  return (
    <div className={`bg-white absolute right-0 top-16 border rounded-xl w-52 h-auto mx-5 flex z-10 justify-center ${profileOpen ? "" : "hidden"}`} style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
    <div className="flex flex-col items-center gap-2 m-2">
      <div className="text-center mb-2">
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="font-normal text-sm text-[#074FB2]">{user.email}</p>
      </div>
      <div>
        {msg === "Logged in as admin" && (
          <div             
          >
            <button
              onClick={handleDashboardClick}
              className="cursor-pointer bg-blue-100 hover:bg-slate-300 px-4 py-2 border rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
              >
              Dashboard
            </button>
          </div>
        )}
      </div>
      <button
        className="cursor-pointer bg-blue-100 hover:bg-slate-300 px-4 py-2 border rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
        onClick={handleWishlistClick}
      >
        Wishlist
      </button>
      <button
        className="cursor-pointer bg-blue-100 hover:bg-slate-300 px-4 py-2 border rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
        onClick={() => { navigate("/showorderuser"); setProfileOpen(false) }}
      >
        My Orders
      </button>
    </div>
  </div>
  );
};

export default Profile;

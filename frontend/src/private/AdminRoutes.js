import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = ({ children, ...rest }) => {
  const msg = localStorage.getItem("message");

  if (msg === 'Logged in as admin') {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoutes;

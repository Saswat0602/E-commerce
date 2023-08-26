import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;








// export default PrivateRoute;
// <PrivateRoute
// exact
// path="/edit/:id"
// element={<UpdateProduct />}
// condition={isAdmin}
// redirectTo="/"
// />
// <PrivateRoute
// exact
// path="/dashboard"
// element={<Dashboard />}
// condition={isAdmin}
// redirectTo="/"
// />

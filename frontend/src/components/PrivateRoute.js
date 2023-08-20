// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element, condition, redirectTo, ...rest }) => {
//   return condition ? element : <Navigate to={redirectTo} />;
// };

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
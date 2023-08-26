import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Home from "./components/Home";
import ProductDetails from "./widgets/ProductDetails";
import AddProduct from "./components/admin/AddProduct";
import Dashboard from "./components/admin/Dashboard";
import PrivateRoutes from "./private/PrivateRoute";
import AdminRoutes from "./private/AdminRoutes";
import UpdateProduct from "./components/admin/UpdateProduct";
import Cart from "./widgets/Cart";
import PaymentPage from "./widgets/PaymentPage";
import OrderSuccess from "./widgets/OrderSuccess";
import AllOrders from "./widgets/AllOrders";
import Profile from "./components/Profile";
import AdminDashboard from "./components/admin/AdminDashboard";
import Allusers from "./components/admin/Allusers";

function App() {
  return (
    <Router>
      <Navbar />
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/orderSuccess" element={<OrderSuccess />} />
          <Route exact path="/profile" element={<Profile />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<Cart />} path="/cart" exact></Route>
            <Route element={<PaymentPage />} path="/paymentpage" exact></Route>
          </Route>

          <Route element={<AdminRoutes />}>
            <Route
              element={<AdminDashboard />}
              path="/admindashboard"
              exact
            ></Route>

            <Route element={<Dashboard />} path="/dashboard" exact></Route>
            <Route exact path="/addproduct" element={<AddProduct />} />
            <Route exact path="/allorders" element={<AllOrders />} />
            <Route exact path="/allusers" element={<Allusers />} />
            <Route exact path="/edit/:id" element={<UpdateProduct />} />
          </Route>
        </Routes>
        <Footer />

        <ToastContainer />
      </>
    </Router>
  );
}

export default App;

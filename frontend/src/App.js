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
import Cart from "./pages/Cart";
import PaymentPage from "./widgets/PaymentPage";
import OrderSuccess from "./pages/OrderSuccess";
import AllOrders from "./widgets/AllOrders";
import Profile from "./pages/Profile";
import AdminDashboard from "./components/admin/AdminDashboard";
import Allusers from "./components/admin/Allusers";
import WishList from "./widgets/WishList";
import AddCoupon from "./components/admin/AddCoupon";
import AllCoupons from "./components/admin/AllCoupons";
import UpdateCoupon from "./components/admin/UpdateCoupon";
import ShowAllOrder from "./components/admin/ShowAllOrder";
import ShowOrdersUser from "./widgets/ShowOrdersUser";
import { CartProvider } from "./context/CartContext";
function App() {
  return (
    <Router>
      <CartProvider>
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
              <Route
                element={<PaymentPage />}
                path="/paymentpage"
                exact
              ></Route>
              <Route element={<WishList />} path="/wishlist" exact></Route>
            </Route>
            //ADMIN DASBOARD
            <Route element={<AdminRoutes />}>
              <Route
                element={<AdminDashboard />}
                path="/admindashboard"
                exact
              ></Route>

              <Route element={<Dashboard />} path="/dashboard" exact></Route>
              <Route exact path="/addproduct" element={<AddProduct />} />
              <Route exact path="/allorders" element={<AllOrders />} />
              <Route exact path="/showallorders" element={<ShowAllOrder />} />

              <Route exact path="/allusers" element={<Allusers />} />
              <Route exact path="/edit/:id" element={<UpdateProduct />} />
              <Route exact path="/coupon/edit/:id" element={<UpdateCoupon />} />
              <Route exact path="/showorderuser" element={<ShowOrdersUser />} />

              <Route exact path="/allcoupons" element={<AllCoupons />} />
              <Route exact path="/addcoupons" element={<AddCoupon />} />
            </Route>
          </Routes>
          <Footer />

          <ToastContainer />
        </>
      </CartProvider>
    </Router>
  );
}

export default App;

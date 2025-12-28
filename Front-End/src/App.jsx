import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ViewProduct from "./pages/product/Viewproduct";
import AddProduct from "./pages/product/Addproduct";
import EditProduct from "./pages/product/Editproduct";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/dashboard/Dashboard";
import PaymentSuccess from "./pages/cart/PaymentSuccess";
import EditProfile from "./pages/auth/EditProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproduct" element={<AddProduct />} /> 
        <Route path="/Editproduct/:id" element={<EditProduct />} /> 
        <Route path="/product/:id" element={<ViewProduct />} /> 
        <Route path="/Register" element={<Register />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
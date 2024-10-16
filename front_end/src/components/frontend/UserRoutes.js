import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../../components/frontend/auth/Login";
import Register from "../../components/frontend/auth/Register";
import NavBar from "../../layouts/frontend/NavBar";
import Footer from "../../layouts/frontend/Footer";
import Home from "./home/Home";
import About from "./about/About";
import Contact from "./contact/Contact";
import Shop from "./shop/Shop";
import ProductDetail from "./shop/ProductDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Thankyou from "./Thankyou";

export default function UsersRoutes() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem("auth_token") ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            localStorage.getItem("auth_token") ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
      <footer className="bg-dark" id="tempaltemo_footer">
        <Footer />
      </footer>
    </>
  );
}

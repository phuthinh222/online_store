import "../../assets/admin/style.css";
import React from "react";
import SideBar from "./Sidebar";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/admin/Dashboard";
import AddCategories from "../../components/admin/categories/AddCategories";
import ViewCategories from "../../components/admin/categories/ViewCategories";
import EditCategories from "../../components/admin/categories/EditCategories";
import AddProduct from "../../components/admin/products/AddProduct";
import ViewProduct from "../../components/admin/products/ViewProduct";
import EditProduct from "../../components/admin/products/EditProduct";
import Users from "../../components/admin/users/Users";
import AddUser from "../../components/admin/users/AddUser";
import Cart from "../../components/admin/Cart";

export default function AdminRoutes() {
  return (
    <>
      <section id="sidebar">
        <SideBar />
      </section>
      <section id="content">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users/viewUser" element={<Users />} />
          <Route path="/users/addUser" element={<AddUser />} />
          <Route path="/category/addCategories" element={<AddCategories />} />
          <Route path="/category/viewCategories" element={<ViewCategories />} />
          <Route
            path="/category/editCategories/:id"
            element={<EditCategories />}
          />
          <Route path="/product/addProduct" element={<AddProduct />} />
          <Route path="/product/viewProduct" element={<ViewProduct />} />
          <Route path="/product/editProduct/:id" element={<EditProduct />} />
          <Route path="/order" element={<Cart />} />
        </Routes>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}

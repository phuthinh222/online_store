import axios from "axios";
import { error } from "jquery";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function NavBar() {
  let navigate = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`api/logout`).then((res) => {
      if (res.data.status == 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        Swal.fire({
          title: "Thành công",
          text: "Đăng xuất hệ thống thành công",
          icon: "success",
        });
        navigate("/");
      }
    });
  };
  return (
    <>
      <nav>
        <i className="bx bx-menu toggle-sidebar"></i>
        <form action="#"></form>
        <Link to="#" className="nav-link"></Link>
        <Link to="#" className="nav-link"></Link>
        <button onClick={logoutSubmit} className="nav-link">
          Đăng xuất
          <i className=" ms-2 bx bx-log-in-circle icon"></i>
        </button>
      </nav>
    </>
  );
}

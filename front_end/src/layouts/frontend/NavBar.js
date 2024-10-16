import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../../assets/frontend/css/bootstrap.min.css";
import "../../assets/frontend/css/templatemo.css";
import "../../assets/frontend/css/custom.css";
import "../../assets/frontend/css/fontawesome.min.css";

export default function NavBar() {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`/api/count`).then((res) => {
      if (res.data.status == 200) {
        setCount(res.data.count);
      }
    });
  }, [count]);

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
      } else {
      }
    });
  };

  var AuthButton = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <>
        <Link
          className="text-decoration-none"
          to="/login"
          style={{ letterSpacing: 0 }}
        >
          <i className="fa fa-sign-in me-1" aria-hidden="true"></i>
          Đăng nhập
        </Link>
        <Link
          className="text-decoration-none ms-3"
          to="/register"
          style={{ letterSpacing: 0 }}
        >
          <i className="fa fa-user-plus me-1" aria-hidden="true"></i>
          Đăng ký
        </Link>
      </>
    );
  } else {
    AuthButton = (
      <>
        <>
          <span className="me-2">Chào,{localStorage.getItem("auth_name")}</span>{" "}
        </>
        <>
          <button onClick={logoutSubmit} className="btn btn-outline-secondary">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </>
      </>
    );
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
        id="templatemo_nav_top"
      >
        <div className="container text-light">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <i className="fa fa-envelope mx-2"></i>
              <Link
                className="navbar-sm-brand text-light text-decoration-none"
                to="mailto:info@company.com"
              >
                onlinestore@company.com
              </Link>
              <i className="fa fa-phone mx-2"></i>
              <Link
                className="navbar-sm-brand text-light text-decoration-none"
                to="tel:010-020-0340"
              >
                0123456789
              </Link>
            </div>
            <div>
              <Link
                className="text-light"
                to="https://fb.com/templatemo"
                target="_blank"
                rel="sponsored"
              >
                <i className="fab fa-facebook-f fa-sm fa-fw me-2"></i>
              </Link>
              <Link
                className="text-light"
                to="https://www.instagram.com/"
                target="_blank"
              >
                <i className="fab fa-instagram fa-sm fa-fw me-2"></i>
              </Link>
              <Link
                className="text-light"
                to="https://twitter.com/"
                target="_blank"
              >
                <i className="fab fa-twitter fa-sm fa-fw me-2"></i>
              </Link>
              <Link
                className="text-light"
                to="https://www.linkedin.com/"
                target="_blank"
              >
                <i className="fab fa-linkedin fa-sm fa-fw"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            className="navbar-brand text-success logo h1 align-self-center"
            to="/"
          >
            Zay
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    Cửa hàng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    Giới thiệu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className="navbar align-self-center d-flex"
              style={{ boxShadow: "none" }}
            >
              <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="inputMobileSearch"
                    placeholder="Search ..."
                  />
                  <div className="input-group-text">
                    <i className="fa fa-fw fa-search"></i>
                  </div>
                </div>
              </div>
              <Link
                className="nav-icon position-relative text-decoration-none"
                to="/cart"
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
              </Link>
              {AuthButton}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

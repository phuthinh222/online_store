import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  let navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("http://127.0.0.1:8000/api/register", data).then((res) => {
        if (res.data.status == 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          Swal.fire({
            title: "Thành công",
            text: "Đăng ký thông tin hoàn tất",
            icon: "success",
          });
          navigate("/");
        } else {
          setRegisterInput({
            ...registerInput,
            error_list: res.data.validation_error,
          });
        }
      });
    });
  };

  return (
    <>
      {/* <div className="breadcrumb-section breadcrumb-bg-color--golden">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="breadcrumb-title">Đăng ký tài khoản</h3>
                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                  <nav aria-label="breadcrumb">
                    <ul>
                      <li>
                        <Link className="text-decoration-none" to="/">
                          Trang chủ
                        </Link>
                      </li>
                      <li className="active" aria-current="page">
                        Đăng ký
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="customer-login">
        <div className="container">
          <div className="row ">
            <div className="col-md-2"></div>
            <div className="account_form col-md-8">
              <h3>Đăng ký</h3>
              <form onSubmit={registerSubmit} method="POST">
                <div className="default-form-box">
                  <label>
                    Họ tên <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={registerInput.name}
                  ></input>
                  <span className="text-danger">
                    {registerInput.error_list.name}
                  </span>
                </div>
                <div className="default-form-box">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleInput}
                    value={registerInput.email}
                  ></input>
                  <span className="text-danger">
                    {registerInput.error_list.email}
                  </span>
                </div>
                <div className="default-form-box">
                  <label>
                    Mật khẩu <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={registerInput.password}
                    autoComplete="true"
                  ></input>
                  <span className="text-danger">
                    {registerInput.error_list.password}
                  </span>
                </div>
                <div className="register_submit">
                  <div className="text-decoration-none link-secondary mb-2 d-flex">
                    <div className="me-1">Bạn đã có tài khoản? </div>
                    <div>
                      <Link to="/login" className="text-decoration-none">
                        Đăng nhập ngay
                      </Link>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-secondary mt-2 py-2"
                    type="submit"
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div> */}
      <section class="container py-5">
        <div class="row text-center pt-3">
          <div class="col-lg-6 m-auto">
            <h3 class="h1">Đăng nhập tài khoản</h3>
          </div>
        </div>
        <div class="row">
          <div className="customer-login d-flex align-items-center justify-content-center">
            <div className="container">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="account_form col-12 col-md-8">
                  <form onSubmit={registerSubmit}>
                    <div className="default-form-box mb-4">
                      <label className="form-label">
                        Họ tên <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={handleInput}
                        value={registerInput.name}
                      ></input>
                      <span className="text-danger">
                        {registerInput.error_list.name}
                      </span>
                    </div>
                    <div className="default-form-box mb-4">
                      <label className="form-label">
                        Địa chỉ email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={handleInput}
                        value={registerInput.email}
                      ></input>
                      <span className="text-danger">
                        {registerInput.error_list.email}
                      </span>
                    </div>
                    <div className="default-form-box mb-4">
                      <label className="form-label">
                        Mật khẩu <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleInput}
                        value={registerInput.password}
                      />
                      <span className="text-danger">
                        {registerInput.error_list.password}
                      </span>
                    </div>
                    <div className="login_submit">
                      <div className="text-decoration-none link-secondary mb-2 d-flex">
                        <div className="me-1">Bạn đã có tài khoản? </div>
                        <div>
                          <Link to="/login" className="text-decoration-none">
                            Đăng nhập ngay
                          </Link>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-secondary mt-2 py-2"
                        type="submit"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

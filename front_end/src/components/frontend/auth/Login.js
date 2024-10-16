import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  let navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.post(`api/login`, data).then((res) => {
      if (res.data.status == 200) {
        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("auth_name", res.data.username);
        Swal.fire({
          title: "Thành công",
          text: "Đăng nhập vào hệ thống thành công",
          icon: "success",
        });
        if (res.data.role == "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else if (res.data.status == 401) {
        Swal.fire({
          title: "Thất bại",
          text: "Địa chỉ email hoặc mật khẩu không đúng",
          icon: "error",
        });
        navigate("/login");
      } else {
        setLogin({ ...loginInput, error_list: res.data.validation_error });
      }
    });
  };

  return (
    <>
      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h3 className="h1">Đăng nhập tài khoản</h3>
          </div>
        </div>
        <div className="row">
          <div className="customer-login d-flex align-items-center justify-content-center">
            <div className="container">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="account_form col-12 col-md-8">
                  <form onSubmit={loginSubmit}>
                    <div className="default-form-box mb-3">
                      <label className="form-label">
                        Địa chỉ email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        onChange={handleInput}
                        value={loginInput.email}
                        className="form-control"
                      />
                      <span className="text-danger">
                        {loginInput.error_list.email}
                      </span>
                    </div>
                    <div className="default-form-box mb-3">
                      <label className="form-label">
                        Mật khẩu <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleInput}
                        value={loginInput.password}
                      />
                      <span className="text-danger">
                        {loginInput.error_list.password}
                      </span>
                    </div>
                    <div className="login_submit">
                      <div className="text-decoration-none link-secondary mb-2 d-flex">
                        <div className="me-1">Bạn chưa có tài khoản?</div>
                        <div>
                          <Link to="/register" className="text-decoration-none">
                            Đăng ký ngay
                          </Link>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-secondary mt-2 py-2"
                        type="submit"
                      >
                        Đăng nhập
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

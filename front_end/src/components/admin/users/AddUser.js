import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddUser() {
  let navigate = useNavigate();
  useEffect(() => {
    document.title = "Thêm mới người dùng";
  }, []);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });
  const hanldeInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const submitUser = (e) => {
    e.preventDefault();

    const data = {
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
    };

    axios.post(`api/storeUser`, data).then((res) => {
      if (res.data.status == 200) {
        Swal.fire({
          title: "Thành công",
          text: res.data.message,
          icon: "success",
        });
        navigate("/admin/users/viewUser");
      } else if (res.data.status == 400) {
        setUserInput({ ...userInput, error_list: res.data.errors });
      }
    });
  };
  return (
    <>
      <main style={{ backgroundColor: "#f1f0f6" }}>
        <div className="d-flex justify-content-between">
          <h1>Thêm thông tin tài khoản</h1>
          <Link to="/admin/users/viewUser">
            <button className="btn btn-secondary btn-sm text-capitalize">
              <i className="fa fa-arrow-left me-2" aria-hidden="true"></i>
              Danh sách
            </button>
          </Link>
        </div>
        <ul className="breadcrumbs ps-0">
          <li>
            <Link className="text-decoration-none" to="/admin">
              Trang chủ
            </Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link className="text-decoration-none" to="/admin/users/viewUser">
              Tài khoản
            </Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link to="/admin/users" className="text-decoration-none active">
              Thêm người dùng
            </Link>
          </li>
        </ul>
        <div className="info-data">
          <div className="card">
            <form id="myform" onSubmit={submitUser}>
              <div className="tab-content">
                <div
                  className=" tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className=" mb-3">
                    <label>Họ tên</label>
                    <input
                      onChange={hanldeInput}
                      value={userInput.name}
                      id="name"
                      type="text"
                      className="form-control mt-2"
                      name="name"
                    />
                    <span className="text-danger">
                      {userInput.error_list.name}
                    </span>
                  </div>
                  <div className=" mb-3">
                    <label>Email</label>
                    <input
                      onChange={hanldeInput}
                      value={userInput.email}
                      id="email"
                      type="text"
                      className="form-control mt-2"
                      name="email"
                    />
                    <span className="text-danger">
                      {userInput.error_list.email}
                    </span>
                  </div>
                  <div className=" mb-3">
                    <label>Mật khẩu</label>
                    <input
                      onChange={hanldeInput}
                      value={userInput.password}
                      id="password"
                      className="form-control mt-2"
                      type="text"
                      name="password"
                    />
                    <span className="text-danger">
                      {userInput.error_list.password}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary text-capitalize"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddCategories() {
  useEffect(() => {
    document.title = "Thêm mới loại hàng";
  }, []);
  let navigate = useNavigate();
  const [categoryInput, setCategory] = useState({
    name: "",
    description: "",
    error_list: [],
  });

  const hanldeInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const submitCategory = (e) => {
    e.preventDefault();

    const data = {
      name: categoryInput.name,
      description: categoryInput.description,
    };

    axios.post(`api/storeCategory`, data).then((res) => {
      if (res.data.status == 200) {
        Swal.fire({
          title: "Thành công",
          text: "Thêm loại sản phẩm thành công",
          icon: "success",
        });
        navigate("/admin/category/viewCategories");
      } else if (res.data.status == 400) {
        setCategory({ ...categoryInput, error_list: res.data.errors });
      }
    });
  };

  var display_errors = [];

  if (categoryInput.error_list) {
    display_errors = [
      categoryInput.error_list.name,
      categoryInput.error_list.description,
    ];
  }
  const renderErrors = () => {
    if (display_errors.length > 0) {
      return display_errors.map((item, index) => (
        <p key={index} className="text-danger mb-2">
          {item}
        </p>
      ));
    } else {
      return null;
    }
  };

  return (
    <>
      <main style={{ backgroundColor: "#f1f0f6" }}>
        <div className="d-flex justify-content-between">
          <h1>Thêm thông tin loại hàng</h1>
          <Link to="/admin/category/viewCategories">
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
            <Link
              className="text-decoration-none"
              to="/admin/category/viewCategories"
            >
              Loại hàng
            </Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link to="/admin/users" className="text-decoration-none active">
              Thêm loại hàng
            </Link>
          </li>
        </ul>
        <div className="info-data">
          <div className="card">
            {renderErrors}

            <form onSubmit={submitCategory} id="myform">
              <div className="tab-content">
                <div
                  className=" tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className=" mb-3">
                    <label>Tên loại hàng</label>
                    <input
                      id="name"
                      onChange={hanldeInput}
                      value={categoryInput.name}
                      type="text"
                      className="form-control mt-2"
                      name="name"
                    />
                    <span className="text-danger">
                      {categoryInput.error_list.name}
                    </span>
                  </div>
                  <div className=" mb-3">
                    <label>Mô tả loại hàng</label>
                    <input
                      id="description"
                      onChange={hanldeInput}
                      value={categoryInput.description}
                      className="form-control mt-2"
                      type="text"
                      name="description"
                    />
                    <span className="text-danger">
                      {categoryInput.error_list.description}
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

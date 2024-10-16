import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditCategories() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryInput, setCategory] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    document.title = "Cập nhật loại hàng";
    axios.get(`/api/editCategory/${id}`).then((res) => {
      if (res.data.status == 200) {
        setCategory(res.data.category);
      } else if (res.data.status == 400) {
        Swal.fire({
          title: "Lỗi",
          text: "Loại hàng không tìm thấy",
          icon: "warning",
        });
        navigate("/admin/category/viewCategories");
      }
      setLoading(false);
    });
  }, [id, navigate]);

  const hanldeInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const updateCategory = (e) => {
    e.preventDefault();

    const data = categoryInput;

    axios.put(`/api/updateCategory/${id}`, data).then((res) => {
      if (res.data.status == 200) {
        Swal.fire({
          title: "Thành công",
          text: "Chỉnh sửa loại hàng thành công",
          icon: "success",
        });
        setError([]);
        navigate("/admin/category/viewCategories");
      } else if (res.data.status == 422) {
        Swal.fire({
          title: "Lỗi",
          text: "Vui lòng kiểm tra lại dữ liệu",
          icon: "warning",
        });
        setError(res.data.errors);
      } else if (res.data.status == 404) {
        Swal.fire({
          title: "Lỗi",
          text: "Không tìm thấy loại hàng",
          icon: "warning",
        });
        navigate("/admin/category/viewCategories");
      }
    });
  };

  if (loading) {
    return <h4>Đang tải ...</h4>;
  }

  return (
    <>
      <main style={{ backgroundColor: "#f1f0f6" }}>
        <div className="d-flex justify-content-between">
          <h1>Cập nhật thông tin loại hàng</h1>
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
            <Link to="" className="text-decoration-none active">
              Cập nhật loại hàng
            </Link>
          </li>
        </ul>
        <div className="info-data">
          <div className="card">
            <form onSubmit={updateCategory}>
              <div className="tab-content" id="myTabContent">
                <div
                  className=" tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="mb-3">
                    <label>Tên loại hàng</label>
                    <input
                      id="name"
                      onChange={hanldeInput}
                      value={categoryInput.name}
                      type="text"
                      className="form-control mt-2"
                      name="name"
                    />
                    <span className="text-danger">{error.name}</span>
                  </div>
                  <div className="mb-3">
                    <label>Mô tả</label>
                    <input
                      id="description"
                      onChange={hanldeInput}
                      value={categoryInput.description}
                      className="form-control mt-2"
                      type="text"
                      name="description"
                    />
                    <span className="text-danger">{error.description}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary text-capitalize"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Users() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Danh sách người dùng";
    axios.get(`/api/viewUser`).then((res) => {
      if (res.data.status == 200) {
        setUser(res.data.user);
        setLoading(false);
      }
    });
  }, []);

  const deleteUser = (e, id, name) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xoá loại hàng ${name} này không`
    );
    if (confirmed) {
      const thisClicked = e.currentTarget;
      thisClicked.innerHTML =
        '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';

      axios.delete(`api/deleteUser/${id}`).then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            title: "Thành công",
            text: res.data.message,
            icon: "success",
          });
          thisClicked.closest("tr").remove();
        } else if (res.data.status == 404) {
          Swal.fire({
            title: "Lỗi",
            text: "Có lỗi xảy ra",
            icon: "warning",
          });
          thisClicked.innerText =
            '<i class="fa fa-trash" aria-hidden="true"></i>';
        }
      });
    }
  };

  var display_HTML = "";
  if (loading) {
    return <h4>Đang tải ...</h4>;
  } else {
    display_HTML = user.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <button
              onClick={(e) => deleteUser(e, item.id, item.name)}
              type="button"
              className="btn btn-danger btn-sm"
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <main style={{ backgroundColor: "#f1f0f6" }}>
      <div className="d-flex justify-content-between">
        <h1>Danh sách người dùng</h1>
        <Link to="/admin/users/addUser">
          <button className="btn btn-success btn-sm">
            <i className="fa fa-plus me-2" aria-hidden="true"></i>Thêm
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
          <Link to="/admin/users" className="text-decoration-none active">
            Tài khoản
          </Link>
        </li>
      </ul>
      <div className="info-data">
        <div className="card">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Email</th>
                <th scope="col" style={{ width: "110px" }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>{display_HTML}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

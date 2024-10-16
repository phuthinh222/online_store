import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ViewCategories() {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    document.title = "Danh sách loại hàng";
    axios.get(`api/viewCategory`).then((res) => {
      if (res.data.status == 200) {
        setCategoryList(res.data.category);
      }
      setLoading(false);
    });
  }, []);

  const deleteCategory = (e, id, name) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xoá loại hàng ${name} này không`
    );
    if (confirmed) {
      const thisClicked = e.currentTarget;
      thisClicked.innerHTML =
        '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';

      axios.delete(`api/deleteCategory/${id}`).then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Xoá loại hàng thành công",
            icon: "success",
          });
          thisClicked.closest("tr").remove();
        } else if (res.data.status == 404) {
          Swal.fire({
            title: "Lỗi",
            text: "Có lỗi xảy ra",
            icon: "warning",
          });
          thisClicked.innerHTML =
            '<i class="fa fa-trash" aria-hidden="true"></i>';
        }
      });
    }
  };

  var viewCategory_HTML = "";

  if (loading) {
    return <h4>Đang tải ...</h4>;
  } else {
    viewCategory_HTML = categoryList.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>
            <Link
              className="btn btn-primary btn-sm me-4"
              to={`/admin/category/editCategories/${item.id}`}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <button
              onClick={(e) => deleteCategory(e, item.id, item.name)}
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
    <>
      <main style={{ backgroundColor: "#f1f0f6" }}>
        <div className="d-flex justify-content-between">
          <h1>Danh sách loại hàng</h1>
          <Link to="/admin/category/addCategories">
            <button className="btn btn-success btn-sm text-capitalize">
              <i className="fa-solid fa-plus me-2"></i>
              Thêm
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
              className="text-decoration-none active"
              to="/admin/category/viewCategories"
            >
              Danh sách loại hàng
            </Link>
          </li>
        </ul>
        <div className="info-data">
          <div className="card">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" style={{ width: "110px" }}>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>{viewCategory_HTML}</tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

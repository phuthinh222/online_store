import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ViewProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    document.title = "Danh sách sản phẩm";
    axios.get(`/api/viewProduct`).then((res) => {
      if (res.data.status == 200) {
        setProduct(res.data.products);
        setLoading(false);
      }
    });
  }, []);

  const deleteProduct = (e, id, name) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xoá loại hàng ${name} này không`
    );
    if (confirmed) {
      const thisClicked = e.currentTarget;
      thisClicked.innerHTML =
        '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';

      axios.delete(`api/deleteProduct/${id}`).then((res) => {
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

  var display_product_HTML = "";

  if (loading) {
    return <h4>Đang tải...</h4>;
  } else {
    display_product_HTML = product.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <img
              src={`http://localhost:8000/${item.image}`}
              style={{ width: "100px" }}
              alt="Ảnh"
            />
          </td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td>
            {item.selling_price > 0
              ? `${formatPrice(item.selling_price)} đồng`
              : "Không có"}
          </td>
          <td>{formatPrice(item.original_price)} đồng</td>
          <td>
            <Link
              className="btn btn-primary btn-sm me-4"
              to={`/admin/product/editProduct/${item.id}`}
            >
              <i class="fa-regular fa-pen-to-square"></i>
            </Link>
            <button
              onClick={(e) => deleteProduct(e, item.id, item.name)}
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
          <h1>Danh sách sản phẩm</h1>
          <Link to="/admin/product/addProduct">
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
            <Link
              className="text-decoration-none active"
              to="/admin/product/viewProduct"
            >
              Sản phẩm
            </Link>
          </li>
        </ul>
        <div className="info-data">
          <div className="card">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Loại hàng</th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Giá khuyến mãi</th>
                  <th scope="col">Giá gốc</th>
                  <th scope="col" style={{ width: "110px" }}>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>{display_product_HTML}</tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

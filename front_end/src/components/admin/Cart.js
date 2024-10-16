import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Danh sách đặt hàng";
    axios.get(`/api/admin/order`).then((res) => {
      if (res.data.status == 200) {
        setOrder(res.data.orders);
        setLoading(false);
      }
    });
  }, []);
  var display_order_HTML = "";

  if (loading) {
    return <h4>Đang tải...</h4>;
  } else {
    display_order_HTML = order.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.fullname}</td>
          <td>{item.address}</td>
          <td>{item.phone}</td>
          <td>
            <Link className="btn btn-primary btn-sm me-4" to="#">
              <i class="fa-regular fa-eye"></i>
            </Link>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <main style={{ backgroundColor: "#f1f0f6" }}>
        <div className="d-flex justify-content-between">
          <h1>Danh sách đặt hàng</h1>
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
              Đặt hàng
            </Link>
          </li>
        </ul>
        <div className="info-data">
          <div className="card">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col" style={{ width: "110px" }}>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>{display_order_HTML}</tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

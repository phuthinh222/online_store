import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [count, setCount] = useState({
    product: "",
    category: "",
    user: "",
    order: "",
  });
  useEffect(() => {
    document.title = "Trang chủ";
    axios.get(`/api/countAll`).then((res) => {
      if (res.data.status == 200) {
        setCount({
          product: res.data.count.product,
          category: res.data.count.category,
          user: res.data.count.user,
          order: res.data.count.order,
        });
      }
    });
  }, []);
  return (
    <main style={{ backgroundColor: "#f1f0f6" }}>
      <h1 className="title">Trang chủ</h1>
      <div className="info-data">
        <div className="card">
          <div className="head">
            <div>
              <h2>{count.category}</h2>
              <p>Loại hàng</p>
            </div>
            <i style={{ fontSize: "50px" }} class="fa-solid fa-layer-group"></i>
          </div>
        </div>
        <div className="card">
          <div className="head">
            <div>
              <h2>{count.product}</h2>
              <p>Sản phẩm</p>
            </div>
            <i
              style={{ fontSize: "50px" }}
              class="fa-brands fa-product-hunt"
            ></i>
          </div>
        </div>
        <div className="card">
          <div className="head">
            <div>
              <h2>{count.user}</h2>
              <p>Người dùng</p>
            </div>
            <i style={{ fontSize: "50px" }} class="fa-solid fa-users"></i>
          </div>
        </div>
        <div className="card">
          <div className="head">
            <div>
              <h2>{count.order}</h2>
              <p>Đơn đặt hàng</p>
            </div>
            <i
              style={{ fontSize: "50px" }}
              class="fa-solid fa-cart-flatbed"
            ></i>
          </div>
        </div>
      </div>
    </main>
  );
}

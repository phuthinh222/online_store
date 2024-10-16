import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Link to="/admin" className="brand text-decoration-none h2 ms-3">
        <i className="bx bxs-smile icon"></i> Zay Store
      </Link>
      <ul className="side-menu mt-0">
        <li>
          <Link
            to="/admin"
            className={`text-decoration-none ${
              activeIndex === 0 ? "active" : ""
            }`}
            onClick={() => handleMenuClick(0)}
          >
            <i className="bx bx-bar-chart-alt icon"></i> Trang chủ
          </Link>
        </li>

        <li>
          <Link
            to="#"
            className={`text-decoration-none ${
              activeIndex === 1 ? "active" : ""
            }`}
            onClick={() => handleMenuClick(1)}
          >
            <i className="bx bxs-user-circle icon"></i> Người dùng
          </Link>

          <ul
            className={`side-dropdown ${activeIndex === 1 ? "show ps-0" : ""}`}
          >
            <li>
              <Link className="text-decoration-none" to="/admin/users/addUser">
                <i class="bx bx-plus icon"></i> Thêm người dùng
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none" to="/admin/users/viewUser">
                <i class="bx bx-list-ul icon"></i>Danh sách ND
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link
            to="#"
            className={`text-decoration-none ${
              activeIndex === 2 ? "active" : ""
            }`}
            onClick={() => handleMenuClick(2)}
          >
            <i className="bx bxs-category-alt icon"></i> Loại hàng
          </Link>

          <ul
            className={`side-dropdown ${activeIndex === 2 ? "show ps-0" : ""}`}
          >
            <li>
              <Link
                className="text-decoration-none"
                to="/admin/category/addCategories"
              >
                <i class="bx bx-plus icon"></i> Thêm loại hàng
              </Link>
            </li>
            <li>
              <Link
                className="text-decoration-none"
                to="/admin/category/viewCategories"
              >
                <i class="bx bx-list-ul icon"></i> Danh sách LH
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link
            to="#"
            className={`text-decoration-none ${
              activeIndex === 3 ? "active" : ""
            }`}
            onClick={() => handleMenuClick(3)}
          >
            <i className="bx bxl-product-hunt icon"></i> Sản phẩm
          </Link>

          <ul
            className={`side-dropdown ${activeIndex === 3 ? "show ps-0" : ""}`}
          >
            <li>
              <Link
                className="text-decoration-none"
                to="/admin/product/addProduct"
              >
                <i class="bx bx-plus icon"></i> Thêm sản phẩm
              </Link>
            </li>
            <li>
              <Link
                className="text-decoration-none"
                to="/admin/product/viewProduct"
              >
                <i class="bx bx-list-ul icon"></i> Danh sách SP
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            to="/admin/order"
            className={`text-decoration-none ${
              activeIndex === 4 ? "active" : ""
            }`}
            onClick={() => handleMenuClick(4)}
          >
            <i class="bx bxs-cart-download icon"></i> Đặt hàng
          </Link>
        </li>
      </ul>
    </>
  );
};

export default SidebarMenu;

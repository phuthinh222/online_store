import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Checkout() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState([]);
  var totalCart = 0;
  if (!localStorage.getItem("auth_token")) {
    navigate("/login");
    Swal.fire({
      title: "Lỗi",
      text: "Vui lòng đăng nhập",
      icon: "error",
    });
  }
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const [checkoutInput, setCheckout] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status == 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status == 401) {
          Swal.fire({
            title: "Lỗi",
            text: res.data.mesage,
            icon: "error",
          });
          navigate("/login");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleInput = (e) => {
    e.persist();
    setCheckout({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    const data = {
      fullname: checkoutInput.fullname,
      address: checkoutInput.address,
      phone: checkoutInput.phone,
    };
    axios.post(`/api/order`, data).then((res) => {
      if (res.data.status == 200) {
        Swal.fire({
          title: "Thành công",
          text: "Đặt hàng thành công",
          icon: "success",
        });
        setError([]);
        navigate("/thankyou");
      } else if (res.data.status == 422) {
        Swal.fire({
          title: "Thất bại",
          text: "Vui lòng kiểm tra thông tin",
          icon: "error",
        });
        setError(res.data.errors);
      }
    });
  };

  if (loading) {
    return <h4>Đang tải...</h4>;
  }

  var checkoutHTML = "";
  if (cart.length > 0) {
    checkoutHTML = (
      <>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Thông tin cá nhân</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Họ tên</label>
                    <input
                      type="text"
                      name="fullname"
                      onChange={handleInput}
                      value={checkoutInput.fullname}
                      className="form-control"
                    />
                    <span className="text-danger">{error.fullname}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleInput}
                      value={checkoutInput.phone}
                      className="form-control"
                    />
                    <span className="text-danger">{error.phone}</span>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label>Địa chỉ nhận hàng</label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleInput}
                      value={checkoutInput.address}
                      className="form-control"
                    />
                    <span className="text-danger">{error.address}</span>
                  </div>
                </div>
                <div className="col-md-12 text-end">
                  <div className="form-group mb-0">
                    <button className="btn btn-primary" onClick={submitOrder}>
                      Đặt hàng<i class="fa-solid fa-truck-fast ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Thông tin đơn hàng</h4>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    totalCart +=
                      item.product.selling_price * item.product_quantity;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.product.name}</td>
                        <td>{formatPrice(item.product.selling_price)} đồng</td>
                        <td className="text-center">{item.product_quantity}</td>
                        <td>
                          {formatPrice(
                            item.product.selling_price * item.product_quantity
                          )}{" "}
                          đồng
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={3} className="text-end fw-bold fs-5">
                      Tổng tiền
                    </td>
                    <td colSpan={2} className="text-end fw-bold fs-5">
                      {formatPrice(totalCart)} đồng
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    checkoutHTML = (
      <>
        <div className="card card-body text-center py-5">
          Giỏ hàng của bạn đang trống
        </div>
      </>
    );
  }

  return (
    <>
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row text-center pt-5 pb-3">
            <div className="col-lg-6 m-auto">
              <Link to="/" className="h2 text-decoration-none breadcrums me-2">
                Trang chủ
              </Link>
              <i className="fa-solid fa-chevron-right me-2"></i>
              <Link
                to="/shop"
                className="h2 text-decoration-none breadcrums me-2"
              >
                Thanh toán
              </Link>
            </div>
          </div>
          <div className="row pt-5">{checkoutHTML}</div>
        </div>
      </section>
    </>
  );
}

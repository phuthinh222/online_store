import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalCart = 0;

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  if (!localStorage.getItem("auth_token")) {
    navigate("/login");
    Swal.fire({
      title: "Lỗi",
      text: "Vui lòng đăng nhập",
      icon: "error",
    });
  }

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

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_quantity:
                item.product_quantity - (item.product_quantity > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateQuantityCart(cart_id, "des");
  };

  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? { ...item, product_quantity: item.product_quantity + 1 }
          : item
      )
    );
    updateQuantityCart(cart_id, "inc");
  };

  function updateQuantityCart(cart_id, scope) {
    axios.put(`/api/updateCart/${cart_id}/${scope}`).then((res) => {});
  }

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerHTML = '<i class="fa-solid fa-spinner"></i>';

    axios.delete(`/api/deleteCart/${cart_id}`).then((res) => {
      if (res.data.status == 200) {
        Swal.fire({
          title: "Thành công",
          text: res.data.mesage,
          icon: "success",
        });
        thisClicked.closest("tr").remove();
      } else if (res.data.status == 404) {
        Swal.fire({
          title: "Thất bại",
          text: res.data.mesage,
          icon: "error",
        });
        thisClicked.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      }
    });
  };

  if (loading) {
    return <h4>Đang tải ...</h4>;
  }
  var cartHTML = "";
  if (cart.length > 0) {
    cartHTML = (
      <>
        <table className=" table table-responsive text-center ">
          <thead>
            <tr>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Xoá</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              totalCart += item.product.selling_price * item.product_quantity;
              return (
                <tr key={item.id}>
                  <td style={{ width: "200px" }}>
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={`http://localhost:8000/${item.product.image}`}
                      alt="Hình ảnh"
                    />
                  </td>
                  <td>{item.product.name}</td>
                  <td>{formatPrice(item.product.selling_price)} đồng</td>
                  <td style={{ width: "130px" }}>
                    <div className="text-center input-group">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="btn btn-outline-secondary"
                      >
                        -
                      </button>
                      <span className="form-control">
                        {item.product_quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="btn btn-outline-secondary "
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    {formatPrice(
                      item.product.selling_price * item.product_quantity
                    )}{" "}
                    đồng
                  </td>
                  <td>
                    <button
                      onClick={(e) => deleteCartItem(e, item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card card-body mb-0">
              <h4>
                Tổng tiền :{" "}
                <span className="float-end">{formatPrice(totalCart)} đồng</span>
              </h4>
              <hr />
              <Link to="/checkout" className="btn btn-primary">
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    cartHTML = (
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
                Giỏ hàng
              </Link>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-md-12">{cartHTML}</div>
          </div>
        </div>
      </section>
    </>
  );
}

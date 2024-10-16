import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ProductDetail() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quanity, setQuantity] = useState(1);

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/getProduct/${id}`).then((res) => {
      if (isMounted) {
        if (res.data.status == 200) {
          setProduct(res.data.product);
          setLoading(false);
        } else if (res.data.status == 404) {
          Swal.fire({
            title: "Lỗi",
            text: "Sản phẩm không tồn tại",
            icon: "error",
          });
          navigate("/shop");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleDecrement = () => {
    if (quanity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const addToCart = (e) => {
    e.preventDefault();
    const data = {
      product_id: product.id,
      product_quantity: quanity,
    };
    axios.post(`/api/addToCart`, data).then((res) => {
      if (res.data.status == 201) {
        Swal.fire({
          title: "Thành công",
          text: res.data.message,
          icon: "success",
        });
      } else if (res.data.status == 409) {
        Swal.fire({
          title: "Lỗi",
          text: res.data.message,
          icon: "warning",
        });
      } else if (res.data.status == 401) {
        Swal.fire({
          title: "Thất bại",
          text: res.data.message,
          icon: "error",
        });
        navigate("/login");
      } else if (res.data.status == 404) {
        Swal.fire({
          title: "Thất bại",
          text: res.data.message,
          icon: "error",
        });
        navigate("/shop");
      }
    });
  };

  if (loading) {
    return <h4>Đang tải ...</h4>;
  }

  return (
    <>
      <section className="bg-light">
        <div className="container pb-5">
          <div class="row text-center pt-5 pb-3">
            <div class="col-lg-6 m-auto">
              <Link to="/" class="h2 text-decoration-none breadcrums me-2">
                Trang chủ
              </Link>
              <i class="fa-solid fa-chevron-right me-2"></i>
              <Link to="/shop" class="h2 text-decoration-none breadcrums me-2">
                Cửa hàng
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div className="card mb-0">
                <img
                  className="card-img img-fluid"
                  src={`http://localhost:8000/${product.image}`}
                  alt="Card image cap"
                  id="product-detail"
                  style={{ maxHeight: "524px" }}
                />
              </div>
            </div>
            <div className="col-lg-7 mt-5">
              <div className="card mb-0" style={{ maxHeight: "524px" }}>
                <div className="card-body">
                  <h1 className="h2">{product.name}</h1>
                  <p className="h3 py-2">
                    <span
                      className="text-decoration-line-through"
                      style={{ color: "#E4E0E1" }}
                    >
                      {formatPrice(product.original_price)} đồng
                    </span>
                    <span className="ms-4 fw-bold fst-italic">
                      {formatPrice(product.selling_price)} đồng
                    </span>
                  </p>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <h6>Thương hiệu:</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted fs-6">
                        <strong>{product.brand}</strong>
                      </p>
                    </li>
                  </ul>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <h6>Loại hàng:</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted fs-6">
                        <strong>{product.category.name}</strong>
                      </p>
                    </li>
                  </ul>

                  <h6>Mô tả sản phẩm:</h6>
                  <p>{product.description}</p>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Số lượng có sẵn :</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted fs-6">
                        <strong>{product.quantity}</strong>
                      </p>
                    </li>
                  </ul>
                  <form onSubmit={addToCart}>
                    <input
                      type="hidden"
                      name="product-title"
                      value="Activewear"
                    />
                    <div className="row">
                      <div className="col-auto">
                        <ul className="list-inline pb-3 ps-0">
                          <li className="list-inline-item text-right">
                            Quantity
                            <input
                              type="hidden"
                              name="product-quanity"
                              id="product-quanity"
                              value="1"
                            />
                          </li>
                          <li className="list-inline-item">
                            <button
                              type="button"
                              onClick={handleDecrement}
                              className="btn btn-success"
                              id="btn-minus"
                            >
                              -
                            </button>
                          </li>
                          <li className="list-inline-item">
                            <input
                              type="text"
                              className="form-control"
                              id="var-value"
                              name="quantity"
                              min="1"
                              onChange={handleChange}
                              value={quanity}
                              style={{ display: "block", width: "50px" }}
                            />
                          </li>
                          <li className="list-inline-item">
                            <button
                              type="button"
                              onClick={handleIncrement}
                              className="btn btn-success"
                              id="btn-plus"
                            >
                              +
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row pb-3">
                      <div className="col d-grid">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg"
                          name="submit"
                          value="addtocard"
                        >
                          Add To Cart
                          <i className="fa-solid fa-cart-arrow-down ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

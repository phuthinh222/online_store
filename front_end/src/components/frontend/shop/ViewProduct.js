import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ViewProduct() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/product?category=${selectedCategory}`).then((res) => {
      if (isMounted) {
        if (res.data.status == 200) {
          setProduct(res.data.product_data);
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
    axios.get(`/api/getCategory`).then((res) => {
      if (isMounted) {
        if (res.data.status == 200) {
          setCategory(res.data.category);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate, selectedCategory]);
  if (loading) {
    return <h4>Đang tải</h4>;
  } else {
    var showProductList = "";
    function formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    showProductList = product.product.map((item) => {
      return (
        <div
          className="col-md-4 mb-3"
          style={{ height: "430px" }}
          key={item.id}
        >
          <div className="card mb-4 product-wap rounded-0">
            <div className="card rounded-0 mb-0">
              <img
                className="card-img rounded-0 img-fluid d-block mx-auto"
                src={`http://localhost:8000/${item.image}`}
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="btn btn-success text-white mt-2"
                      to={`/shop/product/${item.id}`}
                    >
                      <i className="far fa-eye"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <Link
                to={`/shop/product/${item.id}`}
                className="text-decoration-none product text-center "
              >
                <h5 className="">{item.name}</h5>
              </Link>
              <div className="w-100 list-unstyled d-flex justify-content-between mb-0">
                <p className="text-description ">{item.description}</p>
              </div>
              <p
                className="text-center mb-0 text-decoration-line-through"
                style={{ color: "#E4E0E1" }}
              >
                {formatPrice(item.original_price)} đồng
              </p>
              <p className="text-center mb-0 fw-bold fst-italic" id="price">
                {formatPrice(item.selling_price)} đồng
              </p>
            </div>
          </div>
        </div>
      );
    });
    var showCategory = "";
    showCategory = category.map((item) => {
      return (
        <div className="pb-3" key={item.id}>
          <Link
            className="collapsed d-flex justify-content-between h3 text-decoration-none"
            to=""
            onClick={() => setSelectedCategory(item.id)}
          >
            {item.name}
          </Link>
        </div>
      );
    });
  }
  return (
    <>
      <div className="col-lg-3">
        <h1 className="h2 pb-4">Danh mục</h1>
        {showCategory}
      </div>
      <div className="col-lg-9">
        <div className="row">{showProductList}</div>
      </div>
    </>
  );
}

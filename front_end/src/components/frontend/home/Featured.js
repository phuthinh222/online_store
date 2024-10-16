import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured() {
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get(`/api/topProduct`).then((res) => {
      if (res.data.status == 200) {
        setProduct(res.data.product);
      }
    });
  }, []);
  return (
    <>
      <section className="bg-light">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Sản phẩm bán chạy</h1>
              <p>
                Các sản phẩm rất thu hút khách hàng nhờ chất lượng tốt, giá cả
                hợp lý hoặc sự phù hợp với nhu cầu và xu hướng hiện tại.
              </p>
            </div>
          </div>
          <div className="row">
            {product.map((item) => {
              return (
                <div className="col-12 col-md-4 mb-4" key={item.id}>
                  <div className="card h-100">
                    <Link href="shop-single.html">
                      <img
                        src={`http://localhost:8000/${item.image}`}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "310px" }}
                      />
                    </Link>
                    <div className="card-body">
                      <ul className="list-unstyled d-flex justify-content-between">
                        <li></li>
                        <li className="text-muted text-right">
                          {item.selling_price > 0
                            ? formatPrice(item.selling_price)
                            : formatPrice(item.original_price)}
                          &nbsp;đồng
                        </li>
                      </ul>
                      <div className="text-center mb-4">
                        <Link
                          to={`/shop/product/${item.id}`}
                          className="h2 text-decoration-none text-dark"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <p className="card-text text-description">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

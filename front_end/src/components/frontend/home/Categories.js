import { Link } from "react-router-dom";
import category1 from "../../../assets/frontend/img/category_img_01.jpg";
import category2 from "../../../assets/frontend/img/category_img_02.jpg";
import category3 from "../../../assets/frontend/img/category_img_03.jpg";

export default function Categories() {
  return (
    <>
      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Danh mục loại hàng của tháng</h1>
            <p>
              Các sản phẩm của các loại danh mục được bán chạy nhất trên thị
              trường
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 p-5 mt-3">
            <Link href="#">
              <img
                src={category1}
                className="rounded-circle img-fluid border"
              />
            </Link>
            <h5 className="text-center mt-3 mb-3">Thời trang</h5>
            <p className="text-center">
              <Link to="/shop" className="btn btn-success">
                Cửa hàng
              </Link>
            </p>
          </div>
          <div className="col-12 col-md-4 p-5 mt-3">
            <Link href="#">
              <img
                src={category2}
                className="rounded-circle img-fluid border"
              />
            </Link>
            <h2 className="h5 text-center mt-3 mb-3">Giày dép</h2>
            <p className="text-center">
              <Link to="/shop" className="btn btn-success">
                Cửa hàng
              </Link>
            </p>
          </div>
          <div className="col-12 col-md-4 p-5 mt-3">
            <Link href="#">
              <img
                src={category3}
                className="rounded-circle img-fluid border"
              />
            </Link>
            <h2 className="h5 text-center mt-3 mb-3">Mắt kính</h2>
            <p className="text-center">
              <Link to="/shop" className="btn btn-success">
                Cửa hàng
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

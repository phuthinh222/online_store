import { Link } from "react-router-dom";
import banner1 from "../../../assets/frontend/img/banner_img_01.jpg";
import banner2 from "../../../assets/frontend/img/banner_img_02.jpg";
import banner3 from "../../../assets/frontend/img/banner_img_03.jpg";

export default function Banner() {
  return (
    <>
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={banner1} alt="" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1 text-success">
                      <b>Zay</b> Store
                    </h1>
                    <p>
                      Zay Shop là trang web bán hàng trực tuyến chuyên cung cấp
                      các sản phẩm thời trang hiện đại, phong cách và chất lượng
                      cao. Với mục tiêu mang đến cho khách hàng những trải
                      nghiệm mua sắm tiện lợi và thú vị, cung cấp đa dạng các
                      mặt hàng thời trang như quần áo, giày dép, phụ kiện cho cả
                      nam và nữ .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={banner2} alt="" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Phối đồ tinh tế</h1>
                    <p>
                      Phối đồ áo quần là nghệ thuật kết hợp các trang phục và
                      phụ kiện sao cho phù hợp với phong cách cá nhân, hoàn cảnh
                      và xu hướng thời trang. Việc phối đồ không chỉ giúp bạn tự
                      tin hơn mà còn tạo ấn tượng và thể hiện gu thẩm mỹ của
                      mình.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={banner3} alt="" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Xu hướng thời trang</h1>
                    <p>
                      Thời trang phát triển liên tục theo thời gian, chịu ảnh
                      hưởng từ nghệ thuật, văn hóa, xã hội và công nghệ. Các xu
                      hướng thời trang thường thay đổi theo mùa, với những phong
                      cách, chất liệu và màu sắc mới được giới thiệu qua các
                      tuần lễ thời trang tại các thành phố lớn như Paris, Milan,
                      New York và London.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev text-decoration-none w-auto ps-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <i className="fas fa-chevron-left"></i>
        </a>
        <a
          className="carousel-control-next text-decoration-none w-auto pe-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>
    </>
  );
}

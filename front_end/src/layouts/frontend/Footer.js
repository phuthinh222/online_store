import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 pt-5">
            <h2 className="h2 text-success border-bottom pb-3 border-light logo">
              Zay Shop
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <i className="me-2 fa fa-map-marker-alt fa-fw"></i>
                Thừa Thiên Huế
              </li>
              <li>
                <i className="me-2 fa fa-phone fa-fw"></i>
                <Link className="text-decoration-none" href="tel:010-020-0340">
                  0123456789
                </Link>
              </li>
              <li>
                <i className="me-2 fa fa-envelope fa-fw"></i>
                <Link
                  className="text-decoration-none"
                  href="mailto:info@company.com"
                >
                  onlinestore@company.com
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">
              Thông tin
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <Link className="text-decoration-none" href="#">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" href="#">
                  Giới thiệu về chúng tôi
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" href="#">
                  Địa chỉ
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" href="#">
                  FAQs
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" href="#">
                  Liên hệ với chúng tôi
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

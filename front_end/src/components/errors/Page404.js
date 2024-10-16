import { Link } from "react-router-dom";

export default function Page403() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-body">
            Page 404 | Không tìm thấy địa chỉ
            <Link to="/">Quay lại</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

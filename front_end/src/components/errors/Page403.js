import { Link } from "react-router-dom";

export default function Page403() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-body">
            Page 403 | Bạn không thể truy cập
            <Link to="/">Quay lại</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

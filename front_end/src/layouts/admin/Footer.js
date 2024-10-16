import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container-fluid">
      <div className="row text-muted">
        <div className="col-6 text-start">
          <p className="mb-0">
            <Link className="text-muted text-decoration-none" to="#">
              <strong>Online Store</strong>&copy; 2024
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

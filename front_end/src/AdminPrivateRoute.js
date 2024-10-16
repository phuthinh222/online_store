import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminRoutes from "./layouts/admin/AdminRoutes";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminPrivateRoute() {
  let navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(`/api/checkingAuthenticated`);
        if (res.data.status === 200) {
          setAuthenticated(true);
        }
      } catch (error) {
        if (error.response && error.response.status == 401) {
          Swal.fire({
            title: "Thất bại",
            text: "Vui lòng đăng nhập",
            icon: "error",
          });
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, [navigate]);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status == 403) {
        Swal.fire({
          title: "Lỗi",
          text: "Bạn không có quyền truy cập",
          icon: "warning",
        });
        navigate("/403");
      } else if (error.response.status == 404) {
        Swal.fire({
          title: "Lỗi",
          text: "Đường dẫn không tồn tại",
          icon: "warning",
        });
        navigate("/404");
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <h1>Đang tải ...</h1>;
  }

  return authenticated ? <AdminRoutes /> : <Navigate to="/login" />;
}

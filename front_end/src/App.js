import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersRoutes from "./components/frontend/UserRoutes";
import AdminPrivateRoute from "./AdminPrivateRoute";
import axios from "axios";
import Page403 from "./components/errors/Page403";
import Page404 from "./components/errors/Page404";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UsersRoutes />} />
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/admin/*" element={<AdminPrivateRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

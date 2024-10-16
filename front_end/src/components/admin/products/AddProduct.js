import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddProduct() {
  let navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [productInput, setProductInput] = useState({
    category_id: "",
    name: "",
    description: "",
    selling_price: "",
    original_price: "",
    quantity: "",
    brand: "",
  });
  const [picture, setPicture] = useState({ image: null });
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  useEffect(() => {
    document.title = "Thêm mới sản phẩm";
    axios.get(`/api/allCategory`).then((res) => {
      if (res.data.status == 200) {
        setCategoryList(res.data.category);
      }
    });
  }, []);

  const submitProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);
    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("quantity", productInput.quantity);
    formData.append("brand", productInput.brand);

    axios
      .post(`/api/storeProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Thêm sản phẩm thành công",
            icon: "success",
          });
          setError([]);
          navigate("/admin/product/viewProduct");
        } else if (res.data.status == 422) {
          Swal.fire({
            title: "Lỗi",
            text: "Vui lòng kiểm tra dữ liệu",
            icon: "warning",
          });
          setError(res.data.errors);
        }
      });
  };

  return (
    <>
      <main style={{ backgroundColor: "#f1f0f6" }}>
        <div className="d-flex justify-content-between">
          <h1>Thêm thông tin sản phẩm</h1>
          <Link to="/admin/product/viewProduct  ">
            <button className="btn btn-secondary btn-sm text-capitalize">
              <i className="fa fa-arrow-left me-2" aria-hidden="true"></i>
              Danh sách
            </button>
          </Link>
        </div>
        <ul className="breadcrumbs ps-0">
          <li>
            <Link className="text-decoration-none" to="/admin">
              Trang chủ
            </Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link
              className="text-decoration-none"
              to="/admin/product/viewProduct"
            >
              Sản phẩm
            </Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link to="/admin/users" className="text-decoration-none active">
              Thêm sản phẩm
            </Link>
          </li>
        </ul>
        <div className="info-data">
          <div className="card">
            <form onSubmit={submitProduct} encType="multipart/form-data">
              <div className="tab-content row" id="myTabContent">
                <div className=" mb-3">
                  <label>Chọn loại hàng</label>
                  <select
                    name="category_id"
                    onChange={handleInput}
                    value={productInput.category_id}
                    className="form-control mt-2"
                  >
                    <option>Chọn loại hàng</option>
                    {categoryList.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {" "}
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <span className="text-danger">{errorlist.category_id}</span>
                </div>
                <div className=" mb-3">
                  <label>Tên sản phẩm</label>
                  <input
                    onChange={handleInput}
                    value={productInput.name}
                    type="text"
                    name="name"
                    className="form-control mt-2"
                  />
                  <span className="text-danger">{errorlist.name}</span>
                </div>
                <div className=" mb-3">
                  <label>Mô tả sản phẩm</label>
                  <input
                    onChange={handleInput}
                    value={productInput.description}
                    type="text"
                    name="description"
                    className="form-control mt-2"
                  />
                  <span className="text-danger">{errorlist.description}</span>
                </div>
                <div className="col-md-4  mb-3">
                  <label>Số lượng</label>
                  <input
                    onChange={handleInput}
                    value={productInput.quantity}
                    type="number"
                    name="quantity"
                    className="form-control"
                  />
                  <span className="text-danger">{errorlist.quantity}</span>
                </div>
                <div className="col-md-8  mb-3">
                  <label>Thương hiệu</label>
                  <input
                    type="text"
                    name="brand"
                    onChange={handleInput}
                    value={productInput.brand}
                    className="form-control"
                  />
                  <span className="text-danger">{errorlist.brand}</span>
                </div>
                <div className="col-md-6  mb-3">
                  <label>Giá giảm giá</label>
                  <input
                    onChange={handleInput}
                    value={productInput.selling_price}
                    type="text"
                    name="selling_price"
                    className="form-control"
                  />
                  <span className="text-danger">{errorlist.selling_price}</span>
                </div>
                <div className="col-md-6  mb-3">
                  <label>Giá gốc</label>
                  <input
                    onChange={handleInput}
                    value={productInput.original_price}
                    type="text"
                    name="original_price"
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorlist.original_price}
                  </span>
                </div>
                <div className="col-md-12  mb-3">
                  <label>Hỉnh ảnh sản phầm</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    className="form-control"
                  />
                  <span className="text-danger">{errorlist.image}</span>
                </div>
              </div>
              <button type="submit" className="btn btn-success text-capitalize">
                Thêm
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

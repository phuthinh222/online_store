import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditProduct() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productInput, setProductInput] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
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

  const [allcheckbox, setCheckbox] = useState([]);
  const handleCheckbox = (e) => {
    e.persist();
    setCheckbox({ ...allcheckbox, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    document.title = "Cập nhật sản phẩm";
    axios.get(`/api/allCategory`).then((res) => {
      if (res.data.status == 200) {
        setCategoryList(res.data.category);
      }
    });

    axios.get(`api/editProduct/${id}`).then((res) => {
      if (res.data.status == 200) {
        setProductInput(res.data.product);
        setCheckbox(res.data.product);
      } else if (res.data.status == 404) {
        Swal.fire({
          title: "Lỗi",
          text: "Không tìm thấy sản phẩm",
          icon: "error",
        });
        navigate("/admin/product/viewProduct");
      }
      setLoading(false);
    });
  }, [id, navigate]);

  const updateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);
    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_description", productInput.meta_description);
    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("quantity", productInput.quantity);
    formData.append("brand", productInput.brand);
    formData.append("featured", allcheckbox.featured ? "1" : "0");
    formData.append("popular", allcheckbox.popular ? "1" : "0");
    formData.append("status", allcheckbox.status ? "1" : "0");

    axios
      .post(`/api/updateProduct/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Cập nhật sản phẩm thành công",
            icon: "success",
          });
          setError([]);
        } else if (res.data.status == 422) {
          Swal.fire({
            title: "Lỗi",
            text: "Vui lòng kiểm tra dữ liệu",
            icon: "warning",
          });
          setError(res.data.errors);
        } else if (res.data.status == 404) {
          Swal.fire({
            title: "Lỗi",
            text: "Không tìm thấy sản phẩm",
            icon: "error",
          });
          navigate("/admin/product/viewProduct");
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  if (loading) {
    return <h4>Đang tải... </h4>;
  }

  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h4>Cập nhật sản phẩm</h4>
          <Link to="/admin/product/viewProduct">
            <button className="btn btn-secondary btn-sm text-capitalize">
              <i className="fa fa-arrow-left me-2" aria-hidden="true"></i>
              Quay lại
            </button>
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={updateProduct} encType="multipart/form-data">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Profile
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  Contact
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group mb-3">
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
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    onChange={handleInput}
                    value={productInput.slug}
                    type="text"
                    name="slug"
                    className="form-control mt-2"
                  />
                  <span className="text-danger">{errorlist.slug}</span>
                </div>
                <div className="form-group mb-3">
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
                <div className="form-group mb-3">
                  <label>Mô tả</label>
                  <input
                    onChange={handleInput}
                    value={productInput.description}
                    type="text"
                    name="description"
                    className="form-control mt-2"
                  />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="form-group mb-3">
                  <label>Meta title</label>
                  <input
                    onChange={handleInput}
                    value={productInput.meta_title}
                    type="text"
                    name="meta_title"
                    className="form-control mt-2"
                  />
                  <span className="text-danger">{errorlist.meta_title}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keyword</label>
                  <input
                    onChange={handleInput}
                    value={productInput.meta_keyword}
                    type="text"
                    name="meta_keyword"
                    className="form-control mt-2"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Meta description</label>
                  <input
                    onChange={handleInput}
                    value={productInput.meta_description}
                    type="text"
                    name="meta_description"
                    className="form-control mt-2"
                  />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Selling price</label>
                    <input
                      onChange={handleInput}
                      value={productInput.selling_price}
                      type="text"
                      name="selling_price"
                      className="form-control"
                    />
                    <span className="text-danger">
                      {errorlist.selling_price}
                    </span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Original price</label>
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
                  <div className="col-md-4 form-group mb-3">
                    <label>Quantity</label>
                    <input
                      onChange={handleInput}
                      value={productInput.quantity}
                      type="number"
                      name="quantity"
                      className="form-control"
                    />
                    <span className="text-danger">{errorlist.quantity}</span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="brand"
                      onChange={handleInput}
                      value={productInput.brand}
                      className="form-control"
                    />
                    <span className="text-danger">{errorlist.brand}</span>
                  </div>
                  <div className="col-md-8 form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />
                    <span className="text-danger">{errorlist.image}</span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Featured ( checked = show )</label>
                    <input
                      type="checkbox"
                      name="featured"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.featured === 1 ? true : false}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Popular ( checked = show )</label>
                    <input
                      type="checkbox"
                      name="popular"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.popular === 1 ? true : false}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Status ( checked = hidden )</label>
                    <input
                      type="checkbox"
                      name="status"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.status === 1 ? true : false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-sm text-capitalize"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

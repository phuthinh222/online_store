import thankyou from "../../assets/frontend/img/order.jpg";

export default function Thankyou() {
  return (
    <>
      <div className="container-fluid bg-light py-5">
        <div className="col-md-6 m-auto text-center">
          <img src={thankyou} alt="Hình ảnh" height="200px" />
          <h1 className="h1">Đặt hàng thành công</h1>
          <p>
            Cảm ơn bạn đã đặt hàng, bộ phận chăm sóc khách hàng của chúng tôi sẽ
            liên hệ với bạn trong vòng 24h để xác nhận, hãy để ý điện thoại bạn
            nhé!
            <i class="fa-solid fa-bell ms-2" style={{ color: "#FFD43B" }}></i>
          </p>
        </div>
      </div>
    </>
  );
}

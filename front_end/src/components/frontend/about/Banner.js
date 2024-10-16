import aboutHero from "../../../assets/frontend/img/about-hero.svg";

export default function Banner() {
  return (
    <section class="bg-success py-5">
      <div class="container">
        <div class="row align-items-center py-5">
          <div class="col-md-8 text-white">
            <h1>Giới thiệu về chúng tôi</h1>
            <p>
              Tại Zay Store, chúng tôi tin rằng sự thành công đến từ sự kết hợp
              hoàn hảo giữa công nghệ tiên tiến và đội ngũ nhân viên tận tâm,
              giàu kinh nghiệm. Chúng tôi luôn nỗ lực không ngừng để nâng cao
              giá trị và trải nghiệm của khách hàng thông qua các sản phẩm đổi
              mới và dịch vụ chuyên nghiệp.
            </p>
          </div>
          <div class="col-md-4">
            <img src={aboutHero} alt="About Hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

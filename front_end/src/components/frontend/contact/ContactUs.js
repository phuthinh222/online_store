export default function ContactUs() {
  return (
    <>
      <div class="container py-5">
        <div class="row py-5">
          <form class="col-md-9 m-auto" method="post" role="form">
            <div class="row">
              <div class="form-group col-md-6 mb-3">
                <label htmlFor="inputname">Họ ten</label>
                <input
                  type="text"
                  class="form-control mt-1"
                  id="name"
                  name="name"
                />
              </div>
              <div class="form-group col-md-6 mb-3">
                <label htmlFor="inputemail">Địa chỉ email</label>
                <input
                  type="email"
                  class="form-control mt-1"
                  id="email"
                  name="email"
                />
              </div>
            </div>
            <div class="mb-3">
              <label htmlFor="inputsubject">Vấn đề</label>
              <input
                type="text"
                class="form-control mt-1"
                id="subject"
                name="subject"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="inputmessage">Mô tả</label>
              <textarea
                class="form-control mt-1"
                id="message"
                name="message"
                rows="8"
              ></textarea>
            </div>
            <div class="row">
              <div class="col text-end mt-2">
                <button type="submit" class="btn btn-success btn-lg px-3">
                  Gửi thông tin
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

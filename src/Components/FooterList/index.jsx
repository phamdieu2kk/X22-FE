
import "./style.css";

const FooterList = () => {
  return (
    <>
      <footer className="footerlist">
        <div className="mid-footer">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-4 ft-info col-footer">
                <a className="logo-ft" href="/" title="logo">
                  <img src="https://play-lh.googleusercontent.com/aQnBEKmZOk2X38pyZtAA6wmoxgGIk9cyn5YXHp5RqM308prUE0S_LZMekH21k_PUvgs=w240-h480-rw" />
                </a>
                <div className="content-ft">
                Hãy đến với WEB GAME và hãy trãi nghiệm  những câu đố tuyệt vời của
                  chúng tôi làm cho bạn thêm nhiều kiến thức mới
                </div>
               
               
              </div>

              <div className="col-12 col-md-6 col-lg-2 link-list col-footer">
                <h4 className="title-menu title-menu2">Chính sách</h4>
                <ul className="list-menu">
                  <li>
                    <a href="#" title="Chính sách thành viên">
                      Chính sách thành viên
                    </a>
                  </li>
                  
                  <li>
                    <a href="#" title="Bảo mật Thông tin">
                      Bảo mật Thông tin
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-6 col-lg-3 link-list col-footer">
                <h4 className="title-menu title-menu2">Thông tin chung</h4>
                <div className="group-adress">
                  <ul>
                    <li>
                      <p>Địa chỉ: </p>
                      <span>70 Lữ Gia, Phường 15, Quận 11, TP.HCM</span>
                    </li>
                    <li>
                      <p>Số điện thoại: </p>
                      <span>1950 1640</span>
                    </li>
                    <li>
                      <p>Email hổ trợ : </p>
                      <span>hhoang.it@hotmail.com</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-3">
                <h4 className="title-menu title-menu2">Hỗ trợ</h4>
                <div className="group-adress">
                  
                </div>
               
                <div className="group-adress">
                  <ul>
                    <li>
                      <p>Tất cả các ngày trong tuần</p>
                      <span>Trừ tết Âm Lịch(08:00 - 21:00 mỗi ngày)</span>
                    </li>
                  </ul>
                </div>
                <h4 className="title-menu title-menu2">GÓP Ý & KHIẾU NẠI</h4>
                <div className="group-adress">
                  <ul>
                    <li>
                      <p>Tất cả các ngày trong tuần</p>
                      <span>08:00 - 21:00 mỗi ngày</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterList;
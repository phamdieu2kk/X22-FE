

import FooterList from "../Components/FooterList";
import { Breadcrumb , Button} from "antd";
import { Link } from "react-router-dom";


const Contact = () => {
  return (
    <>
    
      <div className="content">
        <div className="title-home">
          <Breadcrumb items={[{ title: <Link to="/">Trang chủ</Link>}, { title: 'Liên hệ ' }]} />
        </div>
        <div className="contact-forms">
        <div className="container aos-init aos-animate">
  <div className="row mt-5">
    <div className="col-lg-4">
      <div className="info">
        <div className="address">
          <i className="bi bi-geo-alt" />
          <h4> Vị trí: </h4>
          <p>70 Lữ Gia, Phường 15, Quận 11, TP.HCM</p>
        </div>
        <div className="open-hours">
          <i className="bi bi-clock" />
          <h4> Giờ mở cửa: </h4>
          <p > {" "} Tất cả các ngày trong tuần <br/> 08:00 - 21:00 mỗi ngày{" "} </p>
        </div>
        <div className="email">
          <i className="bi bi-envelope" />
          <h4>  Email: </h4>
          <p> hhoang.it@hotmail.com </p>
        </div>
        <div className="phone">
          <i className="bi bi-phone" />
          <h4>  Gọi: </h4>
          <p> 1950 1640 </p>
        </div>
      </div>
    </div>
    
    <div className="col-lg-8 mt-5 mt-lg-0">
      <form
        action="forms-contact"
        method="post"
        role="form"
        className="email-form"
      >
        <div className="row">
          <div className="col-md-6 form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Tên bạn"
              required=""
            />
          </div>
          <div className="col-md-6 form-group mt-3 mt-md-0">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Email của bạn"
              required=""
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            name="subject"
            id="subject"
            placeholder="Chủ đề"
            required=""
          />
        </div>
        <div className="form-group mt-3">
          <textarea
            className="form-control"
            name="message"
            rows={8}
            placeholder="Thông điệp"
            required=""
            
            defaultValue={""}
          />
        </div>
        
          <div className="error-message" />
          <div
            className="sent-message"
          
          >
            Tin nhắn của bạn đã được gửi. Cảm ơn!
          </div>
       
        <div className="text-center">
        <Button type="primary" htmlType="submit" className="auth-button"> Gửi tin nhắn</Button>
          
        </div>
      </form>
    </div>
  </div>
</div>
</div>
</div>
      <FooterList />
    </>
  );
};

export default Contact;

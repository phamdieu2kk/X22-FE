
import Slider from "../Components/Slider";
import FooterList from "../Components/FooterList";
import { Breadcrumb } from "antd";


const Contact = () => {
  return (
    <>
      {/* <div>
        <Slider />
      </div> */}

      <div className="content">
        <div className="title-home">
          {/* <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Liên hệ ' }]} /> */}
        </div>
        <div className="layout-contact">
          <div className="container-contact">
            <div className="outlay">
              <div className="contact-information">
                <div className="infor-contact">

                  <div className="form-contact">
                    <h4>Liên hệ với chúng tôi</h4>
                    <span className="content-form">
                      Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi,
                      và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể .
                    </span>
                    <div id="pagelogin">
                      <form
                        method="post"
                        action="/postcontact"
                        id="contact"
                        acceptCharset="UTF-8"
                      >
                        <input
                          name="FormType"
                          type="hidden"
                          defaultValue="contact"
                        />
                        <input name="utf8" type="hidden" defaultValue="true" />
                        <input
                          type="hidden"
                          id="Token-f21ae4911c964a50a686f0cd45552526"
                          name="Token"
                          defaultValue="03AFcWeA5KWuOKMlNmg0lg4vuib22yIIq5jY0LeC_rSD0wdNUvSO5InWjcpY-N1tMWgZWyeHQMLv1T9IlHkc5wpHm8GqSQ-pKi1zuqaMQxteL-s74sTm9Q4HloBNgb_njIPA1rgrsYFiPhkgiRQiohWvj-gcpQN8ALmuIShu8iThDabHUsdwN2AKbrygqzYbJ2LMUozqUsf5Y0kVl0k-ylXVYkeUEDr9bleRcVljJUtNPFNGTBv-Nac9iFSTsWRro4S36Xg3wfCAXXUvZL7bN9YhPp80TppaTt_ECkR-dBfmNzQyas5S62qPApclW1IHIJTPKMNRNRi1ZFGLtEEvEXi8Qmy4mASvdGxDgtneVpOOZfbun4PPI9M2zm0-BUbOYulaE1ab7PyskQcYNFuW7cPb_TJBW9H9nPsniDUEZQ18o_nnbi3wJP51TbBudOwT911VfL1yIHWZtRjxYmQTHXV3OavIkIOe-P7dDagA5vaeCk22RsVO0cSjXrrWGuTD-pps0DVjI1J9ET_ce0yq-gSZ2mi1c9nl4QMuJMw5HQDAvtEzR33YMdyhQ"
                        />
                        <div className="group_contact">
                          <input
                            placeholder="Họ và tên"
                            type="text"
                            className="form-control  form-control-lg"
                            required=""
                            defaultValue=""
                            name="contact[Name]"
                          />
                          <input
                            placeholder="Email"
                            type="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            required=""
                            id="email1"
                            className="form-control form-control-lg"
                            defaultValue=""
                            name="contact[email]"
                          />
                          <input
                            type="number"
                            placeholder="Điện thoại*"
                            name="contact[phone]"
                            className="form-control form-control-lg"
                            required=""
                          />
                          <textarea
                            placeholder="Nội dung"
                            name="contact[body]"
                            id="comment"
                            className="form-control content-area form-control-lg"
                            rows={5}
                            required=""
                            defaultValue={""}
                          />
                          <button type="button" className="btn-lienhe">
                            Gửi thông tin
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

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

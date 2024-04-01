import SliderMenu from "../Components/SliderMenu";
import Ranks from "../Components/ranks";


const Home = () => {
  return (
    <>
      <div className="bodywrap">
        <div>
        <Ranks/>
        <SliderMenu/>
        </div>
        
        <section className="section-instruction">
        <div className="container">
          <h3 className="title-instruction">
             <a className="title-name" href="/instruction" title="Hướng dẫn & Điều khoản">Hướng dẫn & Điều khoản </a> 
             </h3>Chúng tôi mong muốn tôn vinh ngôn ngữ mẹ đẻ mà bất cứ ai trong số 54 dân tộc Việt Nam sống trên lãnh thổ Việt Nam và trên thế giới đều có thể học được và tự hào với tiếng Việt. Trải qua chặng đường gần 10 năm phát triển, Trạng Nguyên đã trở thành cái tên quen thuộc đối với các em học sinh, quý phụ huynh và các thầy cô, đồng thời hoàn thiện hệ sinh thái sản phẩm đa dạng để tiếp tục góp phần xây dựng nền giáo dục nước nhà.
              </div>
              </section>

        <div className="section-banner-2">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="thumb-banner">
                  <a href="#" title="Sứ-mệnh">
                    <img
                      src="https://trangnguyen.edu.vn/assets/images/bg-home-1-deco.svg"
                      className="banner-left"
                    />
                  </a>
                </div>
                <div className="thumb-content">
                  <h3 className="title">Sứ mệnh & Giá trị cốt lỗi</h3>
                  <p> Đào tạo học sinh Việt Nam trong thời đại mới: đẹp về nhân cách, làm chủ tri thức, sáng tạo đột phá, thấm nhuần bản sắc dân tộc </p>
                  <p> SÁNG TÂM TRÍ - ĐỔI TƯ DUY - TẠO GIÁ TRỊ</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="thumb-banner">
                  <a href="#" title="Tầm-nhìn">
                    <img
                      src="https://trangnguyen.edu.vn/assets/images/bg-home-1-deco.svg"
                      className="banner-left"
                    />
                  </a>
                </div>
                <div className="thumb-content">
                  <h3 className="title">Tầm nhìn</h3>
                  <p> Trạng Nguyên tạo ra hệ sinh thái giáo dục kết hợp công nghệ và thực tế độc đáo để phát triển tư duy sáng tạo. Trở thành một tập đoàn công nghệ giáo dục toàn cầu với sự sáng tạo, đột phá gắn liền với bảo tồn và tôn vinh văn hoá dân tộc</p>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
   
    </>
  );
};

export default Home;
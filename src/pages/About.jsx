
import Slider from "../Components/Slider";
import FooterList from "../Components/FooterList";
import { Breadcrumb } from "antd";
const About = () => {
  return (
    <>
      {/* <div>
        <Slider />
      </div> */}
      <div className="content">
        <div className="title-home">
          <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Hướng dẫn' }]} />
        </div>
        <h2> Hướng Dẫn Trò Chơi</h2>
      </div>
      <FooterList />
    </>
  );
};

export default About;

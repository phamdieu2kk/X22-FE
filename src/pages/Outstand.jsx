
import Slider from "../Components/Slider";
import FooterList from "../Components/FooterList";
import { Breadcrumb } from "antd";


const Outstand = () => {
  return (
    <>
      <div>
        <Slider />
        <Breadcrumb items={[{ title: 'Trang chủ' },{ title: 'Thử thách' }]} />
       <h2> TẠO THỬ THÁCH  </h2>

      </div>
      <FooterList />
    </>
  );
};

export default Outstand;

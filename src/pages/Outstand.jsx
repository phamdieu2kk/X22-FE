
import FooterList from "../Components/FooterList";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Outstand = () => {
  return (
    <>
      <div>
        <Breadcrumb items={[{ title: <Link to="/">Trang chủ</Link> }, { title: 'Thử thách' }]} />
        <h2> TẠO THỬ THÁCH  </h2>

      </div>
      <FooterList />
    </>
  );
};

export default Outstand;

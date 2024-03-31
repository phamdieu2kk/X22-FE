

import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Outstand = () => {
  return (
    <>
      <div>
        <Breadcrumb items={[{ title: <Link to="/">Trang chủ</Link> }, { title: '' }]} />
       

      </div>
     
    </>
  );
};

export default Outstand;

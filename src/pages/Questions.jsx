import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Questions = () => {
  return (
    <>
      <div className="content">
        <div className="title-home">
          <Breadcrumb
            items={[
              { title: <Link to="/">Trang chủ</Link> },
              { title: "Câu hỏi" },
            ]}
          />




</div>
       
      </div>
    </>
  );
};

export default Questions;
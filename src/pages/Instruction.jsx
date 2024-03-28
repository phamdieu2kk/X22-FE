import { Link } from "react-router-dom";


import { Breadcrumb } from "antd";
const About = () => {
  return (
    <>
      <div className="content">
        <div className="title-home">
          <Breadcrumb items={[{ title:<Link to="/">Trang chủ</Link> }, { title: 'Hướng dẫn' }]} />
        </div>
        <h2> Hướng Dẫn Trò Chơi</h2>
      </div>
     
      
    </>
  );
};

export default About;

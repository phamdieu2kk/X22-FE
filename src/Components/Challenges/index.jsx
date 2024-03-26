
import Slider from '../Slider'
import FooterList from '../FooterList'
import { Link, NavLink } from "react-router-dom";
import { Breadcrumb } from "antd";
const Challenges = () => {
  return (
    <div>
   {/* <Slider/> */}
  <div>
    <div className="title-home">
    <Breadcrumb items={[{ title:<Link to="/">Trang chủ</Link> }, { title: 'Thử thách' }]} />
          {/* <NavLink to={"/challenges"} title="Thử Thách">
           Trang Chủ
          </NavLink>
          <span>{">"}</span> */}
          <h2> TẠO THỬ THÁCH  </h2>
        </div>
        
   </div>


     <FooterList/>
     </div>
  )
}

export default Challenges
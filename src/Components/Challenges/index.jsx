
import Slider from '../Slider'
import FooterList from '../FooterList'
import {  NavLink } from "react-router-dom";

const Challenges = () => {
  return (
    <div>
   <Slider title={"Thử Thách"} />
  <div>
    <div className="title-home">
          <NavLink to={"/challenges"} title="Thử Thách">
           Trang Chủ
          </NavLink>
          <span>{">"}</span>
          <h2> TẠO THỬ THÁCH  </h2>
        </div>
        
   </div>


     <FooterList/>
     </div>
  )
}

export default Challenges
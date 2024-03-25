import { NavLink } from "react-router-dom";
import "./style.css";
import { Button } from "antd";
const SliderMenu = () => {
  return (
    <div>
     
        <section className="section-about">
          <div className="bodywrap">
        <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="thumb-content-left">
                  <h2 className="title-slider">
              <img src="https://trangnguyentiengviet.vn/_next/image/?url=%2Fassets%2Fimages%2Fbg-village.jpg&w=1920&q=75"/>
            </h2>
            <div className="about-link">
              <NavLink title="Xem ngay" to={"/topic"}>  PLAY  </NavLink> 
                     </div>
                      </div>
                      </div>
                      </div> 
                      </div> 
                       </div>
                        </section>


      
    </div>
  );
};

export default SliderMenu;

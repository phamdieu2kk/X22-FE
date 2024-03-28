
import { Link} from "react-router-dom";
import { Breadcrumb } from "antd";
const Challenges = () => {
  return (
    <div>
   {/* <Slider/> */}
  <div>
    <div className="title-home">
    <Breadcrumb items={[{ title:<Link to="/">Trang chủ</Link> }, { title: 'Thử thách' }]} />
          <h2> TẠO THỬ THÁCH  </h2>
        </div>
        
   </div>


  
     </div>
  )
}

export default Challenges

import FooterList from "../Components/FooterList";
import { Breadcrumb } from "antd";
import { Link} from "react-router-dom";
const Account = () => {
  return (
   
   <>
    <div className="content">
      <div className="title-home">
          
         <Breadcrumb items={[{ title: <Link to="/">Trang chủ</Link> },{ title: 'Tài Khoản' }]} /> 
        </div>

        <div className="container mt-5">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4"> Cập nhật thông tin cá nhân</h2>
  
          </div>
        </div>
      </div>
    </div>
  </div>
   
        
        </div>
      <FooterList/>
 
      </>

  )
}

export default Account
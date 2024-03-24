import Slider from "../Components/Slider";
import FooterList from "../Components/FooterList";
import { Breadcrumb } from "antd";

const Account = () => {
  return (
   
   <>
   {/* <div>
    <Slider />
    </div> */}
    <div className="content">
      <div className="title-home">
          
         <Breadcrumb items={[{ title: 'Trang chủ' },{ title: 'Tài Khoản' }]} /> 
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

// import { Form, Button, Alert } from "react-bootstrap";
// import { useApi } from "../hooks/useApi";
import { Form ,Input , Typography,  Button } from "antd";
import UploadImage from "../Components/UploadImage";
import { useState } from "react";

const UpdateAccountForm = () => {
const [ avatar, setAvatar] = useState ()

// const handleFinish = () => 





return <Form className = 'updateAccountForm' layout = 'vertical' >
  <Form.Item>
    <img src={avatar}/>
  <UploadImage setImageUrl={ setAvatar}/>
  </Form.Item>

<Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                    { required: true, message: 'Họ và tên bắt buộc nhập', whitespace: true },
                ]}
            >
                <Input maxLength={100} />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Email bắt buộc nhập' },
                    { type: "email", message: 'Email không đúng đúng định dạng' },
                ]}
            >
                <Input maxLength={256} />
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                    { required: true, message: 'Mật khẩu bắt buộc nhập', whitespace: true },
                ]}
            >
                <Input.Password maxLength={100} />
            </Form.Item>

            <Form.Item
                label="Mô tả bản thân"
                name="bio"
               
            >
                <Input.TextArea maxLength={500} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="auth-button">Cập nhật</Button>
            </Form>}
export default UpdateAccountForm









// const UpdateAccountForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     address: "",
//     sex: "",
//     birthday: "",
//   });

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // const { postData } = useApi();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Gửi yêu cầu cập nhật thông tin cá nhân đến API
//       // await postData("/update-profile", formData);

//       // Nếu không có lỗi, hiển thị thông báo thành công
//       setSuccessMessage("Cập nhật thành công");
//       setErrorMessage(""); // Đảm bảo không còn thông báo lỗi nếu có
//       setTimeout(() => {
//         window.location.reload();
//       }, 5000);
      
//     } catch (error) {
//       // Nếu có lỗi, xử lý và hiển thị thông báo lỗi
//       setSuccessMessage("");
//       setErrorMessage("thử lại");
//     }
//   };

//   return (
//     <div>
//       {successMessage && <Alert variant="success">{successMessage}</Alert>}
//       {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Form.Group controlId="formAddress">
//           <Form.Label>Địa chỉ</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="địa chỉ"
//             value={formData.address}
//             onChange={(e) =>
//               setFormData({ ...formData, address: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Form.Group controlId="formSex">
//           <Form.Label>Giới tính</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="giới tính"
//             value={formData.sex}
//             onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
//           />
//         </Form.Group>

//         <Form.Group controlId="formBirthday">
//           <Form.Label>Ngày sinh</Form.Label>
//           <Form.Control
//             type="date"
//             value={formData.birthday}
//             onChange={(e) =>
//               setFormData({ ...formData, birthday: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Button type="submit" className="mt-3"> Đồng ý </Button>
//       </Form>
//     </div>
//   );
// };
// export default UpdateAccountForm
import  { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const UpdateAccountForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        address: "",
        sex: "",
        birthday: "",
      });
    
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
    
     
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Gửi yêu cầu cập nhật thông tin cá nhân đến API
          await postData("/update-profile", formData);
    
          // Nếu không có lỗi, hiển thị thông báo thành công
          setSuccessMessage("Cập nhật thành công");
          setErrorMessage(""); // Đảm bảo không còn thông báo lỗi nếu có
          setTimeout(() => {
            window.location.reload();
          }, 5000);
          
        } catch (error) {
          // Nếu có lỗi, xử lý và hiển thị thông báo lỗi
          setSuccessMessage("");
          setErrorMessage("thử lại");
        }
      };
    
      return (
        <div>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
    
            <Form.Group controlId="formAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="địa chỉ"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </Form.Group>
    
            <Form.Group controlId="formSex">
              <Form.Label>Giới tính</Form.Label>
              <Form.Control
                type="text"
                placeholder="giới tính"
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
              />
            </Form.Group>
    
            <Form.Group controlId="formBirthday">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                value={formData.birthday}
                onChange={(e) =>
                  setFormData({ ...formData, birthday: e.target.value })
                }
              />
            </Form.Group>
    
            <Button type="submit" className="mt-3"> Đồng ý </Button>
          </Form>
         
        </div>
      );
    };

export default UpdateAccountForm

import FooterList from "../FooterList";
import { NavLink , useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Form, Input, Typography, notification } from "antd";
import { useState } from 'react';
import axios from "axios";




const ResetPassword = () => {
    const [resetpasswordForm] = Form.useForm();
     const [password, setPassword] = useState("");
    const [passwordConfirmation, setpasswordConfirmation] = useState("");
    const navigate = useNavigate();
    const [notify, notifyContextHolder] = notification.useNotification();
   const handleResetPasswordForm = async (e) => {
    e.preventDefault();
    
   if (password !== passwordConfirmation) {
    alert("Mật khẩu không khớp");
    return;
    }
   
   try {
    const response = await axios.post(
    "http://103.30.10.141:3000/api/v1/user/resetpassword",
    { password}
    );
    const data = response.data;
    alert(data?. message);
    notify.success({
        message: 'Thành công',
        description: 'Đặt lại mật khẩu thành công',
       
    });
    navigate("/login");
    } catch (error) {
    alert(error.response?. data?. message ?? error.response?. data);
    }
    notify.error({
        message: 'Thất bại',
        description: 'Đặt lại mật khẩu thất bại'
    });
    };

    return (
        <>
         <div className="register-page">
            <Form className="auth-form">
                <Typography.Title style={{ textAlign: 'center' }}>Đặt lại mật khẩu </Typography.Title>
                       
                        <Form.Item
                label="Mật khẩu"
                name="password"
                onChange={(e) =>
                    setPassword( e.target.value )}
                rules={[
                    { required: true, message: 'Mật khẩu bắt buộc nhập', whitespace: true },
                ]}>
                 <Input.Password maxLength={100} />
            </Form.Item>

            <Form.Item
                label="Xác nhận mật khẩu"
                name="passwordConfirmation"
                onChange={(e) =>
                    setpasswordConfirmation(e.target.value)} 
                rules={[
                    { required: true, message: 'Xác nhận mật khẩu bắt buộc nhập', whitespace: true },
                    { validator: (rule, value) => value != resetpasswordForm.getFieldValue('password') ? Promise.reject('Xác nhận mật khẩu không chính xác') : Promise.resolve() }
                ]}
            >
                <Input.Password maxLength={100} />
            </Form.Item>

           
            <Button type="primary" htmlType="submit" className="auth-button">Đặt lại mật khẩu</Button>
             </Form>
             </div>
             <FooterList />
              </>
                )
            }

export default ResetPassword

import {  useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, notification } from "antd";
import { useState } from "react";
import axios from "axios";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [notify, notifyContextHolder] = notification.useNotification();
    const handleForgotpasswordForm = async () => {
        try {
            const response = await axios.post(
                "http://103.30.10.141:3000/api/v1/user/forgotpassword",
                { email }
            );
            const data = response.data;
            alert(data?.message);
            notify.success({
                message: 'Thành công',
                description: 'Gửi email thành công',
               
            });
        } catch (error) {
            alert(error.response?.data?.message ?? error.response?.data);
            notify.error({
                message: 'Thất bại',
                description: 'Gửi email thất bại'
            });
        }
    };

    return (
        <div className="register-page">
             {notifyContextHolder}
            <Form className="auth-form">
            <Typography.Title style={{ textAlign: 'center', color:"" }}>Quên mật khẩu </Typography.Title>

            <Form.Item
                label="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                rules={[
                    { required: true, message: 'Email bắt buộc nhập' },
                    { type: "email", message: 'Email không đúng đúng định dạng' },
                ]}
            >
                <Input maxLength={256} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="auth-button"  onClick={handleForgotpasswordForm}>Lấy lại mật khẩu</Button>
            </Form>
          
        </div>
    );
};

export default Forgotpassword;
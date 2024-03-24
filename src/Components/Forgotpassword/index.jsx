import Slider from "../Slider";
import FooterList from "../FooterList";
import { NavLink, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Form, Input, Typography, notification } from "antd";
import { useState } from "react";
import axios from "axios";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://103.30.10.141:3000/user/forgotpassword",
                { email }
            );
            const data = response.data;
            alert(data?.message);
            navigate("/reset-password");
        } catch (error) {
            alert(error.response?.data?.message ?? error.response?.data);
        }
    };

    return (
        <div>
            {/* <Slider /> */}
            <div>
                <div className="title-home">
                    <NavLink to={"/login"} title="Đăng Nhập">
                        Đăng nhập
                    </NavLink>
                    <span>{">"}</span>
                    <label>Quên mật khẩu</label>
                </div>
            </div>

            <div className="register-page">
               
                    <div>
                    <Typography.Title style={{ textAlign: 'center' }}>Quên mật khẩu </Typography.Title>

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
            
            <Button type="primary" htmlType="submit" className="auth-button"  onClick={handleSubmit}>Lấy lại mật khẩu</Button>
                       
                    </div>
                </div>
            

            <FooterList />
        </div>
    );
};

export default Forgotpassword;
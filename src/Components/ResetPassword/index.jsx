
import Slider from "../Slider";
import FooterList from "../FooterList";
import { NavLink , useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Form, Input, Typography, notification } from "antd";
import { useState } from 'react';
import axios from "axios";




const ResetPassword = () => {
     const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
   
   const handleReset = async (e) => {
    e.preventDefault();
    
   if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
    }
   
   try {
    const response = await axios.post(
    "http://103.30.10.141:3000/user/reset-password",
    { password: password }
    );
    const data = response.data;
    alert(data?. message);
    navigate("/login");
    } catch (error) {
    alert(error.response?. data?. message ?? error.response?. data);
    }
    };

    return (
        <>
        <div>
            {/* <Slider/> */}
             <div>
             <div className="title-home">
                    <NavLink to={"/login"} title="đặt lại mật khẩu">
                    Đăng Nhập
                    </NavLink>
                    <span>{">"}</span>
                    <label>Đặt lại mật khẩu </label>
                </div>
            </div>


            <div className="register-page">
                
                    <div>
                    <Typography.Title style={{ textAlign: 'center' }}>Quên mật khẩu </Typography.Title>
                        <form onSubmit={handleReset}>
                    <Input
                    className="input-username"
                    type="password"
                    placeholder="Mật Khẩu Mới"
                    required
                    value={password}
                    onChange={(e) =>
                        setPassword( e.target.value )
                    }/>
                    <Input
                    className="input-username" 
                    type="password" 
                    placeholder="Nhập Lại Mật Khẩu"
                    value={confirmPassword} 
                    onChange={(e) => 
                        setConfirmPassword(e.target.value)} 
                    required />
                    <Button
                    className="btn-login"
                    type="primary"
                    onClick={handleReset}>
                        
                        <span style={{ fontSize: "17px" }}>
                            Đặt lại mật khẩu {" "}
                            </span>
                            </Button>
                            </form>
                            </div>
                            </div>
                            </div>
                          
                             <FooterList />
                             </>
                              )
                            }

export default ResetPassword
import { useState } from "react";
import Slider from "../Components/Slider";
import FooterList from "../Components/FooterList";

import { Link, NavLink } from "react-router-dom";

import { Button, Input } from "antd";
import axios from "axios";

const Register = () => {
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        password: "",
        email: "",
        phone: "",

        // Thêm các trường dữ liệu khác tại đây
    });

    const addUser = async () => {
        try {
            const response = await axios.post(
                "http://103.30.10.141:3000/user/create",
                {
                    name: user.fullname,
                    email: user.email,
                    password: user.password,
                    username: user.username,
                    confirmPassword: user.confirmPassword 
                }
            );

            setUser({
                fullname: "",
                username: "",
                password: "",
                email: "",
                ConfirmPassword: "",

                // Đặt giá trị mặc định cho các trường dữ liệu khác tại đây
            });

            const data = response.data;
            sessionStorage.setItem("token", data.token);
            window.location.href = "/login";
        } catch (error) {
            alert(error.response?.data?.message ?? error.response?.data);
        }
    };

    return (
        <>
            <div>
                <Slider/>
            </div>
            <div className="title-home">
                <NavLink to={"/"} title="Trang chủ">
                    Trang chủ
                </NavLink>
                <span>{">"}</span>
                <label>Đăng kí tài khoản </label>
            </div>
            <div className="content form-user">
                <div className="container">
                    <div>
                        <h1 style={{ fontWeight: "700" }}>ĐĂNG KÝ</h1>
                        <Input
                            className="input-username"
                            type="text"
                            placeholder="Họ và tên"
                            value={user.fullname}
                            onChange={(e) =>
                                setUser({ ...user, fullname: e.target.value })
                            }
                        />
                        <Input
                            className="input-username"
                            type="text"
                            placeholder="Tên đăng nhập"
                            value={user.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                        />
                        <Input
                            className="input-username"
                            type="email"
                            placeholder="Email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                         <Input
                            className="input-username"
                            type="password"
                            placeholder="Mật Khẩu"
                            required
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                        <Input
                            className="input-username"
                            type="password"
                            placeholder="Nhập Lại Mật Khẩu"
                            required
                            value={user.confirmPassword}
                            onChange={(e) =>
                                setUser({ ...user, confirmPassword: e.target.value })
                            }
                        />


                        <div className="terms">
                            <input type="checkbox" id="checkbox" />
                            <label htmlFor="checkbox">
                                Tôi đồng ý{" "}
                                <a href="/about"> Điều khoản và điều kiện</a>
                            </label>
                        </div>
                        <Button
                            className="btn-login"
                            type="primary"
                            onClick={addUser}
                        >
                            <span style={{ fontSize: "17px" }}>Đăng ký</span>
                        </Button>
                        <div className="member">
                            Bạn đã có tài khoản{" "}
                            <Link to="/login"> Đăng nhập </Link> tại đây ?
                        </div>
                    </div>
                </div>
            </div>
            <FooterList />
        </>
    );
};

export default Register;
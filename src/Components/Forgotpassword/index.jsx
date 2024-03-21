import Slider from "../Slider";
import FooterList from "../FooterList";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
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
            navigate("/resetpassword");
        } catch (error) {
            alert(error.response?.data?.message ?? error.response?.data);
        }
    };

    return (
        <div>
            <Slider title={"Quên Mật Khẩu"} />
            <div>
                <div className="title-home">
                    <NavLink to={"/login"} title="Đăng Nhập">
                        Đăng nhập
                    </NavLink>
                    <span>{">"}</span>
                    <label>Quên mật khẩu</label>
                </div>
            </div>

            <div className="content form-user">
                <div className="container">
                    <div>
                        <h1 style={{ fontWeight: "700" }}>Quên mật khẩu </h1>

                        <form>
                            <Input
                                className="input-email"
                                type="email"
                                placeholder="Email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <Button
                                className="btn-login"
                                type="primary"
                                onClick={handleSubmit}
                            >
                                <span style={{ fontSize: "17px" }}>
                                    Lấy lại mật khẩu{" "}
                                </span>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <FooterList />
        </div>
    );
};

export default Forgotpassword;
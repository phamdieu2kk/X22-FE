import { useState } from "react";
import Slider from "../Components/Slider";
import FooterList from "../Components/FooterList";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { Breadcrumb, Button,Checkbox, Form, Input, Typography, notification } from "antd";
import axios from "axios";
import api from "../api";

export default function Register() {

    const [registerForm] = Form.useForm();
    const [notify, notifyContextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const handleRegisterForm = async (values) => {
        console.log('Giá trị nhập vào ', values);

        const dto = {
            name: values.fullName.trim(),
            email: values.email,
            username: values.username,
            password: values.password.trim(),
        };


        try {
            await api.register.invoke({ data: dto });
            notify.success({
                message: 'Thành công',
                description: 'Đăng ký tài khoản thành công'
            });
            navigate('/login');
        } catch (error) {
            console.dir(error);
            notify.error({
                message: 'Thất bại',
                description: 'Đăng ký tài khoản thất bại'
            });
        }

    }

    return <div className="register-page">
        {notifyContextHolder}
{/*        
        <Breadcrumb items={[{ title: <Link to="/">Trang chủ</Link> }, { title: 'Đăng ký' }]} separator=">" /> */}

        <Form
            form={registerForm}
            onFinish={handleRegisterForm}
            className="auth-form"
            layout="vertical"
        >

            <Typography.Title style={{ textAlign: 'center' }}>Tạo tài khoản</Typography.Title>

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
                label="Tên đăng ký"
                name="username"
                rules={[
                    { required: true, message: 'Tên đăng ký bắt buộc nhập', whitespace: true },
                    { validator: (rule, value) => (!value?.trim() || !value.includes(' ')) ? Promise.resolve() : Promise.reject('Tên đăng ký không được chứa dấu cách') }
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
                label="Xác nhận mật khẩu"
                name="passwordConfirmation"
                rules={[
                    { required: true, message: 'Xác nhận mật khẩu bắt buộc nhập', whitespace: true },
                    { validator: (rule, value) => value != registerForm.getFieldValue('password') ? Promise.reject('Xác nhận mật khẩu không chính xác') : Promise.resolve() }
                ]}
            >
                <Input.Password maxLength={100} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Tôi đồng ý  <a href="/instruction"> Điều khoản và điều kiện</a></Checkbox>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="auth-button">Đăng ký</Button>
            <div className="member">
                            Bạn đã có tài khoản{" "}
                            <Link to="/login"> Đăng nhập </Link> tại đây ?
                        </div>
                        </Form.Item>
        </Form>
        <FooterList />
    </div>
}

// const Register = () => {
//     const [user, setUser] = useState({
//         fullname: "",
//         username: "",
//         password: "",
//         email: "",
//         confirmPassword: "",

//         // Thêm các trường dữ liệu khác tại đây
//     });

//     const addUser = async () => {
//         try {
//             const response = await axios.post(
//                 "http://103.30.10.141:3000/user/create",
//                 {
//                     name: user.fullname,
//                     email: user.email,
//                     password: user.password,
//                     username: user.username,

//                 }
//             );

//             setUser({
//                 fullname: "",
//                 username: "",
//                 password: "",
//                 email: "",


//                 // Đặt giá trị mặc định cho các trường dữ liệu khác tại đây
//             });

//             const data = response.data;
//             sessionStorage.setItem("token", data.token);
//             window.location.href = "/login";
//         } catch (error) {
//             alert(error.response?.data?.message ?? error.response?.data);
//         }
//     };

//     return (
//         <>
//             {/* <div>
//                 <Slider/>
//             </div> */}
//             <div className="title-home">
//                 <NavLink to={"/"} title="Trang chủ">
//                     Trang chủ
//                 </NavLink>
//                 <span>{">"}</span>
//                 <label>Đăng kí tài khoản </label>
//             </div>
//             <div className="content form-user">
//                 <div className="container">
//                     <div>
//                         <h1 style={{ fontWeight: "700" }}>ĐĂNG KÝ</h1>
//                         <Input
//                             className="input-username"
//                             type="text"
//                             placeholder="Họ và tên"
//                             value={user.fullname}
//                             onChange={(e) =>
//                                 setUser({ ...user, fullname: e.target.value })
//                             }
//                         />
//                         <Input
//                             className="input-username"
//                             type="text"
//                             placeholder="Tên đăng nhập"
//                             value={user.username}
//                             onChange={(e) =>
//                                 setUser({ ...user, username: e.target.value })
//                             }
//                         />
//                         <Input
//                             className="input-username"
//                             type="email"
//                             placeholder="Email"
//                             pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
//                             value={user.email}
//                             onChange={(e) =>
//                                 setUser({ ...user, email: e.target.value })
//                             }
//                         />
//                         <Input
//                             className="input-username"
//                             type="password"
//                             placeholder="Mật Khẩu"
//                             required
//                             value={user.password}
//                             onChange={(e) =>
//                                 setUser({ ...user, password: e.target.value })
//                             }
//                         />
//                         <div className="terms">
//                             <input type="checkbox" id="checkbox" />
//                             <label htmlFor="checkbox">
//                                 Tôi đồng ý{" "}
//                                 <a href="/about"> Điều khoản và điều kiện</a>
//                             </label>
//                         </div>
//                         <Button
//                             className="btn-login"
//                             type="primary"
//                             onClick={addUser}
//                         >
//                             <span style={{ fontSize: "17px" }}>Đăng ký</span>
//                         </Button>
//                         <div className="member">
//                             Bạn đã có tài khoản{" "}
//                             <Link to="/login"> Đăng nhập </Link> tại đây ?
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <FooterList />
//         </>
//     );
// };



// export default Register;
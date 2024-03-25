
import { Link, useNavigate } from "react-router-dom";

import {  Button, Form, Input, Typography, notification } from "antd";
import FooterList from "../Components/FooterList";

import api from "../api";

export default function Login() {
    const [loginForm] = Form.useForm();
    const [notify, notifyContextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const handleLoginForm = async (values) => {
        console.log('Giá trị nhập vào ', values);

        const dto = {

            username: values.username,
            password: values.password.trim(),
        };


        try {
            await api.login.invoke({ data: dto });
            notify.success({
                message: 'Thành công',
                description: 'Đăng nhập tài khoản thành công',
               
            });
           navigate('/');
        } catch (error) {
            console.dir(error);
            notify.error({
                message: 'Thất bại',
                description: 'Đăng nhập tài khoản thất bại'
            });
        }

    }
    return <div className="register-page">  
    {notifyContextHolder}
    {/* <Slider /> */}
    {/* <Breadcrumb items={[{ title: <Link to="/">Trang chủ</Link> }, { title: 'Đăng nhập' }]} separator=">" /> */}
  
    <Form
        form={loginForm}
        onFinish={handleLoginForm}
        className="auth-form"
        layout="vertical"
        initialValues={{ remember: true }}
    >

        <Typography.Title style={{ textAlign: 'center' }}>Đăng Nhập </Typography.Title>

        <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
                { required: true, message: 'Tên đăng ký bắt buộc nhập', whitespace: true },
                { validator: (rule, value) => (!value?.trim() || !value.includes(' ')) ? Promise.resolve() : Promise.reject('Tên đăng ký không được chứa dấu cách') }
            ]}
        >
            <Input maxLength={100} />
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

        <Form.Item>
            <a className="login-form-forgot" href="/forgotpassword">Quên mật khẩu
        </a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="auth-button">Đăng nhập </Button>
        <div className="member">Bạn chưa có tài khoản{" "}
        <Link to="/register"> Đăng ký </Link>
         tại đây ?
          </div>
        </Form.Item>
        </Form>
        <FooterList />
        </div>
        }














// const Login = () => {
//     const [loggedIn, setLoggedIn] = useState(false);

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorUsername, setErrorUsername] = useState(false);
//     const [errorPassword, setErrorPassword] = useState(false);

//     const [user, setUser] = useState({
//         data: null,
//         isLoading: false,
//     });

//     useEffect(() => {
//         (async () => {
//             setUser((prev) => ({ ...prev, isLoading: true }));
//             const { data: _data } = await axios.get(
//                 "http://103.30.10.141:3000/user"
//             );
//             setUser({ data: _data, isLoading: false });
//         })();
//     }, []);

//     const handleLogin = async () => {
//         try {
//             setLoggedIn(true);
//             if (username === "" || password === "") {
//                 setLoggedIn(false);
//                 setErrorUsername(true);
//                 setErrorPassword(true);
//                 return;
//             }
//             const response = await axios.post(
//                 "http://103.30.10.141:3000/user/login",
//                 {
//                     username: username,
//                     password: password,
//                 }
//             );

//             if (response.status !== 200) {
//                 setLoggedIn(false);
//                 setErrorUsername(true);
//                 setErrorPassword(true);
//                 return;
//             }

//             const data = response.data;
//             sessionStorage.setItem("token", data.token);
//             sessionStorage.setItem(
//                 "user",
//                 JSON.stringify({
//                     username: data.username,
//                 })
//             );
//             window.location.href = "/";
//         } catch (error) {
//             alert(error.response?.data?.message ?? error.response?.data);
//             setLoggedIn(false);
//             setErrorUsername(true);
//             setErrorPassword(true);
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
//                 <label>Đăng nhập tài khoản </label>
//             </div>
//             <div className="content form-user">
//                 <div className="container">
//                     <div>
//                         <h1 style={{ fontWeight: "700" }}>ĐĂNG NHẬP</h1>
//                         <Input
//                             className={`input-username ${errorUsername ? "error" : ""
//                                 }`}
//                             placeholder="Tên đăng nhập"

//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                         <Input.Password
//                             className={`input-username ${errorPassword ? "error" : ""
//                                 }`}
//                             type="password"
//                             placeholder="Mật khẩu"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             iconRender={(visible) =>
//                                 visible ? (
//                                     <EyeTwoTone />
//                                 ) : (
//                                     <EyeInvisibleOutlined />
//                                 )
//                             }
//                         />
//                         <div className="forgotpassword">
//                             <a href="/forgotpassword">Quên Mật Khẩu</a>
//                         </div>
//                         <Button
//                             className="btn-login"
//                             type="primary"
//                             onClick={() => handleLogin()}
//                             disabled={loggedIn}
//                         >
//                             <span style={{ fontSize: "17px" }}>Đăng nhập</span>
//                         </Button>
//                         <div className="member">
//                             Bạn chưa có tài khoản{" "}
//                             <NavLink type="primary" to={"/register"}>
//                                 <span>Đăng ký</span>
//                             </NavLink>{" "}
//                             tại đây{" "}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <FooterList />
//         </>
//     );
// };

// export default Login;
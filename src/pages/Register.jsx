
import FooterList from "../Components/FooterList";
import { Link, useNavigate } from "react-router-dom";
import { Button,Checkbox, Form, Input, Typography, notification } from "antd";
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
                    { validator: (rule, value) => value != registerForm.getFieldValue('password') ? Promise.reject('Xác nhận mật khẩu không chính xác') : Promise.resolve()}]}>
                        <Input.Password maxLength={100} />
                        </Form.Item>
                         <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Tôi đồng ý  <a href="/instruction"> Điều khoản và điều kiện</a></Checkbox>
                            </Form.Item>
                            
                        <Form.Item>
                             <Button type="primary" htmlType="submit" className="auth-button">Đăng ký</Button>
                             <div className="member"> Bạn đã có tài khoản{" "}<Link to="/login"> Đăng nhập </Link> tại đây ?</div>
                        </Form.Item>
                        </Form>
                         <FooterList />
                         </div>
                         }
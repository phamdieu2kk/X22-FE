import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, notification } from "antd";
import api from "../api";
import { setAccessToken } from "../api/core";

export default function Login() {
  const [loginForm] = Form.useForm();
  const [notify, notifyContextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const handleLoginForm = async (values) => {
    console.log("Giá trị nhập vào ", values);

    const dto = {
      username: values.username,
      password: values.password.trim(),
    };

    try {
      const response = await api.login.invoke({ data: dto });
      console.log(response);
      setAccessToken(`Bearer ${response.data.token}`);

      const profileResponse = await api.auth.invoke({});
      console.log(profileResponse);

      notify.success({
        message: "Thành công",
        description: "Đăng nhập tài khoản thành công",
      });
      navigate("/");
    } catch (error) {
      console.dir(error);
      notify.error({
        message: "Thất bại",
        description: "Đăng nhập tài khoản thất bại",
      });
    }
  };
  return (
    <div className="register-page">
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
        <Typography.Title style={{ textAlign: "center" }}>
          Đăng Nhập{" "}
        </Typography.Title>

        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            {
              required: true,
              message: "Tên đăng ký bắt buộc nhập",
              whitespace: true,
            },
            {
              validator: (rule, value) =>
                !value?.trim() || !value.includes(" ")
                  ? Promise.resolve()
                  : Promise.reject("Tên đăng ký không được chứa dấu cách"),
            },
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Mật khẩu bắt buộc nhập",
              whitespace: true,
            },
          ]}
        >
          <Input.Password maxLength={100} />
        </Form.Item>

        <Form.Item>
          <a className="login-form-forgot" href="/forgotpassword">
            Quên mật khẩu
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="auth-button">
            Đăng nhập{""}
          </Button>
          <div className="member">
            Bạn chưa có tài khoản <Link to="/register"> Đăng ký </Link>
            tại đây ?
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

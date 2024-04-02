import { useState } from "react";
import { Form, Input, Typography, Button, notification } from "antd";
import UploadImage from "../Components/UploadImage";
import api from "../api";
import { setAccessToken } from "../api/core";

const { Title } = Typography;

const UpdateAccountForm = () => {
  const [avatar, setAvatar] = useState();
  const [notify] = notification.useNotification();

  const handleFinish = async (values) => {
    try {
      // Gửi yêu cầu cập nhật thông tin cá nhân đến server
      const response = await api.putUpdateAccountForm.invoke(values);

      // Kiểm tra kết quả từ server
      if (response.success) {
        // Cập nhật token mới vào ứng dụng
        setAccessToken(`Bearer ${response.data.token}`);

        // Hiển thị thông báo cập nhật thành công
        notify.success({
          message: "Thành công",
          description: "Cập nhật thông tin cá nhân thành công",
        });
      } else {
        // Hiển thị thông báo lỗi nếu cập nhật không thành công
        notify.error({
          message: "Thất bại",
          description: "Cập nhật thông tin cá nhân thất bại",
        });
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình gửi yêu cầu
      console.error("Error updating account:", error);
      notify.error({
        message: "Thất bại",
        description: "Cập nhật thông tin cá nhân thất bại",
      });
    }
  };

  return (
    <Form className="updateAccountForm" layout="vertical" onFinish={handleFinish}>
      <Title level={3}>Cập nhật tài khoản</Title>
      <Form.Item>
        <img src={avatar} alt="Avatar" />
        <UploadImage setImageUrl={setAvatar} />
      </Form.Item>

      <Form.Item
        label="Họ và tên"
        name="fullName"
        rules={[{ required: true, message: "Họ và tên bắt buộc nhập", whitespace: true }]}
      >
        <Input maxLength={100} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email bắt buộc nhập" },
          { type: "email", message: "Email không đúng định dạng" },
        ]}
      >
        <Input maxLength={256} />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Mật khẩu bắt buộc nhập", whitespace: true }]}
      >
        <Input.Password maxLength={100} />
      </Form.Item>

      <Form.Item label="Mô tả bản thân" name="bio">
        <Input.TextArea maxLength={500} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateAccountForm;
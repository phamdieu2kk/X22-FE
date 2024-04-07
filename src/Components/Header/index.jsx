import { Col, Flex, Menu, Row,Dropdown } from "antd";
import  { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import {UserOutlined} from "@ant-design/icons"

const mainMenuItems = [
  {
    label: (
      <NavLink className="nav-link" to="/">
        Trang chủ
      </NavLink>
    ),
    key: "home",
  },
  {
    label: (
      <NavLink className="nav-link" to="/topic">
        Chủ đề
      </NavLink>
    ),
    key: "topic",
  },
  {
    label: (
      <NavLink className="nav-link" to="/instruction">
        Hướng dẫn
      </NavLink>
    ),
    key: "instruction",
  },
  {
    label: (
      <NavLink className="nav-link" to="/contact">
        Liên hệ
      </NavLink>
    ),
    key: "contact",
  },
];





const mainAuthItems = [
  {
    label: (
      <NavLink className="nav-link" to="/login">
        Đăng nhập
      </NavLink>
    ),
    key: "login",
  },
  {
    label: (
      <NavLink className="nav-link" to="/register">
        Đăng ký
      </NavLink>
    ),
    key: "register",
  },
];



export default function Header() {
  const { currentUser,setCurrentUser } = useContext(AuthContext);
  
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("AccessToken");
  setCurrentUser({});
  navigate("/");
}

const loggedMenu = (
  <Menu>
    <Menu.Item key="0" onClick={handleLogout}>
      Logout
    </Menu.Item>
  </Menu>
)


  return (
    <Row className="header">
      <Col sm={8}>
        <Menu
          className="nav-menu"
          selectedKeys={["0"]}
          mode="horizontal"
          items={mainMenuItems}
        />
      </Col>

      <Col sm={8}>
        <Flex align="center" justify="center" className="brand">
          <img
            src="https://www.cubecraft.net/attachments/received_373414107023598-jpeg.177907"
            className="brand-logo"
            alt="Logo"
          />
        </Flex>
      </Col>

      <Col sm={8}>
        {!currentUser ? (
          <Flex justify="flex-end">
            <Menu
              className="nav-menu nav-menu-right"
              selectedKeys={["0"]}
              mode="horizontal"
              items={mainAuthItems}
            />
          </Flex>
        ) : (
          <Flex justify="flex-end">
            <Dropdown overlay={loggedMenu} trigger={["hover"]}>
              <UserOutlined></UserOutlined>
            </Dropdown>
            
          </Flex>
        )}
      </Col>
    </Row>
  );
}
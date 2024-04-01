import { Col, Flex, Menu, Row } from "antd";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import "./style.css";

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
<<<<<<< HEAD
=======

>>>>>>> 1be8cca4cdb35eb4310c9ef577e643fc16b8fcb3
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

const accountMenuItems = [
  {
    label: (
      <NavLink className="nav-link" to="/account">
        Tài khoản
      </NavLink>
    ),
    key: "account",
  },
  {
    label: (
      <NavLink className="nav-link" to="/login">
        Đăng xuất
      </NavLink>
    ),
    key: "logout",
  },
];

export default function Header() {
  const { currentUser } = useContext(AuthContext);
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
        {currentUser ? (
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
            <Menu
              className="nav-menu nav-menu-right"
              selectedKeys={["0"]}
              mode="horizontal"
              items={accountMenuItems}
            />
          </Flex>
        )}
      </Col>
    </Row>
  );
}

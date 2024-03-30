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
      <NavLink className="nav-link" to="/register">
        Đăng ký
      </NavLink>
    ),
    key: "register",
  },
  {
    label: (
      <NavLink className="nav-link" to="/login">
        Đăng nhập
      </NavLink>
    ),
    key: "login",
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
          />
        </Flex>
      </Col>

      <Col sm={8}>
        {currentUser ? (
          "Hello"
        ) : (
          <Flex justify="flex-end">
            <Menu
              className="nav-menu nav-menu-right"
              selectedKeys={["0"]}
              mode="horizontal"
              items={mainAuthItems}
            />
          </Flex>
        )}
      </Col>
    </Row>
  );
}

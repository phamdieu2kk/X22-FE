import { Col, Flex, Menu, Row, Dropdown } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { UserOutlined } from "@ant-design/icons";

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
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    // Kiểm tra xem currentUser có giá trị không để định nghĩa trạng thái đăng nhập ban đầu
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleProfile = () => {
    
    navigate("/account");
  };

  const loggedMenu = (
    <Menu>
      <Menu.Item key="0" onClick={handleProfile}>
        Tài khoản
      </Menu.Item>
      <Menu.Item key="1" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

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
            src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-cat-esports-logo-design-gaming-mascot-png-image_5318669.jpg"
            className="brand-logo"
            alt="Logo"
          />
        </Flex>
      </Col>

      <Col sm={8}>
        {!isLoggedIn ? (
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
            <Dropdown
              overlay={loggedMenu}
              trigger={["hover"]}
              visible={menuVisible}
              onVisibleChange={setMenuVisible}
             
            >
              <a className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
               <UserOutlined
               style={{
                background: "none",
                width: "100%",
                color: "rgb(246, 236, 236)",
                textAlign: "center",
                padding: "15px",
                margin: " auto",
  }}
/>
              </a>
            </Dropdown>
          </Flex>
        )}
      </Col>
    </Row>
  );
}
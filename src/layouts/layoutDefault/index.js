import { NavLink, Outlet } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useCallback, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BookOutlined,
  MessageOutlined,
  TeamOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  InfoCircleOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import "./layoutDefault.scss";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Tài khoản",
    children: [
      {
        key: "1-1",
        icon: (
          <NavLink to="/user/information">
            <InfoCircleOutlined />
          </NavLink>
        ),
        label: "Thông tin tài khoản",
      },
      {
        key: "1-2",
        icon: (
          <NavLink to="/user/changePassword">
            <AuditOutlined />
          </NavLink>
        ),
        label: "Thay đổi mật khẩu tài khoản",
      },
      {
        key: "1-3",
        icon: (
          <NavLink to="/exam/statistics">
            <LineChartOutlined />
          </NavLink>
        ),
        label: "Thông kê bài làm",
      },
    ],
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: "Bạn bè",
    children: [
      {
        key: "3-1",
        icon: <MailOutlined />,
        label: "Lời mời kết bạn",
      },
      {
        key: "3-2",
        icon: <UsergroupAddOutlined />,
        label: "Danh sách bạn bè",
      },
      {
        key: "3-3",
        icon: <MessageOutlined />,
        label: "Tin nhắn",
      },
    ],
  },
  {
    key: "2",
    icon: (
      <NavLink to="/topics">
        <BookOutlined />
      </NavLink>
    ),
    label: "Chủ đề câu hỏi",
  },
];

function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);
  const [isExpanded, setExpended] = useState(false);

  const handleClick = useCallback((e) => {
    const element = document.querySelectorAll(".ant-menu-submenu-open");

    if (element.length > 1) {
      element.forEach((el) => {
        el.classList.remove("ant-menu-submenu-open");
      });
      e.target.classList.remove("ant-menu-submenu-open");
    } else if (element.length === 1) {
      setExpended(true);
    } else {
      const e = document.querySelector('div[aria-expanded="true"]');
      if (!e) {
        setExpended(false);
      }
    }
  }, []);

  const handleCollapse = () => {
    setExpended(false);
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout className="layout-default">
        <Sider
          className="layout-default__sider"
          trigger={true}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          width={isExpanded ? "20%" : "12%"}
          onClick={handleClick}
        >
          <div className="layout-default__logo">
            <NavLink to="/">
              <img
                className="aligh-center"
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt="logo"
              />
            </NavLink>
          </div>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["1-1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            className="layout-default__header"
            style={{
              padding: 0,
              background: "#fff",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleCollapse}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <span className="layout-default__header--box">
              {true ? (
                <>
                  <NavLink to="/user/login">Đăng nhập</NavLink>
                  <NavLink to="/user/register">Đăng ký</NavLink>
                </>
              ) : (
                <NavLink to="/user/logout">Đăng xuất</NavLink>
              )}
            </span>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: "5px",
            }}
          >
            <main className="layout-default__main">
              <Outlet />
            </main>
          </Content>
          <Footer
            className="layout-default__footer"
            style={{
              textAlign: "center",
            }}
          >
            Foxy ©{new Date().getFullYear()} Created by Tan
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutDefault;

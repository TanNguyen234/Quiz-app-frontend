import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { createContext, useCallback, useState } from "react";
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
  UserAddOutlined,
} from "@ant-design/icons";
import "./layoutDefault.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/user";
import Search from "antd/es/input/Search";

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
          <NavLink to="/user/profile">
            <InfoCircleOutlined />
          </NavLink>
        ),
        label: "Thông tin tài khoản",
      },
      {
        key: "1-2",
        icon: (
          <NavLink to="/user/forgot-password">
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
        icon: (
          <NavLink to="/user/findFriend">
            <UserAddOutlined />
          </NavLink>
        ),
        label: "Danh sách người dùng",
      },
      {
        key: "3-2",
        icon: (
          <NavLink to="/user/requestFriend">
            <MailOutlined />
          </NavLink>
        ),
        label: "Lời mời kết bạn",
      },
      {
        key: "3-3",
        icon: (
          <NavLink to="/user/friends">
            <UsergroupAddOutlined />
          </NavLink>
        ),
        label: "Danh sách bạn bè",
      },
      {
        key: "3-4",
        icon: (
          <NavLink to="/chat/1">
            <MessageOutlined />
          </NavLink>
        ),
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

const itemsPublic = [
  {
    key: "1",
    icon: (
      <NavLink to="/topics">
        <BookOutlined />
      </NavLink>
    ),
    label: "Chủ đề câu hỏi",
  },
];

// const itemsAdmin = [
//   {
//     key: "3",
//     icon: (
//       <NavLink to="/admin/topics">
//         <DiffOutlined />
//       </NavLink>
//     ),
//     label: "Quản lý chủ đề",
//   },
//   {
//     key: "4",
//     label: "Quản lý câu hỏi",
//     icon: (
//       <NavLink to="/admin/questions">
//         <QuestionOutlined />
//       </NavLink>
//     ),
//   },
//   {
//     key: "5",
//     icon: (
//       <NavLink to="/admin/users">
//         <UserSwitchOutlined />
//       </NavLink>
//     ),
//     label: "Quản lý users",
//   },
//   {
//     key: "6",
//     icon: (
//       <NavLink to="/admin/accounts">
//         <BookOutlined />
//       </NavLink>
//     ),
//     label: "Quản lý admins",
//   },
// ];

export const searchContext = createContext();

function LayoutDefault() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userReducer.state);

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [isExpanded, setExpended] = useState(false);
  const [openKeys, setOpenKeys] = useState(null);
  const [dataSearch, setDataSearch] = useState(null);

  const onSearch = (e) => {
    if(e.type === 'change') {
      const value = e.target.value
      setDataSearch(value);
    } else {
      setDataSearch(e);
    }
  };

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

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
    if (!collapsed) {
      setOpenKeys([]); // Đóng submenu
    }
  };

  return (
    <>
      <Layout className="layout-default" style={{ minHeight: "100vh" }}>
        <Sider
          className="layout-default__sider"
          trigger={null}
          breakpoint="lg"
          collapsible
          collapsed={collapsed}
          width={isExpanded ? "20%" : "12%"}
          onClick={handleClick}
        >
          <NavLink to="/">
            <div className="layout-default__logo">
              <img className="aligh-center" src="/images/logo.svg" alt="logo" />
            </div>
          </NavLink>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["1-1"]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={isLogin ? items : itemsPublic}
          />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 190,
            transition: "margin 0.3s ease-in-out",
          }}
        >
          <Header
            className="layout-default__header"
            style={{
              padding: 0,
              position: "fixed",
              zIndex: 100,
              top: 0,
              left: 0,
              width: "100vw",
              overflow: "auto",
            }}
          >
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ fill: "#fff" }} />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={handleCollapse}
              style={{
                marginLeft: collapsed ? 90 : 190,
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            {location.pathname === "/user/findFriend" && (
              <div className="layout-default__box--search">
                <Search
                  onChange={(e) => onSearch(e)}
                  onSearch={onSearch}
                  className="layout-default__search"
                  placeholder="Nhập id hoặc tên người dùng"
                  enterButton
                />
                <div className="layout-default__inner-suggest">
                  <div className="layout-default__inner-list"></div>
                </div>
              </div>
            )}
            <span className="layout-default__header--box">
              {isLogin ? (
                <NavLink onClick={() => dispatch(logout())} to="/">
                  Đăng xuất
                </NavLink>
              ) : (
                <>
                  <NavLink to="/user/login">Đăng nhập</NavLink>
                  <NavLink to="/user/register">Đăng ký</NavLink>
                </>
              )}
            </span>
          </Header>
          <Content
            style={{
              margin: "64px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: "5px",
            }}
          >
            <main className="layout-default__main">
              <searchContext.Provider value={{ dataSearch }}>
                <Outlet/>
              </searchContext.Provider>
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

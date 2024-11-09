import { NavLink, Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./formLayout.scss";

const { Header, Content, Footer } = Layout;

function FormLayout() {
  return (
    <>
      <Layout className="form-layout">
        <Header
          className="form-layout__header"
          style={{
            padding: 0,
            background: "#fff",
          }}
        >
          <NavLink to="/">
          <div className="form-layout__logo">
              <img
                className="aligh-center"
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt="logo"
              />
          </div>
          </NavLink>
          <span className="form-layout__header--box">
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
          className="container"
        >
          <main className="form-layout__main">
            <Outlet />
          </main>
        </Content>
        <Footer
          className="form-layout__footer"
          style={{
            textAlign: "center",
          }}
        >
          Foxy ©{new Date().getFullYear()} Created by Tan
        </Footer>
      </Layout>
    </>
  );
}

export default FormLayout;
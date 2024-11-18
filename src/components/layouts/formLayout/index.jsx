import { NavLink, Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./formLayout.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/user";

const { Header, Content, Footer } = Layout;

function FormLayout() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.userReducer.state)
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
                src="/images/logo.svg"
                alt="logo"
              />
              <span>FOXY</span>
          </div>
          </NavLink>
          <span className="form-layout__header--box">
            {state ? (
              <NavLink onClick={() => dispatch(logout())}>Đăng xuất</NavLink>
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
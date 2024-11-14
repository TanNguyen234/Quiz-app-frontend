/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input } from "antd";
import "./login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { post } from "../../untils/request";
import { setCookie } from "../../helpers/cookie";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const form = document.querySelector("#login");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = e.target.elements[0].value;
        const password = e.target.elements[1].value;
        //Login
        const options = {
          email: email,
          password: password,
        };
        const fetchApi = async () => {
          const user = await post("user/login", options);
          if(user.code === 200) {
            setCookie("token", user.data.token);
            navigate('/')
          } else {
             
          }
        };
        fetchApi();
        // Dọn dẹp sự kiện khi component unmount
        return () => {
          if (form) form.removeEventListener("submit", fetchApi);
        };
        //End Login
      });
    }
  }, []);

  return (
    <>
      <div
        className="containerLogin"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Form
          className="form-login"
          name="login"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item>
            <h2 className="form-login__title">Đăng nhập</h2>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              className="form-login__input"
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className="form-login__input"
              type="password"
              placeholder="password"
              hasFeedback
            />
          </Form.Item>
          <Form.Item>
            <Button className="form-login__btn" block htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <button className="form-login__content">
          <h2> Chào mừng trở lại</h2>
          <p>
            Chúng tôi rất vui khi bạn quay trở lại. Chúng tôi hy vọng bạn đã có
            một khoảng thời gian thật an toàn và vui vẻ{" "}
          </p>
          <NavLink to="/user/register">
            <div class="register-link">
              Bạn chưa có tài khoản? <span>Đăng Ký ngay</span>
            </div>
          </NavLink>
        </button>
      </div>
    </>
  );
}

export default Login;
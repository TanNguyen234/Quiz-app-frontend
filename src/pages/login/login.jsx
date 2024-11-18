/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input } from "antd";
import "./login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import { userValidationLogin } from "../../validates/user.validate";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;

    if (userValidationLogin(email, password)) {
      alert("Email và mật khẩu không đúng!");
      return;
    }

    //Login
    const result = await dispatch(login(email, password, navigate));

    if (!result.success) {
      alert(result.message);
    } else {
      localStorage.setItem('isAuthenticated', JSON.stringify(true))
    }
  };

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
          onFinish={onFinish}
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

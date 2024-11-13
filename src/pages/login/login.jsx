import { Button, Form, Input } from "antd";
import "./login.scss"

function Login() {
  const form = document.querySelector("#login");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target.value[0].value;
      const password = e.target.value[1].value;

      if (!email || !password) {
        alert("All fields are required");
        return;
      }
    });
  }

  return (
    <>
      <div
        className="containerLogin"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Form
          className="form"
          name="login"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item>
            <h2 className="form__title">Đăng nhập</h2>
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
            <Input className="form__input" placeholder="Email" type="email" />
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
              className="form__input"
              type="password"
              placeholder="password"
              hasFeedback
            />
          </Form.Item>
          <Form.Item>
            <Button className="form__btn" block htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <button className="form__content">
          <h2> Chào mừng trở lại</h2>
          <p>
            Chúng tôi rất vui khi bạn quay trở lại. Chúng tôi hy vọng bạn đã có
            một khoảng thời gian thật an toàn và vui vẻ{" "}
          </p>
          <a href="/user/register">
            <div class="register-link">
              Bạn chưa có tài khoản? <span>Đăng Ký ngay</span>
            </div>
          </a>
        </button>
      </div>
    </>
  );
}

export default Login;

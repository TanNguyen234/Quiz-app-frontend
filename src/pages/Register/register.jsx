import { Button, Form, Input } from "antd";
import "./register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { userValidationRegister } from "../../validates/user.validate";
import { useDispatch } from "react-redux";
import { register } from "../../actions/user";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { fullName, email, password, confirmPassword } = values;

    if (userValidationRegister(fullName, email, password, confirmPassword)) {
      alert('Please fill all the required fields')
      return;
    }
    
    const result = await dispatch(register(fullName, email, password, navigate))

    if(!result.success) {
      alert(result.message)
    } else {
      localStorage.setItem('isAuthenticated', JSON.stringify(true))
    }
  }
  return (
    <>
      <div
        className="containerRegister"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <button className="form-register__content">
          <h2> Chào mừng bạn đến website</h2>
          <p>
            Chúng tôi rất vui khi bạn khi bạn đã quan tâm. Chúng tôi hy vọng bạn
            sẽ có một khoảng thời gian thật an toàn và vui vẻ{" "}
          </p>
          <NavLink to="/user/login">
            <div class="register-link">
              Bạn đã có tài khoản? <span>Đăng nhập</span>
            </div>
          </NavLink>
        </button>
        <Form
          onFinish={onFinish}
          className="form-register"
          name="register"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item>
            <h2 className="form-register__title">Đăng ký</h2>
          </Form.Item>
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input
              placeholder="Full Name"
              className="form-register__input"
              type="text"
            />
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
              placeholder="Email"
              className="form-register__input"
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
              type="password"
              placeholder="password"
              hasFeedback
              className="form-register__input"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please do match with your password!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Confirm your password"
              hasFeedback
              className="form-register__input"
            />
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" className="form-register__btn">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Register;

import { Button, Form, Input } from "antd";
import "./login.scss";

function Login() {
  const form = document.querySelector('#login')
  if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = e.target.value[0].value
        const password = e.target.value[1].value

        if(!email || !password) {
            alert('All fields are required')
            return
        }
     })
  }

  return (
    <>
      <Form
        className="form"
        name="login"
        initialValues={{
          remember: true,
        }}
      > 
        <Form.Item>
          <h2 className="form__title">Login Form</h2>
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
          <Button className="form__btn" block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
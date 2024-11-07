import { Button, Form, Input } from "antd";
import "./register.scss";

function Register() {
  const form = document.querySelector('#register')
  if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = e.target.value[0].value
        const password = e.target.value[1].value
        const confirmPassword = e.target.value[2].value
        
        if(password!== confirmPassword) {
          alert('Passwords do not match')
          return
        }

        if(!email || !password || !confirmPassword) {
            alert('All fields are required')
            return
        }
     })
  }

  return (
    <>
      <Form
        className="regiter-form"
        name="register"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email" type="email" />
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
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Confirm your password"
            hasFeedback
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Register;

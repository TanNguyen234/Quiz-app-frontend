/* eslint-disable react-hooks/exhaustive-deps */
import './forgotPassword.scss';
import { Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { patch } from '../../untils/request';
import swal from "sweetalert";

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  if(location.state?.email){
    localStorage.setItem('email', location.state.email);
  }
  const email = localStorage.getItem('email');

  const onFinish = async (values) => {
    const { password } = values
    try {
        const change = await patch('user/password/change', {
          email,
          password
        })
        console.log(change)

        if(change.code === 400) {
            throw new Error("error");
        } else if (change.code === 200) {
            navigate('/user/login')
        }
    } catch (error) {
        swal("Có gì đó không hợp lệ vui lòng thử lại sao")
    }
  }

  return (
    <>
        <Form
          onFinish={onFinish}
          className="form"
          name="register"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item>
            <h2 className="form__title">Thay đổi mật khẩu</h2>
          </Form.Item>
          <Form.Item
            name="email"
            initialValues={email}
          >
            <Input
              placeholder="Email"
              className="form__input"
              type="email"
              disabled
              defaultValue={email}
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
              className="form__input"
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
              className="form__input"
            />
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" className="form__btn">
              Thay đổi
            </Button>
          </Form.Item>
        </Form>
    </>
  );
}

export default ChangePassword;
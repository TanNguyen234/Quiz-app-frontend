/* eslint-disable react-hooks/exhaustive-deps */
import './forgotPassword.scss';
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useState } from 'react';
import swal from 'sweetalert';
import { post } from '../../untils/request';

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const onFinish = async (values) => {
    const { email, otp } = values;
    try {
      const checkOTP = post('user/checkOTP', {
        email,
        otp
      })

      if(checkOTP.code === 400) {
        throw new Error('OTP không đúng');
      }
      
      navigate('/user/change-password', {state: { email: email}})
    } catch (error) {
      swal({
        title: "Lỗi",
        text: "Email hoặc mã OTP không hợp lệ",
        icon: "error",
      })
    }
  };

  const sendOTP = async () => {
    if(!loading) {
        try {
            const values = await form.validateFields(['email'])
            await post('user/password/otp', { email: values.email });
            swal("Mã OTP đã gửi đến email: "+ values.email+". Vui lòng kiểm tra email");
        } catch (error) {
            swal("Vui lòng nhập email");
            return;
        }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 30000)
  }

  return (
    <>
        <Form
          form={form}
          className="form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item>
            <h2 className="form__title">Xác thực email</h2>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          > 
            <Input
              className="form__input"
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã OTP!",
              },
            ]}
          >
            <Input
              className="form__input"
              type="text"
              placeholder="otp"
              hasFeedback
            />
          </Form.Item>
          <Button className="form__btn--otp" onClick={sendOTP} loading={loading}>
             Gửi mã OTP
            </Button>
          <Form.Item>
            <Button className="form__btn" block htmlType="submit">
             Xác thực
            </Button>
          </Form.Item>
        </Form>
    </>
  );
}

export default ForgotPassword;
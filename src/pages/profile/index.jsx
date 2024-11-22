import "./profile.scss";
import { Avatar, Col, Empty, Form, Input, Row } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { auth } from "../../untils/request";
import { getCookie } from "../../helpers/cookie";

function Profile() {
  const [info, setInfo] = useState(null);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await auth("user/detail", getCookie("token"));
      if (response.code === 200) {
        setInfo(response.data);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {info ? (
        <Row className="profile" gutter={20}>
          <Col span={10} className="profile__infor">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<AntDesignOutlined />}
            />
            <Form disabled onFinish={onFinish}>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  placeholder="fullName"
                  className="profile__input"
                  variant="borderless"
                  type="text"
                  defaultValue={info.fullName}
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
                  className="profile__input"
                  placeholder="Email"
                  variant="borderless"
                  type="email"
                  defaultValue={info.email}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={10} className="profile__achievement"></Col>
        </Row>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default Profile;

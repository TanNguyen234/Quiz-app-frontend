import "./profile.scss";
import { Avatar, Button, Col, Empty, Form, Input, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { auth } from "../../untils/request";
import { getCookie } from "../../helpers/cookie";

function Profile() {
  const [info, setInfo] = useState(null);
  const [edit, setEdit] = useState(true);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await auth("user/detail", getCookie("token"));
      if (response.code === 200) {
        setInfo(response.data);
        console.log(info)
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {info ? (
        <Row className="profile" gutter={20}>
          <Col span={10} className="profile__infor">
            <div className="profile__avatar"><Avatar shape="square" size={200} src='https://s.yimg.com/fz/api/res/1.2/cRBKAk0t85azLk6FjuUtnA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7Zm9ybWF0PXdlYnA7aD0zODA7cHhvZmY9NTA7cHlvZmY9MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/acaa4b81-c559-38d3-946f-7d1eb829cd32/t_1024x1024.cf.webp' /></div>
            <Form className="profile_form" disabled={edit} onFinish={onFinish}>
            <Form.Item
                name="id"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="id: "
                style={{color: 'white'}}
              >
                <Input
                  placeholder="id"
                  className="profile__input"
                  variant="borderless"
                  type="text"
                  disabled
                  defaultValue={info.id}
                />
              </Form.Item>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
                label="User Name: "
                style={{color: 'white'}}
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
                label="Email: "
                style={{color: 'white'}}
              >
                <Input
                  className="profile__input"
                  placeholder="Email"
                  variant="borderless"
                  type="email"
                  defaultValue={info.email}
                />
              </Form.Item>
              <Form.Item>
                <Button disabled={false} color="white">Edit</Button>
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
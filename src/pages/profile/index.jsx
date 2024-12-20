import "./profile.scss";
import { Avatar, Button, Col, Empty, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { auth } from "../../untils/request";
import { getCookie } from "../../helpers/cookie";
import swal from "sweetalert";

function Profile() {
  const [info, setInfo] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(edit)
    console.log("Received values of form: ", values);
    setEdit(false)
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await auth("user/detail", getCookie("token"));
      if(response.code === 200) {
        setInfo(response.data);
      }
    };
    fetchApi();
  }, []);

  const handleSubmit = () => {
    swal("Bạn có chắc muốn lưu thông tin đã thay đổi?", {
      buttons: ["Không", "Có"],
    })
     .then((value) => {
      if(value) {
        form.submit()
      }
     })
  }

  return (
    <>
      {info ? (
        <Row className="profile" gutter={20}>
          <Col span={10} className="profile__infor">
            <div className="profile__avatar">
              <Avatar
                shape="square"
                src={info.avatar ? info.avatar : "/images/fate.webp"}
              />
            </div>
            <Form form={form} className="profile_form" disabled={!edit} onFinish={onFinish}>
              <Form.Item
                name="id"
                rules={[
                  {
                    required: false,
                  },
                ]}
                label="id: "
                style={{ color: "white" }}
              >
                <Input
                  placeholder="id"
                  className="profile__input"
                  variant="borderless"
                  type="text"
                  disabled={true}
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
                style={{ color: "white" }}
              >
                <Input
                  placeholder="fullName"
                  className="profile__input"
                  variant="borderless"
                  type="text"
                  disabled={!edit}
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
                style={{ color: "white" }}
              >
                <Input
                  className="profile__input"
                  placeholder="Email"
                  variant="borderless"
                  type="email"
                  disabled={!edit}
                  value={info.email}
                  defaultValue={info.email}
                />
              </Form.Item>
              {edit ? (
                <>
                  <Form.Item>
                    <Button disabled={false} color="primary" variant="primary" onClick={() => handleSubmit()}>Lưu thay đổi</Button>
                    <Button disabled={false} onClick={()=>setEdit(false)} color="white">Hủy</Button>
                  </Form.Item>
                </>
              ) : (
                <Form.Item>
                  <Button disabled={false} onClick={()=>setEdit(true)} color="white">Chỉnh sửa</Button>
                </Form.Item>
              )}
            </Form>
          </Col>
        </Row>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default Profile;

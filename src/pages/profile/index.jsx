import "./profile.scss";
import {
  Avatar,
  Button,
  Col,
  Empty,
  Form,
  Image,
  Input,
  Row,
  Tooltip,
  Upload,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { auth } from "../../untils/request";
import { getCookie } from "../../helpers/cookie";
import swal from "sweetalert";
import dayjs from "dayjs";
import { getAnswers } from "../../services/getAnswers";
import { PlusOutlined } from "@ant-design/icons";
import { changeInfo } from "../../services/changeInfo";

function Profile() {
  const [info, setInfo] = useState(null);
  const [edit, setEdit] = useState(false);
  const [totalTest, setTotalTest] = useState(0);
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const onFinish = async (values) => {
    const formData = {};
    if(values.fullName) {
      formData['fullName'] = values.fullName;
    }
    if(values.email) {
      formData['email'] = values.email;
    }
    if(Object.keys(formData).length === 0) {
      swal({
        title: "Thông báo!",
        text: "Bạn chưa thay đổi thông tin nào cả!",
        icon: "warning",
        button: "Đã hiểu!",
      });
      setEdit(false);
      return;
    }
    const state = await changeInfo(formData)
    if(state) {
      swal({
        title: "Thông báo!",
        text: "Bạn đã cập nhật ảnh đại diện thành công!",
        icon: "success",
        button: "ok!",
      });
    } else {
      swal({
        title: "Thông báo!",
        text: "Bạn đã cập nhật ảnh đại diện thất bại!",
        icon: "error",
        button: "Đã hiểu!",
      });
    }
    setEdit(false);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await auth("user/detail", getCookie("token"));
      if (response.code === 200) {
        setInfo(response.data);
      }
      const total = await getAnswers();
      setTotalTest(total.length);
    };
    fetchApi();
  }, []);

  const handleSubmit = () => {
    swal("Bạn có chắc muốn lưu thông tin đã thay đổi?", {
      buttons: ["Không", "Có"],
    }).then((value) => {
      if (value) {
        form.submit();
      }
    });
  };
  //Avatar
  const onChange = async ({ fileList: newFileList }) => {
    const formData = {};
    formData['avatar'] = newFileList[0];
    const state = await changeInfo(formData)
    if(state) {
      swal({
        title: "Thông báo!",
        text: "Bạn đã cập nhật ảnh đại diện thành công!",
        icon: "success",
        button: "ok!",
      });
    } else {
      swal({
        title: "Thông báo!",
        text: "Bạn đã cập nhật ảnh đại diện thất bại!",
        icon: "error",
        button: "Đã hiểu!",
      });
    }
    setFileList([]);
  };

  const previewSentImage = useCallback((url) => {
    const domain = process.env.REACT_APP_PATH || "http://localhost:3000" + url;
    setPreviewImage(domain);
    setPreviewOpen(true);
  }, []);
  //End Avatar

  return (
    <>
      {info ? (
        <Row className="profile" gutter={20}>
          <Col
            xxl={10}
            xl={10}
            lg={12}
            md={14}
            sm={16}
            xs={20}
            className="profile__infor"
          >
            <div className="profile__avatar">
              <Avatar
                shape="square"
                src={info.avatar ? info.avatar : "/images/fate.webp"}
              />
              <div className="profile__avatar--mini">
                <img
                  src={info.avatar ? info.avatar : "/images/fate.webp"}
                  alt="avatar"
                  onClick={() =>
                    previewSentImage(
                      info.avatar ? info.avatar : "/images/fate.webp"
                    )
                  }
                />
                <Tooltip placement="topRight" title={"Cập nhật ảnh đại diện"}>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    accept="image/*"
                    style={{ zIndex: 9999 }}
                  >
                    {fileList.length === 1 ? null : <PlusOutlined />}
                  </Upload>
                </Tooltip>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </div>
            <div className="profile__group">
              <Form
                form={form}
                className="profile__form"
                disabled={!edit}
                onFinish={onFinish}
              >
                <Form.Item name="id" label="id: " style={{ color: "white" }}>
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
                  label="Email: "
                  style={{ color: "white" }}
                >
                  <Input
                    className="profile__input"
                    placeholder="Email"
                    variant="borderless"
                    type="email"
                    disabled={!edit}
                    defaultValue={info.email}
                  />
                </Form.Item>
                {edit ? (
                  <>
                    <Form.Item>
                      <Button
                        disabled={false}
                        color="primary"
                        variant="primary"
                        onClick={() => handleSubmit()}
                      >
                        Lưu thay đổi
                      </Button>
                      <Button
                        disabled={false}
                        onClick={() => setEdit(false)}
                        color="white"
                      >
                        Hủy
                      </Button>
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item>
                    <Button
                      disabled={false}
                      onClick={() => setEdit(true)}
                      color="white"
                    >
                      Chỉnh sửa
                    </Button>
                  </Form.Item>
                )}
              </Form>
              <div className="profile__statistic">
                <div className="profile__statistic--item">
                  <p>
                    Ngày tạo tài khoản:{" "}
                    {dayjs(info.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="profile__statistic--item">
                  <p>Tổng số bài đã làm: {totalTest}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default Profile;

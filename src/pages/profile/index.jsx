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
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { auth } from "../../untils/request";
import { getCookie } from "../../helpers/cookie";
import swal from "sweetalert";
import dayjs from "dayjs";
import { getAnswers } from "../../services/getAnswers";
import { PlusOutlined } from "@ant-design/icons";
import { changeFile, changeInfo } from "../../services/changeInfo";

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
    if (values.fullName && (values.fullName !== info.fullName)) {
      formData["fullName"] = values.fullName;
    }
    if (values.email && (values.email !== info.email)) {
      formData["email"] = values.email;
    }
    if (Object.keys(formData).length === 0) {
      swal({
        title: "Thông báo!",
        text: "Bạn chưa thay đổi thông tin nào cả!",
        icon: "warning",
        button: "Đã hiểu!",
      });
      setEdit(false);
      return;
    }
    console.log(formData);
    const state = await changeInfo(formData);
    if (state) {
      swal({
        title: "Thông báo!",
        text: "Bạn đã cập nhật thông tin thành công!",
        icon: "success",
        button: "ok!",
      });
      fetchApi();
    } else {
      swal({
        title: "Thông báo!",
        text: "Bạn đã cập nhật thông tin thất bại!",
        icon: "error",
        button: "Đã hiểu!",
      });
      form.resetFields();
    }
    setEdit(false);
  };

  const fetchApi = async () => {
    try {
      const response = await auth("user/detail", getCookie("token"));
      if (response.code === 200) {
        setInfo(response.data);
      }
      const total = await getAnswers();
      setTotalTest(total.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleSubmit = () => {
    swal("Bạn có chắc muốn lưu thông tin đã thay đổi?", {
      buttons: ["Không", "Có"],
    }).then((value) => {
      if (value) {
        onFinish(form.getFieldsValue())
      }
    });
  };
  const resetBtn = () => {
    setEdit(false);
    form.resetFields();
  };
  //Avatar
  const handleCustomRequest = async (options) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("avatar",file);
    const state = await changeFile(formData);
    if (state) {
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
    fetchApi();
  };

  const previewSentImage = (url) => {
    if(info) {
      const link = info.avatar ? url : process.env.REACT_APP_PATH + url
      setPreviewImage(link);
      setPreviewOpen(true);
    }
  };
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
                <ImgCrop rotationSlider showReset={true} aspect={3} aspectSlider={true} grid={true} modalTitle="Cập nhật ảnh đại diện">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    customRequest={handleCustomRequest}
                    accept="image/*"
                    style={{ zIndex: 9999 }}
                  >
                    {fileList.length === 1 ? null : <PlusOutlined />}
                  </Upload>
                </ImgCrop>
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
                initialValues={{
                  id: info.id,
                  fullName: info.fullName,
                  email: info.email,
                }}
              >
                <Form.Item name="id" label="id: " style={{ color: "white" }}>
                  <Input
                    placeholder="id"
                    className="profile__input"
                    variant="borderless"
                    type="text"
                    disabled={true}
                  />
                </Form.Item>
                <Form.Item
                  name="fullName"
                  label="User Name: "
                  style={{ color: "white" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Tên hiển thị!",
                    },
                  ]}
                >
                  <Input
                    placeholder="fullName"
                    className="profile__input"
                    variant="borderless"
                    type="text"
                    disabled={!edit}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email: "
                  style={{ color: "white" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                >
                  <Input
                    className="profile__input"
                    placeholder="Email"
                    variant="borderless"
                    type="email"
                    disabled={!edit}
                  />
                </Form.Item>
                {edit ? (
                  <>
                    <Form.Item>
                      <Button
                        disabled={false}
                        type="primary"
                        variant="primary"
                        onClick={() => handleSubmit()}
                        style={{ marginRight: 10 }}
                        htmlType="submit"
                      >
                        Lưu thay đổi
                      </Button>
                      <Button
                        disabled={false}
                        onClick={() => resetBtn()}
                        color="white"
                        htmlType="reset"
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
                      Cập nhật thông tin
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

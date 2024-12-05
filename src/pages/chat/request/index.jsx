import { Avatar, Button, Col, Empty, message, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { getRequestFriend } from "../../../services/getUser";
import { Link } from "react-router-dom";
import CancelRequest from "./cancelRequest";
import { acceptRequest, denyRequest } from "../../../helpers/socketHelpers";

function Request() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("accept");

  const [messageApi, contextHolder] = message.useMessage();
  const messageAntd = (type) => {
    messageApi.open({
      type: type === "accept" ? "success" : "error",
      content:
        type === "accept" ? "Đã đồng ý kết bạn" : "Đã hủy yêu cầu kết bạn",
    });
  };

  const handleDenyRequest = (userId, index) => {
    denyRequest(userId);
    const item = document.querySelector(`#item-${index}`)
    if(item) {
      item.style.display = 'none';
      messageAntd("deny");
    }
  };

  const handleAcceptRequest = (userId, index) => {
    acceptRequest(userId);
    const item = document.querySelector(`#item-${index}`)
    if(item) {
      item.style.display = 'none';
      messageAntd("accept");
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      const users = await getRequestFriend(type);
      setData(users);
    };
    fetchApi();
  }, [type]);

  return (
    <>
      {contextHolder}
      <Row className="user" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col style={{ width: "100%", marginBottom: "10px" }}>
          <Button
            onClick={() => setType("accept")}
            style={{
              background: type === "accept" ? "#0b0c10" : "",
              color: type === "accept" ? "#fff" : "",
            }}
          >
            Danh sách lời mời kết bạn
          </Button>
          <Button
            onClick={() => setType("request")}
            style={{
              background: type === "request" ? "#0b0c10" : "",
              color: type === "request" ? "#fff" : "",
            }}
          >
            Danh đã gửi yêu cầu kết bạn
          </Button>
        </Col>
        {data.length > 0 ? (
          data.map((user, index) => (
            <Col
              key={user._id}
              xxl={type === "accept" ? 9 : 7}
              xl={type === "accept" ? 11 : 9}
              lg={type === "accept" ? 14 : 12}
              md={type === "accept" ? 20 : 16}
              sm={type === "accept" ? 24 : 20}
              xs={24}
              className="user__item"
              id={`item-${index}`}
            >
              <div className="user__avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <Avatar size={64} icon={<UserOutlined />} />
                )}
              </div>
              <div className="user__content">
                <div className="user__name">{user.fullName}</div>
                <div className="user__btn">
                  {type === "request" ? (
                    <>
                      <CancelRequest id={user._id} />
                      <Link to={`/user/info/${user._id}`}>
                        <Button className="user__btn--info">
                          Xem thông tin
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        onClick={() => handleAcceptRequest(user._id, index)}
                      >
                        Chấp nhận
                      </Button>
                      <Button
                        color="danger"
                        variant="solid"
                        onClick={() => handleDenyRequest(user._id, index)}
                      >
                        Từ chối
                      </Button>
                      <Link to={`/user/info/${user._id}`}>
                        <Button className="user__btn--info">
                          Xem thông tin
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            style={{
              margin: "10px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            description={
              <Typography.Text>Không có yêu cầu nào</Typography.Text>
            }
          />
        )}
      </Row>
    </>
  );
}

export default Request;

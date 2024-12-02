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
  const btnRef = useRef(null);

  const [messageApi, contextHolder] = message.useMessage();
  const messageAntd = (type) => {
    if (type === "accept") {
      messageApi.open({
        type: "success",
        content: "Đã đồng ý kết bạn",
      });
    } else if (type === "deny") {
      messageApi.open({
        type: "error",
        content: "Đã hủy yêu cầu kết bạn",
      });
    }
  };

  const handleDenyRequest = (userId) => {
    const btn = btnRef.current;
    if(btn) {
      const parent = btn.closest('.user__item');
      if(parent) {
        denyRequest(userId);
        parent.style.display = 'none';
        messageAntd("deny");
      }
    }
  };

  const handleAcceptRequest = (userId) => {
    const btn = btnRef.current;
    if(btn) {
      const parent = btn.closest('.user__item');
      if(parent) {
        acceptRequest(userId);
        parent.style.display = 'none';
        messageAntd("accept");
      }
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
      <Row
        className="user"
        gutter={[20, 20]}
      >
        <Col style={{ width: "100%" }}>
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
          data.map((user) => (
            <Col
              key={user._id}
              span={type === "accept" ? 9 : 7}
              className="user__item"
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
                      <Button ref={btnRef} type="primary" onClick={() => handleAcceptRequest(user._id)}>Chấp nhận</Button>
                      <Button ref={btnRef} color="danger" variant="solid" onClick={() => handleDenyRequest(user._id)}>
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

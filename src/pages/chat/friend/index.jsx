import { useEffect, useState } from "react";
import "./style.scss";
import { getFriends } from "../../../services/getUser";
import { Avatar, Button, Empty, Typography, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import CancelFriend from "./cancelFriend";
import { getSocket, statusUser } from "../../../helpers/socketHelpers";
import { useSelector } from "react-redux";

function Friend() {
  const id = useSelector(state => state.userReducer.id);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const friends = await getFriends();
      console.log(friends, id)
      setData(friends);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    statusUser()
    return () => {
      const socket = getSocket();
      socket.off('SERVER_RETURN_USER_STATUS_ONLINE')
    }
  }, [])

  return (
    <>
      {data.length > 0 ? (
        <Row className="user" gutter={[20, 20]}>
          {data.map((user) =>
            user.statusOnline ? (
              <Col
                key={user._id}
                className="user__item"
                xxl={9}
                xl={12}
                lg={15}
                md={20}
                sm={24}
                xs={24}
                user-id={user.id}
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
                    {user.friendList.map((item) => 
                    ( 
                      item.user_id === id ? <Link to={`/chat/${item.room_chat_id}`}>
                      <Button
                        className="user__btn--info"
                        color="primary"
                        variant="solid"
                      >
                        Nhắn tin
                      </Button>
                  </Link> : <></>
                    ))}
                    <CancelFriend id={user._id} />
                    <Link to={`/user/info/${user._id}`}>
                      <Button className="user__btn--info">Xem thông tin</Button>
                    </Link>
                  </div>
                </div>
                <div class='inner-status' status={user.statusOnline}></div>
              </Col>
            ) : (
              <></>
            )
          )}
        </Row>
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
            <Typography.Text>
              Hãy kết thêm bạn để tăng hiệu quả học tập nhé!
            </Typography.Text>
          }
        />
      )}
    </>
  );
}

export default Friend;

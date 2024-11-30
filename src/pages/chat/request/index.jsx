import { Avatar, Button, Col, Empty, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";
import { useEffect, useState } from "react";
import { getRequestFriend } from "../../../services/getUser";
import { Link } from "react-router-dom";

function Request() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("request");
  useEffect(() => {
    const fetchApi = async () => {
      const users = await getRequestFriend(type);
      setData(users);
    };
    fetchApi();
  }, [type]);

  return (
    <>
      <Row className="user" gutter={[20, 20]}>
        <Col style={{ width: "100%" }}>
          <Button onClick={() => setType("request")}>
            Danh sách lời mời kết bạn
          </Button>
          <Button onClick={() => setType("accept")}>
            Danh đã gửi yêu cầu kết bạn
          </Button>
        </Col>
        {data.length > 0 ? (
          data.map((user) => (
            <Col key={user._id} span={8} className="user__item">
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
                      <Button type="primary">Chấp nhận</Button>
                      <Button color="danger" variant="solid">
                        Xóa
                      </Button>
                      <Link to={`/user/info/${user._id}`}>
                        <Button className="user__btn--info">
                          Xem thông tin
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Button type="danger">Xóa</Button>
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
            style={{ margin: "10px" , position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}
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

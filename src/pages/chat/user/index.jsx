import { Avatar, Button, Col, Empty, Row, Typography } from "antd";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { searchContext } from "../../../components/layouts/layoutDefault";
import { getUser } from "../../../services/getUser";
import { Link } from "react-router-dom";
import AddUser from "./addUser";
import { useSelector } from "react-redux";

function User() {
  const id = useSelector((state) => state.userReducer.id);
  const [data, setData] = useState([]);
  const { dataSearch } = useContext(searchContext);
  useEffect(() => {
    const fetchApi = async () => {
      const users = dataSearch ? await getUser(dataSearch) : await getUser();
      if (users) {
        setData(users);
        console.log(users);
      }
    };
    fetchApi();
  }, [dataSearch]);

  const handleBtn = (friendList) => {
    for (let i = 0; i < friendList.length; i++) {
      if (friendList[i].user_id === id) {
        return (
          <Link to={`/chat/` + friendList[i].room_chat_id}>
            <Button className="user__btn--info" color="primary" variant="solid">
              Nhắn tin
            </Button>
          </Link>
        );
      }
      if (i === friendList.length - 1) {
        return <AddUser id={friendList[i]._id} />;
      }
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <Row className="user" gutter={[20, 20]}>
          {data.map((user) => (
            <Col
              key={user._id}
              xxl={8}
              xl={8}
              lg={12}
              md={16}
              sm={20}
              xs={24}
              className="user__item"
            >
              <div className="user__avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.fullName} />
                ) : (
                  <Avatar size={64} src="/images/avatar-user.jpg" />
                )}
              </div>
              <div className="user__content">
                <div className="user__name">{user.fullName}</div>
                <div className="user__btn">
                  {handleBtn(user.friendList)}
                  <Link to={`/user/info/${user._id}`}>
                    <Button className="user__btn--info">Xem thông tin</Button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          style={{ margin: "10px" }}
          description={<Typography.Text>Không có dữ liệu</Typography.Text>}
        />
      )}
    </>
  );
}

export default User;

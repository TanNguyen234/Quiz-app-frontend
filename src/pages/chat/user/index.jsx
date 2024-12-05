import { Avatar, Button, Col, Empty, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { searchContext } from "../../../components/layouts/layoutDefault";
import { getUser } from "../../../services/getUser";
import { Link } from "react-router-dom";
import AddUser from "./addUser";

function User() {
  const [data, setData] = useState([]);
  const valueSearch = useContext(searchContext);
  useEffect(() => {
    const fetchApi = async () => {
      const users = valueSearch ? await getUser(valueSearch) : await getUser();
      setData(users);
    };
    fetchApi();
  }, [valueSearch]);

  return (
    <>
      {data.length > 0 ? (
        <Row className="user" gutter={[20, 20]}>
          {data.map((user) => (
            <Col key={user._id} xxl={6} xl={8} lg={12} md={16} sm={20} xs={24} className="user__item">
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
                  <AddUser id={user._id} />
                  <Link to={`/user/info/${user._id}`}><Button className="user__btn--info">Xem thông tin</Button></Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          style={{ margin: "10px"}}
          description={
            <Typography.Text>
              Không có dữ liệu
            </Typography.Text>
          }/>
      )}
    </>
  );
}

export default User;

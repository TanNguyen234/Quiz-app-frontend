import { Card, Row, Col } from "antd";
import Meta from "antd/es/card/Meta";

function Home() {
  return (
    <>
      Trang web trắc nghiệm của chúng tôi cung cấp các bài kiểm tra kiến thức
      trong nhiều công nghệ khác nhau và hơn thế nữa. Hãy tham gia để thử thách
      bản thân và củng cố kiến thức của bạn!
      <Row gutter={16}>
        <Col span={5}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://tse2.mm.bing.net/th?id=OIP.3pPJQKaUEdqQUjkWge0M3gHaEK&pid=Api&P=0&h=220"
              />
            }
          >
            <Meta title="NodeJS" />
          </Card>
        </Col>
        <Col span={5}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://tse2.mm.bing.net/th?id=OIP.enmrdVqi-spRDaUaxYXPxgHaHa&pid=Api&P=0&h=220"
              />
            }
          >
            <Meta title="Javascript" />
          </Card>
        </Col>
        <Col span={5}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://tse3.mm.bing.net/th?id=OIP.7nMRg0oUbRTdzCiwmCR13AHaCo&pid=Api&P=0&h=220"
              />
            }
          >
            <Meta title="ReactJS" />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://tse3.mm.bing.net/th?id=OIP.7cwsgCBxqiMI9hKRj7emwAHaEK&pid=Api&P=0&h=220"
              />
            }
          >
            <Meta title="Typescript" />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;

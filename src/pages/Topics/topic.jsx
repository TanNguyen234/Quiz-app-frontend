import { useEffect, useMemo, useState } from "react";
import "./topic.scss";
import { Row, Col, Card, Empty, Tooltip } from "antd";
import { getTopics } from "../../services/getTopics";
import { getQuestions } from "../../services/getQuestions";
import { Link } from "react-router-dom";

function Topics() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [arrow, setArrow] = useState('Show');

  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
    if (arrow === 'Show') {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);


  useEffect(() => {
    const fetchApi = async () => {
      const topics = await getTopics();

      if (topics.length > 0) {
        setData(topics);
        const updateTopics = await Promise.all(
          topics.map(async (topic) => {
            const totalQuestions = await getQuestions(topic._id);
            topic.totalQuestions = totalQuestions.length;
            return topic;
          })
        );
        setData(updateTopics);
        setIsLoading(false);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <Row className="topic" gutter={20}>
        {isLoading ? (
          <span class="loader"></span>
        ) : (
          (data.length > 0) ? data.map((topic) => (
            <Link to={`/questions/`+topic._id}>
            <Col span={6}>
            <Tooltip placement="topLeft" title={`Tổng số câu hỏi: ${topic.totalQuestions}`} arrow={mergedArrow}>
              <Card
                className="topic__item"
                hoverable
                bordered={true}
                style={{
                    width: 240,
                  }}
                cover={
                  <img
                    alt="example"
                    src={topic.image}
                  />
                }
              >
                {topic.title}
              </Card>
              </Tooltip>
            </Col>
            </Link>
          )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Row>
    </>
  );
}

export default Topics;

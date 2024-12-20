import "./style.scss";
import { useEffect, useState } from "react";
import { getAnswers } from "../../services/getAnswers";
import { Empty, Table, Tag } from "antd";
import { getTopics } from "../../services/getTopics";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Statistic() {
  const [data, setData] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answers = await getAnswers();
      const topicData = await getTopics();
      setTopics(topicData);
      setData(answers);
    };
    fetchApi();
  }, []);

  const returnNameTopic = (id) => {
    if (topics.length > 0) {
      for (let i = 0; i < topics.length; i++) {
        if (topics[i]._id === id) {
          return topics[i].title;
        }
      }
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (index, _, rowIndex) => rowIndex + 1,
    },
    {
      title: "Chủ đề",
      dataIndex: "topicId",
      key: "topicId",
      render: (id) => returnNameTopic(id)
    },
    {
      title: "Số câu",
      dataIndex: "answers",
      key: "answers",
      render: (answers) => Object.keys(answers).length,
    },
    {
      title: "Ngày làm",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt > b.createdAt,
      showSorterTooltip: (a, b) => a.createdAt > b.createdAt,
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Tag color="geekblue"><Link to={"/answers/check/" + id}>Xem kết quả</Link></Tag>
    },
  ];
  return (
    <>
      {data.length > 0 ? (
        <>
          <Table columns={columns} dataSource={data} bordered={false} size="middle" className="table"/>;
        </>
      ) : (
        <Empty className="questions_empty" />
      )}
    </>
  )
}

export default Statistic;
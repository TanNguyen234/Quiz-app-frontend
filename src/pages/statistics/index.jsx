import { useEffect, useState } from "react";
import { getAnswers } from "../../services/getAnswers";
import { Empty, Table } from "antd";
import { getTopics } from "../../services/getTopics";

function Statistic() {
    const [data, setData] = useState([])
    const [topics, setTopics] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const answers = await getAnswers();
            const topicData = await getTopics();
            setTopics(topicData);
            setData(answers);
            console.log(answers, topicData);
        }
        fetchApi()
    }, [])

    const returnNameTopic = () => {
      
    }
    return (<>
    {data.length > 0 ? <>
       <table>
          <thead>
            <tr>
              <th>Chủ đề</th>
              <th>Ngày làm</th>
              <th>Số câu</th>
              <th>Xem đáp án</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                <td>{item.question}</td>
                <td>{topics.find(topic => topic._id === item.topicId)?.name}</td>
                <td>{item.correctAnswer}</td>
                <td>{item.selectedAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </> : <Empty className="questions_empty" />}
    </>)
}

export default Statistic;
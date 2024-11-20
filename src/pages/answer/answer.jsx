/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import "./answer.scss";

import { Button, Empty, Form, Radio } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Answer() {
  const { id } = useParams();
  const [topic, setTopic] = useState({});
  const answer = useSelector(state => state.answerReducer)

//   useEffect(() => {
//     const fetchApi = async () => {
//       const topic = await getTopics(id);
//       const questions = await getQuestions(id);
//       setQuestions(questions);
//       setTopic(topic);
//     };
//     fetchApi();
//   }, []);

  return (
    <>
      {topic && answer ? (
        <div className="question">
          <h2 className="question__title">
            Bài thi trắc nghiệm: {topic.title}
          </h2>
          {/* <Form disabled className="question__form">
            {answer.map((itemQuestion, indexQuestion) => (
              <Form.Item
                key={itemQuestion._id} // Thêm key duy nhất
                label={`Câu hỏi ${indexQuestion + 1}: ` + itemQuestion.question}
                name={itemQuestion._id} // Đây là tên được dùng để lưu trữ giá trị trong form
                className="question__question"
                rules={[
                    {
                      required: true,
                      message: 'Please hoàn thành câu trả lời!',
                    },
                ]
            }
              >
                <Radio.Group>
                  {itemQuestion.answers.map((answer, indexAnswer) => (
                    <Radio
                      key={indexAnswer}
                      value={indexAnswer}
                      className="question__item--answer"
                    >
                      {answer}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            ))}
          </Form> */}
        </div>
      ) : (
        <Empty className="questions_empty" />
      )}
    </>
  );
}

export default Answer;
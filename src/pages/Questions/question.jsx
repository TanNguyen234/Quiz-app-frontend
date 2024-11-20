/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./question.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getTopics } from "../../services/getTopics";
import { getQuestions } from "../../services/getQuestions";
import { Button, Empty, Form, Radio } from "antd";
import { submitAnswer } from "../../services/submitAnswer";
import { useDispatch, useSelector } from "react-redux";
import { answer } from "../../actions/answer";

function Question() {
  const [topic, setTopic] = useState({});
  const [questions, setQuestions] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.userReducer)

  const onFinish = async (values) => {
    const data = await submitAnswer(user.id, id, values);
    dispatch(answer(data));
    navigate('/answers/check/' + data.answers._id);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const topic = await getTopics(id);
      const questions = await getQuestions(id);
      setQuestions(questions);
      setTopic(topic);
    };
    fetchApi();
  }, []);

  return (
    <>
      {topic && questions ? (
        <div className="question">
          <h2 className="question__title">
            Bài thi trắc nghiệm: {topic.title}
          </h2>
          <Form onFinish={onFinish} className="question__form">
            {questions.map((itemQuestion, indexQuestion) => (
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
            <Form.Item>
              <Button className="question__btn" htmlType="submit">
                Nộp bài
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <Empty className="questions_empty" />
      )}
    </>
  );
}

export default Question;
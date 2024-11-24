/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import "./answer.scss";

import { Button, Empty, Form, Radio } from "antd";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAnswers } from "../../services/getAnswers";
import { getTopics } from "../../services/getTopics";
import { getQuestions } from "../../services/getQuestions";
import Rating from "../../components/rating";

function Answer() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState(null);
  const [topic, setTopic] = useState(null);
  const { id } = useParams();
  const answerData = useSelector((state) => state.answerReducer);

  const checkValue = useCallback((questionId, indexCurrent, answers) => {
    return answers[questionId] === indexCurrent ? true : false;
  });

  const points = (data, questions) => {
    let total = 0;
    questions.forEach((item) => {
      if (item.correctAnswer === data[item._id]) total += 1;
    });
    return total;
  };

  useEffect(() => {
    if (!answerData || Object.keys(answerData).length === 0) {
      const fetchApi = async () => {
        const answerDatafetch = await getAnswers(id);
        console.log(answerDatafetch);
        if (answerDatafetch) {
          const questions = await getQuestions(answerDatafetch.topicId);
          const topic = await getTopics(answerDatafetch.topicId);
          setQuestions(questions);
          setData(answerDatafetch.answers);
          setTopic(topic.title);
          console.log(questions, topic, data);
        }
      };
      fetchApi();
    } else {
      const dataRender = answerData.answers;
      console.log(dataRender);
      const fetchApi = async () => {
        const questions = await getQuestions(dataRender.topicId);
        setQuestions(questions);
        setData(dataRender.answers);
        setTopic(dataRender.topicTitle);
      };
      fetchApi();
    }
  }, []);

  return (
    <>
    <Rating/>
      {questions ? (
        <div className="question">
          <h2 className="question__title">
            Kết quả bài thi: {topic}
            <br />
            <span className="question__result">
              Đúng: {` ${points(data, questions)}/${questions.length}`}
            </span>
          </h2>
          <Form disabled className="question__form">
            {questions.map((itemQuestion, indexQuestion) => (
              <Form.Item
                key={itemQuestion._id} // Thêm key duy nhất
                label={`Câu hỏi ${indexQuestion + 1}: ` + itemQuestion.question}
                name={itemQuestion._id} // Đây là tên được dùng để lưu trữ giá trị trong form
                className="question__question"
                rules={[
                  {
                    required: true,
                    message: "Please hoàn thành câu trả lời!",
                  },
                ]}
              >
                <Radio.Group defaultValue={data[itemQuestion._id]}>
                  {itemQuestion.answers.map((answer, indexAnswer) => (
                    <Radio
                      key={indexAnswer}
                      value={indexAnswer}
                      className="question__item--answer"
                      style={{
                        color:
                          indexAnswer === itemQuestion.correctAnswer
                            ? "green"
                            : checkValue(itemQuestion._id, indexAnswer, data)
                            ? "red"
                            : "",
                      }}
                    >
                      {answer}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            ))}
            <Form.Item>
            <Button
                  onClick={() => navigate(-1)}
                  disabled={false}
                  className="question__btn"
                  htmlType="submit"
                >
                  Làm lại
                </Button>
              <Link to={"/topics/"}>
                <Button
                  disabled={false}
                  className="question__btn"
                  htmlType="submit"
                  style={{ width: "auto", marginLeft: "10px" }}
                >
                  Quay lại trang chủ đề
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <Empty className="questions_empty" />
      )}
    </>
  );
}

export default Answer;
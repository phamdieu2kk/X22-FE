import { Row, Col } from "antd";
import { useState } from "react";

const SingleChoice = ({ question, answerList, handleOptionSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleOptionClick = (value) => {
    setSelectedAnswer(value);
    handleOptionSelect(value); // Gọi hàm callback từ props
  };

  return (
    <div>
      <div>
        <h2 className="question">{question}</h2>
        <Row gutter={[16, 16]}>
          {answerList.map((answer) => (
            <Col span={12} key={answer.value}>
              <ul className="options-single-choice">
                <li
                  className={`option-single-choice ${selectedAnswer === answer.value ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(answer.value)} // Gọi hàm xử lý khi click
                >
                  {`${answer.value}. ${answer.text}`}
                </li>
              </ul>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default SingleChoice;
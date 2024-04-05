import { useState } from "react";
import { Row, Col } from "antd";

const MultipleChoice = ({ questions, currentQuestionIndex, selectedAnswers, handleOptionSelect }) => {
  const [selectedAnswerList, setSelectedAnswerList] = useState([]);

  const handleOptionClick = (value) => {
    const isSelected = selectedAnswerList.includes(value);
    let updatedSelectedAnswers = [];

    if (isSelected) {
      updatedSelectedAnswers = selectedAnswerList.filter((answer) => answer !== value);
    } else {
      updatedSelectedAnswers = [...selectedAnswerList, value];
    }

    // Chỉ cho phép chọn nếu số lượng đáp án đã chọn là từ 2 trở lên
    if (updatedSelectedAnswers.length >= 2) {
      setSelectedAnswerList(updatedSelectedAnswers);
      handleOptionSelect(updatedSelectedAnswers); // Gọi hàm callback từ props
    }
  };

  return (
    <div>
      {questions[currentQuestionIndex] && questions[currentQuestionIndex].answerList && (
        <div>
          <h2 className="question">{questions[currentQuestionIndex].question}</h2>
          <Row gutter={[16, 16]}>
            {questions[currentQuestionIndex].answerList.map((answer) => (
              <Col span={12} key={answer.value}>
                <ul className="options-multiple-choice">
                  <li
                    className={`option-multiple-choice ${selectedAnswerList.includes(answer.value) ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(answer.value)}
                  >
                    {`${answer.value}. ${answer.text}`}
                  </li>
                </ul>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
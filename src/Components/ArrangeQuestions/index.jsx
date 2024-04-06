import { useState } from "react";
import { Row, Col, Button } from "antd";
import "./style.css";
const MultipleChoice = ({ questions, currentQuestionIndex, handleNextQuestion }) => {
  const [selectedAnswerList, setSelectedAnswerList] = useState([]);

  const handleOptionClick = (value) => {
    const isSelected = selectedAnswerList.includes(value);
    let updatedSelectedAnswers = [];

    if (isSelected) {
      updatedSelectedAnswers = selectedAnswerList.filter((answer) => answer !== value);
    } else {
      updatedSelectedAnswers = [...selectedAnswerList, value];
    }

    setSelectedAnswerList(updatedSelectedAnswers);
  };

  const handleNextButtonClick = () => {
    if (selectedAnswerList.length >= 2) {
      handleNextQuestion(); // Gọi hàm xử lý sự kiện chuyển sang câu hỏi tiếp theo từ component cha
      setSelectedAnswerList([]); // Reset danh sách đáp án đã chọn
    }
  };

  return (
    <div>
      {questions[currentQuestionIndex].type === "multiple-choice" && ( // Kiểm tra loại câu hỏi
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
          <Button type="primary" onClick={handleNextButtonClick}>Câu tiếp theo</Button>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
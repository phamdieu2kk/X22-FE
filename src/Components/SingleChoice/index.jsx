import "./style.css";
import { Row, Col, Button } from 'antd';
import { useState } from 'react';

const SingleChoice = ({ question, answerList, handleNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    // Kiểm tra xem đáp án có đúng không
    const isCorrect = checkAnswer(option);
    // Gọi hàm callback từ props để thông báo về đáp án được chọn và kết quả kiểm tra (đúng/sai) lên component cha
    handleOptionSelect(option, isCorrect);
  };
// Truyền hàm callback từ props để thông báo về đáp án được chọn lên component cha
const handleOptionSelect = (option) => {
  const isCorrect = checkAnswer(option); // Kiểm tra xem đáp án có đúng không
  handleOptionSelect(option, isCorrect); // Gọi hàm callback từ props
};

// Hàm kiểm tra xem đáp án có đúng không
const checkAnswer = (selectedOption) => {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.answerList.find((answer) => answer.isCorrect);

  // So sánh đáp án được chọn với đáp án đúng
  return selectedOption === correctAnswer.value;
};


  const handleNextButtonClick = () => {
    // Kiểm tra xem người dùng đã chọn câu trả lời chưa
    if (selectedAnswer !== null) {
      // Gọi hàm xử lý khi bấm nút "Câu tiếp theo" và chuyển sang câu hỏi tiếp theo
      handleNextQuestion();
      setSelectedAnswer(null);
      // Reset trạng thái đã chọn khi qua câu hỏi tiếp theo
      setSelectedAnswer(null);
    }
  };

  return (
    <div>
      <h2 className="question">{question}</h2>
      <Row gutter={[16, 16]}>
        {answerList.map((answer) => (
          <Col span={12} key={answer.value}>
            <div
              className={`option-single-choice ${selectedAnswer === answer.value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(answer.value)}
            >
              {`${answer.value}. ${answer.text}`}
            </div>
          </Col>
        ))}
      </Row>
      <Button type="primary" onClick={handleNextButtonClick}>Câu tiếp theo</Button>
    </div>
  );
};

export default SingleChoice;
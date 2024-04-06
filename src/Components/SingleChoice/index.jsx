import "./style.css";
import { Row, Col, Button,Checkbox,Radio,Flex} from 'antd';
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
      
      <div className="option-single-choice">
  <Radio.Group className="options-single-choice">
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Radio.Button value="a">Đáp án A</Radio.Button>
      </Col>
      <Col span={12}>
        <Radio.Button value="b">Đáp án B</Radio.Button>
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Radio.Button value="c">Đáp án C</Radio.Button>
      </Col>
      <Col span={12}>
        <Radio.Button value="d">Đáp án D</Radio.Button>
      </Col>
    </Row>
  </Radio.Group>
</div>

<div className="button-container">
  <Button type="primary" onClick={handleNextButtonClick}>Câu tiếp theo</Button>
</div>
    </div>
  );
};

export default SingleChoice;
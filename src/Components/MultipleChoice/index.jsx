import { useState } from "react";
import { Row, Col, Button, Checkbox } from "antd";
import "./style.css";

const MultipleChoice = ({ questions, currentQuestionIndex, selectedAnswers, handleOptionSelect, handleNextQuestion }) => {
  const [selectedAnswerList, setSelectedAnswerList] = useState([]);

  const handleOptionClick = (value) => {
    const isSelected = selectedAnswerList.includes(value);
    let updatedSelectedAnswers = [];

    if (isSelected) {
      updatedSelectedAnswers = selectedAnswerList.filter((answer) => answer !== value);
    } else {
      updatedSelectedAnswers = [...selectedAnswerList, value];
    }

    if (updatedSelectedAnswers.length >= 2) {
      setSelectedAnswerList(updatedSelectedAnswers);
      handleOptionSelect(updatedSelectedAnswers);
    }
  };

  const handleNextButtonClick = () => {
    if (selectedAnswerList.length >= 2) {
      handleNextQuestion();
      setSelectedAnswerList([]);
    }
  };

  return (
    <div>
      <h2 className="question">{questions[currentQuestionIndex].question}</h2>
      <div className="option-multiple-choice">
        <Checkbox.Group style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
            <Col span={8}>
              <Checkbox value="A" onChange={handleOptionClick}>Đáp án A</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="B" onChange={handleOptionClick}>Đáp án B</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C" onChange={handleOptionClick}>Đáp án C</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="D" onChange={handleOptionClick}>Đáp án D</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E" onChange={handleOptionClick}>Đáp án E</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="F" onChange={handleOptionClick}>Đáp án F</Checkbox>
            </Col>
            
            </Row>
        </Checkbox.Group>
      </div>
      <div className="button-multipleChoice">
        <Button type="primary" onClick={handleNextButtonClick}>Câu tiếp theo</Button>
      </div>
    </div>
  );
};

export default MultipleChoice;
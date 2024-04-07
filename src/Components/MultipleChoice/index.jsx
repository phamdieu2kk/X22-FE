import { useState } from 'react';
import { Checkbox, Row, Col } from 'antd';
import './style.css';

const MultipleChoice = ({ currentQuestion, onChangeAnswer }) => {
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Sử dụng state để lưu trữ các giá trị đáp án được chọn

    const handleChangeAnswer = (values) => {
        setSelectedAnswers(values); // Cập nhật state khi có sự thay đổi
        onChangeAnswer({
            questionId: currentQuestion._id,
            answers: values,
            type: currentQuestion.type,
        });
    };

    const handleCheckboxChange = (answerId) => {
        const newSelectedAnswers = selectedAnswers.includes(answerId)
            ? selectedAnswers.filter((id) => id !== answerId)
            : [...selectedAnswers, answerId];
        setSelectedAnswers(newSelectedAnswers);
        handleChangeAnswer(newSelectedAnswers);
    };

    const colCount = Math.ceil(currentQuestion.answerList.length / 3);

    return (
        <div className="option-multiple-choice">
            <Checkbox.Group
                style={{ width: '100%' }}
                value={selectedAnswers}
                onChange={handleChangeAnswer}
            >
                <Row gutter={[16, 16]}>
                    {currentQuestion.answerList.map((answer, index) => (
                        <Col key={index} span={24 / colCount}>
                            <div
                                key={answer._id}
                                className={`answer-option ${selectedAnswers.includes(answer._id) ? 'selected' : ''}`}
                                onClick={() => handleCheckboxChange(answer._id)}
                            >
                                <Checkbox value={answer._id} style={{ width: '100%' }}>
                                    {answer.value}
                                </Checkbox>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        </div>
    );
};

export default MultipleChoice;
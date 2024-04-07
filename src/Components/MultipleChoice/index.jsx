<<<<<<< HEAD
import { useState } from 'react';
import { Checkbox, Row, Col } from 'antd';
import './style.css';

const MultipleChoice = ({ currentQuestion, onChangeAnswer }) => {
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Sử dụng state để lưu trữ các giá trị đáp án được chọn

    const handleChangeAnswer = (values) => {
        setSelectedAnswers(values); // Cập nhật state khi có sự thay đổi
=======
import { Checkbox } from "antd";
const MultipleChoice = ({ currentQuestion, onChangeAnswer }) => {
    const handleChangeAnswer = (values) => {
>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8
        onChangeAnswer({
            questionId: currentQuestion._id,
            answers: values,
            type: currentQuestion.type,
        });
    };
<<<<<<< HEAD

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
=======
    return (
        <div className="option-multiple-choice">
            <Checkbox.Group
                style={{ width: "100%" }}
                onChange={handleChangeAnswer}
            >
                <div
                    className=""
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "2rem",
                        width: "100%",
                    }}
                >
                    {currentQuestion.answerList.map((answer) => {
                        return (
                            <div
                                className=""
                                key={answer._id}
                                style={{
                                    border: "1px solid #333",
                                    width: "calc(50% - 1rem)",
                                }}
                            >
                                <Checkbox
                                    value={answer._id}
                                    style={{ width: "100%" }}
                                >
                                    {answer.value}
                                </Checkbox>
                            </div>
                        );
                    })}
                </div>
>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8
            </Checkbox.Group>
        </div>
    );
};

export default MultipleChoice;

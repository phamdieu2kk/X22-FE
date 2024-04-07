import { Checkbox } from "antd";
import "./style.css";
const MultipleChoice = ({ currentQuestion, onChangeAnswer }) => {
    const handleChangeAnswer = (values) => {
        onChangeAnswer({
            questionId: currentQuestion._id,
            answers: values,
            type: currentQuestion.type,
        });
    };
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
            </Checkbox.Group>
        </div>
    );
};

export default MultipleChoice;

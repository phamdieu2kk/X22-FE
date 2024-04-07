import { Radio } from "antd";

const SingleChoice = ({ currentQuestion, onChangeAnswer }) => {
    const handleChangeAnswer = (e) => {
        onChangeAnswer({
            questionId: currentQuestion._id,
            answers: e.target.value,
            type: currentQuestion.type,
        });
    };
    return (
        <div className="option-single-choice">
            <Radio.Group onChange={handleChangeAnswer}>
                <div
                    className=""
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "2rem",
                    }}
                >
                    {currentQuestion.answerList.map((answer) => {
                        return (
                            <Radio.Button
                                style={{ width: "calc(50% - 1rem)" }}
                                key={answer._id}
                                value={answer._id}
                            >
                                {answer.value}
                            </Radio.Button>
                        );
                    })}
                </div>
            </Radio.Group>
        </div>
    );
};

export default SingleChoice;

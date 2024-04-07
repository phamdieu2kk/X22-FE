import { useEffect, useState } from "react";
import SingleChoice from "../SingleChoice";
import MultipleChoice from "../MultipleChoice";
import { Button } from "antd";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerList, setAnswerList] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await fetch("/test.json");
            const data = await res.json();
            console.log(data);
            setQuestions(data);
        })();
    }, []);

    const changeAnswer = (data) => {
        console.log(data);

        const newAnswerList = answerList.filter(
            (answer) => answer.questionId !== data.questionId
        );

        switch (data.type) {
            case "multiple-choice":
                if (data.answers.length > 0) {
                    newAnswerList.push(data);
                }
                break;
            case "single-choice":
                newAnswerList.push(data);
                break;
            default:
                break;
        }

        setAnswerList(newAnswerList);
    };

    useEffect(() => {
        console.log("answerList: ", answerList);
    }, [answerList]);

    const handleNextButtonClick = () => {
        const answerCurrent = answerList.find((answer) => {
            return answer.questionId === questions[currentIndex]._id;
        });

        if (answerCurrent) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSubmitButtonClick = () => {
        console.log("nộp bài");
        // fecth đến backend gửi danh sách câu trả lời
    };

    return (
        <div>
            {questions.length > 0 && (
                <>
                    <h6>
                        {currentIndex + 1}/{questions.length}
                    </h6>
                    <h4>loại câu hỏi: {questions[currentIndex].type}</h4>
                    <h2>câu hỏi: {questions[currentIndex].question}</h2>
                    <div className="">
                        {questions[currentIndex].type === "single-choice" && (
                            <SingleChoice
                                currentQuestion={questions[currentIndex]}
                                onChangeAnswer={changeAnswer}
                            />
                        )}
                        {questions[currentIndex].type === "multiple-choice" && (
                            <MultipleChoice
                                currentQuestion={questions[currentIndex]}
                                onChangeAnswer={changeAnswer}
                            />
                        )}
                        {questions[currentIndex].type === "arrange" && (
                            <span>arrange</span>
                        )}
                    </div>

                    <div
                        className="button-multipleChoice"
                        style={{ marginTop: "24px" }}
                    >
                        {currentIndex !== questions.length - 1 ? (
                            <Button
                                type="primary"
                                onClick={handleNextButtonClick}
                            >
                                Câu tiếp theo
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                onClick={handleSubmitButtonClick}
                            >
                                Nộp bài
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Questions;

import { useEffect, useState } from "react";
import SingleChoice from "../SingleChoice";
import MultipleChoice from "../MultipleChoice";
import { Button } from "antd";
import "./style.css";
import api from "../../api";
import { useLocation } from "react-router-dom";

const Questions = () => {
    const location = useLocation();
    const queries = new URLSearchParams(location.search);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerList, setAnswerList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.getQuestion({
                    queries: queries,
                });
                setQuestions(res.data); // Assuming res.data contains the questions
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        })();
    }, []);

    const changeAnswer = (data) => {
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

    const handleNextButtonClick = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const handleSubmitButtonClick = () => {
        console.log("Submit answers to backend:", answerList);
        // Here you can make a request to submit answers to the backend
    };

    return (
        <div className="questions-container">
            {questions.length > 0 && currentIndex < questions.length && (
                <div className="question-card">
                    <h6>
                        {currentIndex + 1}/{questions.length}
                    </h6>
                    <h4>Loại câu hỏi: {questions[currentIndex].type}</h4>
                    <div className="question-header">
                        <h2 className="question">{questions[currentIndex].question}</h2>
                        {/* Add question container here if needed */}
                    </div>
                    <div className="question-content">
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
                        {questions[currentIndex].type === "arrange" && <span>arrange</span>}
                    </div>

                    <div className="button-container">
                        {currentIndex !== questions.length - 1 ? (
                            <Button type="primary" onClick={handleNextButtonClick}>
                                Câu tiếp theo
                            </Button>
                        ) : (
                            <Button type="primary" onClick={handleSubmitButtonClick}>
                                Nộp bài
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questions;
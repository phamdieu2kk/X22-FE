import { useEffect, useState } from "react";
import SingleChoice from "../SingleChoice";
import MultipleChoice from "../MultipleChoice";
<<<<<<< HEAD
import { Button , Flex, Modal} from "antd";
import "./style.css";
// import api from "../../api";
// import { useLocation } from "react-router-dom";

const Questions = () => {
    // const location = useLocation();
    // const queries = new URLSearchParams(location.search);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerList, setAnswerList] = useState([]);
    const [timeLeft, setTimeLeft] = useState(180); // Thời gian còn lại ban đầu: 3 phút * 60 giây/phút
    const [showResults, setShowResults] = useState(false); // Thêm state để kiểm soát hiển thị kết quả
    useEffect(() => {
        (async () => {
            // try {
            //     const res = await api.getQuestion({
            //         queries: queries,
            //     });
            //     setQuestions(res.data); // Assuming res.data contains the questions
            // } catch (error) {
            //     console.error("Error fetching questions:", error);
            // }
=======
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
>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8

        const newAnswerList = answerList.filter(
            (answer) => answer.questionId !== data.questionId
        );

<<<<<<< HEAD
            const res = await fetch("/test.json");
            const data = await res.json();
            console.log(data);
            setQuestions(data);
        })();
    }, []);




    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1); // Giảm thời gian còn lại đi 1 giây sau mỗi lần kích hoạt
        }, 1000);

        // Dừng đếm ngược khi hết thời gian hoặc khi chuyển câu hỏi
        return () => clearInterval(timer);
    }, []);

    // Khi thời gian còn lại đạt 0, xử lý hết thời gian ở đây










    const changeAnswer = (data) => {
        console.log(data);



        const newAnswerList = answerList.filter(
            (answer) => answer.questionId !== data.questionId
        );

        switch (data.type) {
            case "single-choice":
                newAnswerList.push(data);
                break;
            default:
                break;
=======
        switch (data.type) {
>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8
            case "multiple-choice":
                if (data.answers.length > 0) {
                    newAnswerList.push(data);
                }
                break;
<<<<<<< HEAD
            }
=======
            case "single-choice":
                newAnswerList.push(data);
                break;
            default:
                break;
        }
>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8

        setAnswerList(newAnswerList);
    };

    useEffect(() => {
        console.log("answerList: ", answerList);
    }, [answerList]);

<<<<<<< HEAD

    const handleNextButtonClick = () => {
        const answerCurrent = answerList.find((answer) => {
            return answer.questionId === questions[currentIndex]._id;
        });

=======
    const handleNextButtonClick = () => {
        const answerCurrent = answerList.find((answer) => {
            return answer.questionId === questions[currentIndex]._id;
        });

>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8
        if (answerCurrent) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSubmitButtonClick = () => {
        console.log("nộp bài");
        // fecth đến backend gửi danh sách câu trả lời
    };

    return (
<<<<<<< HEAD
        <div className="questions-container">
            {questions.length > 0 && currentIndex < questions.length && (
                <div className="question-card">
                     <Flex  justify="space-between" align="center">
    <h6>Số câu hỏi: {currentIndex + 1}/{questions.length} - Loại: {questions[currentIndex].type}</h6>
    <h6>Score:</h6>
    <h6>Thời gian: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h6>
   
</Flex>
                    
  
                    <div className="question-header">
                        <h2 className="question">{questions[currentIndex].question}</h2>
                        {/* Add question container here if needed */}
                    </div>
                    <div className="question-content">
=======
        <div>
            {questions.length > 0 && (
                <>
                    <h6>
                        {currentIndex + 1}/{questions.length}
                    </h6>
                    <h4>loại câu hỏi: {questions[currentIndex].type}</h4>
                    <h2>câu hỏi: {questions[currentIndex].question}</h2>
                    <div className="">
>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8
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
<<<<<<< HEAD
                        {questions[currentIndex].type === "arrange" && <span>arrange</span>}
                    </div>

                    <div className="button-container">
                        {currentIndex !== questions.length - 1 ? (
                            <Button type="primary" onClick={handleNextButtonClick}>
                                Câu tiếp theo
                            </Button>
                        ) : (
                            <Button type="primary" onClick={handleSubmitButtonClick}>
=======
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
>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8
                                Nộp bài
                            </Button>
                        )}
                    </div>
<<<<<<< HEAD
                </div>
            )}
            
=======
                </>
            )}
>>>>>>> 8343536152c22f11c469319d9539085e93a36ea8
        </div>
    );
};

export default Questions;

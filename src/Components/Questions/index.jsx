import { Breadcrumb, Flex} from "antd";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const baseStyle = {
  width: "50%",
  height: 100,
  borderRadius: 6,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer", // Thêm style cho con trỏ khi di chuột qua đáp án
};

const Question = ({ question, answers, correctAnswer, handleAnswerClick, results, currentQuestionIndex }) => (
  <div className="bodywrap">
    <div style={{ margin: 10 }}>
      <div
        style={{
          ...baseStyle,
          backgroundColor: "#FF9933",
          color: "#000033",
          border: "2px solid #000033",
          height: 150,
          width: 700,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Căn giữa theo chiều dọc
          textAlign: "center", // Căn giữa theo chiều ngang
        }}
      >
        {question}
      </div>
      <Flex gap="middle" vertical justifyContent="space-between">
        <Flex gap="middle">
          {answers.slice(0, 2).map((answer, answerIndex) => (
            <div
              key={answerIndex}
              style={{
                ...baseStyle,
                backgroundColor: results[currentQuestionIndex] === null ? "#00EE00" : answer === correctAnswer ? "#00FF00" : "#FF0000",
                color: "#000033",
              }}
              onClick={() => handleAnswerClick(answer, correctAnswer, currentQuestionIndex)}
            >
              {`Đáp án ${answer}`}
            </div>
          ))}
        </Flex>
        <Flex gap="middle">
          {answers.slice(2).map((answer, answerIndex) => (
            <div
              key={answerIndex}
              style={{
                ...baseStyle,
                backgroundColor: results[currentQuestionIndex] === null ? "#00EE00" : answer === correctAnswer ? "#00FF00" : "#FF0000",
                color: "#000033",
              }}
              onClick={() => handleAnswerClick(answer, correctAnswer, currentQuestionIndex)}
            >
              {`Đáp án ${answer}`}
            </div>
          ))}
        </Flex>
      </Flex>
    </div>
  </div>
);

const Questions = () => {
  const questions = [
    {
      question: "Câu hỏi 1: Có bao nhiêu cầu thủ được phép vào sân bóng đá? ",
      correctAnswer: "11 cầu thủ",
      answers: ["10 cầu thủ", "11 cầu thủ", "9 cầu thủ", "12 cầu thủ"],
    },
    {
      question: "câu hỏi: Ai là Tổng thống đầu tiên của Hoa Kỳ?",
      correctAnswer: "George Washington",
      answers: ["Donald Trump", "Barack Obama", "Abraham Lincoln", "George Washington"],
    },
    // Thêm các câu hỏi khác tương tự ở đây
  ];

  const [score, setScore] = useState(0);
  const [results, setResults] = useState(Array(questions.length).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [allQuestionsCompleted, setAllQuestionsCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  const handleAnswerClick = (selectedAnswer, correctAnswer, questionIndex) => {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    setResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[questionIndex] = selectedAnswer === correctAnswer;
      return newResults;
    });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const countCorrectAnswers = () => {
    return results.filter((result) => result === true).length;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(countdownTimer);
          if (!allQuestionsCompleted) {
            calculateFinalResult();
          }
        }
        return prevTimeLeft > 0 ? prevTimeLeft - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      setAllQuestionsCompleted(true);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (allQuestionsCompleted) {
      calculateFinalResult();
    }
  }, [allQuestionsCompleted]);

  const calculateFinalResult = () => {
    const correctAnswers = countCorrectAnswers();
    const totalQuestions = questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const result = percentage >= 50 ? true : false;
    setFinalResult(result);
  };

  return (
    <div>
      <div className="title-home">
        <Breadcrumb
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: "Câu hỏi" },
          ]}
        />
      </div>

      <div className="content" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        {currentQuestionIndex < questions.length && (
          <div className="question-container">
            <div style={{ margin: "16px", display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div style={{ marginTop: "10px", marginRight: "30px" }}>Điểm số: {countCorrectAnswers()} / {questions.length}</div>
              <div>Thời gian còn lại: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>
            <Question
              question={questions[currentQuestionIndex].question}
              answers={questions[currentQuestionIndex].answers}
              correctAnswer={questions[currentQuestionIndex].correctAnswer}
              handleAnswerClick={handleAnswerClick}
              results={results}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>
        )}

        {allQuestionsCompleted && (
          <div className="">
            <h3>Kết quả cuối cùng: {finalResult ? 'Đúng' : 'Sai'}</h3>
            <h3>Điểm số: {countCorrectAnswers()} / {questions.length}</h3>
            {results.map((result, index) => (
              <div key={index}>
                <p>Câu {index + 1}: {result ? 'Đúng' : 'Sai'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
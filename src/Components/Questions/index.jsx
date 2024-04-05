import "./style.css";
import { useEffect, useState } from "react";
import { Breadcrumb, Flex, Button, message, Progress, Modal } from "antd";
import { Link } from "react-router-dom";
import MultipleChoice from "../MultipleChoice";
import SingleChoice from "../SingleChoice";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [score, setScore] = useState(0);
  const [finalResult, setFinalResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimePaused, setIsTimePaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [questionType, setQuestionType] = useState(null);
  const [selectedButtonType, setSelectedButtonType] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sampleData = [
          {
            type: "single-choice",
            question: "What is the capital of France?",
            challengeName: "Geography Quiz",
            answerList: [
              { value: "A", text: "Berlin", isCorrect: false },
              { value: "B", text: "Paris", isCorrect: true },
              { value: "C", text: "Rome", isCorrect: false },
              { value: "D", text: "London", isCorrect: false }
            ]
          },
          {
            type: "multiple-choice",
            question: "Which of the following are primary colors?",
            challengeName: "Color Quiz",
            answerList: [
              { value: "A", text: "Red", isCorrect: true },
              { value: "B", text: "Green", isCorrect: false },
              { value: "C", text: "Blue", isCorrect: true },
              { value: "D", text: "Yellow", isCorrect: false },
              { value: "E", text: "Green", isCorrect: false },
              { value: "F", text: "Blue", isCorrect: false },
            ]
          },
          {
            type: "single-choice",
            question: "What is the capital of France?",
            challengeName: "Geography Quiz",
            answerList: [
              { value: "A", text: "Berlin", isCorrect: false },
              { value: "B", text: "Paris", isCorrect: true },
              { value: "C", text: "Rome", isCorrect: false },
              { value: "D", text: "London", isCorrect: false }
            ]
          },
        ];
        setQuestions(sampleData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isTimePaused) return;

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(countdown);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isTimePaused]);

  useEffect(() => {
    if (isSubmitting) {
      handleGameOver();
    }
  }, [isSubmitting]);

  const handleOptionSelect = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answerList.find((answer) => answer.value === option);
    const isCorrect = selectedAnswer.isCorrect;

  
    setSelectedAnswers((prevSelectedAnswers) => {
      if (prevSelectedAnswers.includes(option)) {
        return prevSelectedAnswers.filter((answer) => answer !== option);
      } else {
        return [...prevSelectedAnswers, option];
      }
    });

    if (isCorrect) {
      setScore((prevScore) => prevScore + 10);
      setCorrectAnswers((prevCount) => prevCount + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setIsTimePaused(true);
    setTotalTime(180 - timeLeft);
    const result = `Số câu đúng: ${correctAnswers}/${questions.length}`;
    setFinalResult(result);
    setShowSubmitButton(true);
    message.success("Trò chơi kết thúc");
  };

  const handleSubmission = () => {
    setIsSubmitting(true);
  };

  const handleConfirmation = () => {
    setIsSubmitting(false);
    const totalScore = correctAnswers * 10;
    const result = `Số câu đúng: ${correctAnswers}/${questions.length}. Điểm của bạn: ${totalScore}`;
    setFinalResult(result);
    setShowSubmitButton(false);
    const totalTime = timeLeft;
    setTotalTime(totalTime);
  };

  const handleQuestionTypeSelect = (type) => {
    setQuestionType(type);
    setSelectedButtonType(type);
    setCurrentQuestionIndex(0);
  };

  const isButtonSelected = (type) => {
    return selectedButtonType === type ? 'primary' : 'default';
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const renderQuestionTypeButtons = () => (
    <div className="question-types">
      <Button type={isButtonSelected("single-choice")} onClick={() => handleQuestionTypeSelect("single-choice")}>Lựa chọn duy nhất</Button>
      <Button type={isButtonSelected("multiple-choice")} onClick={() => handleQuestionTypeSelect("multiple-choice")}>Nhiều lựa chọn</Button>
      <Button type={isButtonSelected("arrange")} onClick={() => handleQuestionTypeSelect("arrange")}>Sắp xếp</Button>
    </div>
  );

  const renderQuestionContent = () => {
    if (questionType === "single-choice") {
      return renderSingleChoiceQuestions();
    } else if (questionType === "multiple-choice") {
      return renderMultipleChoiceQuestions();
    } else if (questionType === "arrange") {
      return renderArrangeQuestions();
    }
    return null;
  };

  const renderSingleChoiceQuestions = () => {
    return (
      <SingleChoice
        question={questions[currentQuestionIndex].question}
        answerList={questions[currentQuestionIndex].answerList}
        handleOptionSelect={handleOptionSelect}
      />
    );
  };

  const renderMultipleChoiceQuestions = () => {
    return (
      <MultipleChoice
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswers={selectedAnswers}
        handleOptionSelect={handleOptionSelect}
      />
    );
  };

  const renderArrangeQuestions = () => {
    return (
      <div>
        {/* Render câu hỏi sắp xếp */}
      </div>
    );
  };

  return (
    <div>
      <div className="content">
        <div className="title-home">
          <Breadcrumb
            items={[
              { title: <Link to="/">Trang chủ</Link> },
              { title: "Câu hỏi" },
            ]}
          />
        </div>
        {renderQuestionTypeButtons()}
        <div className="container-questions">
          <div className="info-question">
            <Flex>Số câu hỏi: {currentQuestionIndex + 1}/{questions.length}</Flex>
            {finalResult && <Flex>Điểm: {score}</Flex>}
            <Flex className="info-question-Progress" wrap="wrap" gap={30}>
              <Progress type="circle" percent={formatTime(timeLeft)} size="small" />
            </Flex>
          </div>
          {renderQuestionContent()}
          {showSubmitButton && (
            <div className="submit-button-container">
              <Button type="primary" onClick={handleSubmission}>Trả lời</Button>
              <Modal
                title="Xác nhận nộp bài"
                visible={isSubmitting}
                onOk={handleConfirmation}
                onCancel={() => setIsSubmitting(false)}
              >
                <p>Bạn có chắc chắn muốn trả lời không?</p>
              </Modal>
            </div>
          )}
          {!isSubmitting && finalResult && (
            <div>
              <div>Kết quả cuối cùng: {finalResult}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
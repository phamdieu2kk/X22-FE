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

 
  const handleScoreUpdate = (score) => {
    setTotalScore((prevTotalScore) => prevTotalScore + score);
  };


  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
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

  const handleOptionSelect = (option, isCorrect) => {
    // Thực hiện xử lý khi nhận được đáp án từ component con
    if (isCorrect) {
      // Nếu đáp án đúng, cập nhật điểm số và số câu đúng
      setScore((prevScore) => prevScore + 10);
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  
    // Cập nhật selectedAnswers
    setSelectedAnswers((prevSelectedAnswers) => {
      if (prevSelectedAnswers.includes(option)) {
        return prevSelectedAnswers.filter((answer) => answer !== option);
      } else {
        return [...prevSelectedAnswers, option];
      }
    });
  
    // Kiểm tra nếu chưa phải câu hỏi cuối cùng thì chuyển sang câu hỏi tiếp theo
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleGameOver(); // Nếu là câu hỏi cuối cùng thì kết thúc trò chơi
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
  // Hiển thị tổng điểm
  console.log("Tổng điểm:", totalScore);
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
      <div>
      {currentQuestionIndex < questions.length ? (
        <SingleChoice
        question={questions[currentQuestionIndex].question}
        answerList={questions[currentQuestionIndex].answerList}
        handleOptionSelect={handleOptionSelect}
        handleNextQuestion={handleNextQuestion}
        handleScoreUpdate={handleScoreUpdate} // Truyền hàm callback để cập nhật điểm số
      />
      ) : (
        // Hiển thị nút "Nộp bài" khi đã hoàn thành tất cả câu hỏi
        <Button type="primary" onClick={handleSubmission}>Nộp bài</Button>
      )}
    </div>
  );
};

  const renderMultipleChoiceQuestions = () => {
    return (
      <MultipleChoice
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswers={selectedAnswers}
        handleNextQuestion={handleNextQuestion}
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
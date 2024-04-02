import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Flex, Row, Col, Button, message } from "antd";
import { Link } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [score, setScore] = useState(0); // Initial score
  const [allQuestionsCompleted, setAllQuestionsCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [completedQuestions, setCompletedQuestions] = useState(0); // Track number of completed questions
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track number of correct answers
  const [selectedOptions, setSelectedOptions] = useState([]); // Track selected options for each question

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Here you can use a sample data instead of fetching from an API
        const sampleData = [
          {
            id: 1,
            question: "Câu hỏi 1: Có bao nhiêu cầu thủ được phép vào sân bóng đá??",
            options: [
              { id: "A", text: "11 cầu thủ", isCorrect: true },
              { id: "B", text: "10 cầu thủ", isCorrect: false },
              { id: "C", text: "9 cầu thủ", isCorrect: false },
              { id: "D", text: "12 cầu thủ", isCorrect: false }
            ]
          },
          {
            id: 2,
            question: "Câu hỏi 1: Có bao nhiêu cầu thủ được phép vào sân bóng đá??",
            options: [
              { id: "A", text: "11 cầu thủ", isCorrect: true },
              { id: "B", text: "10 cầu thủ", isCorrect: false },
              { id: "C", text: "9 cầu thủ", isCorrect: false },
              { id: "D", text: "12 cầu thủ", isCorrect: false }
            ]
          },
          // You can add more sample questions here
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
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleOptionSelect = (selectedOption, selectedQuestionId) => {
    if (selectedOptions[currentQuestionIndex]) {
      // If the question has already been answered, do nothing
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.options.find((option) => option.id === selectedOption);
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = selectedOption;
    setSelectedOptions(updatedSelectedOptions);
    if (selectedAnswer.isCorrect) {
      setScore((prevScore) => prevScore + 10); // Thay đổi giá trị từ prevScore + 1 thành prevScore + 10
      setCorrectAnswers((prevCount) => prevCount + 1); // Tăng số câu trả lời đúng lên 1
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCompletedQuestions((prevCount) => prevCount + 1); // Tăng số câu hỏi đã hoàn thành lên 1
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    // Calculate final result
    const result = `Số câu đúng: ${correctAnswers}/10`;
    setFinalResult(result);
    message.success("Trò chơi kết thúc");
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

        <div className="container-questions">
          <div className="info-question">
            <Flex>Số câu hỏi: {currentQuestionIndex + 1}/{questions.length}</Flex>
            <Flex>Điểm: {score}</Flex>
            <Flex>Thời gian: {formatTime(timeLeft)}</Flex>
          </div>
          {questions[currentQuestionIndex] && (
            <div>
              <h2 className="question">{questions[currentQuestionIndex].question}</h2>
              <Row gutter={[16, 16]}>
                {questions[currentQuestionIndex].options.map((option) => (
                  <Col span={12} key={option.id}>
                    <ul className="options">
                      <li className="option" onClick={() => handleOptionSelect(option.id, questions[currentQuestionIndex].id)}>
                        {`${option.id}. ${option.text}`}
                      </li>
                    </ul>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          {finalResult &&
            <h2>Kết quả cuối cùng: {finalResult}</h2>}
        </div>
      </div>
    </div>
  );
};

export default Questions;
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Flex, Row, Col, Button, message, Progress, Modal } from "antd"; // Thêm Modal từ antd
import { Link } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [score, setScore] = useState(0); // Initial score
  const [finalResult, setFinalResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [completedQuestions, setCompletedQuestions] = useState(0); // Track number of completed questions
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track number of correct answers
  const [selectedOptions, setSelectedOptions] = useState([]); // Track selected options for each question
  const [showSubmitButton, setShowSubmitButton] = useState(false); // Track whether to show the submit button
  const [isSubmitting, setIsSubmitting] = useState(false); // Track whether the user is submitting
  // Thêm state mới để theo dõi trạng thái thời gian đã dừng lại
  const [isTimePaused, setIsTimePaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0); // State để lưu trữ tổng thời gian đã dành cho trò chơi

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sử dụng dữ liệu mẫu thay vì lấy từ API
        const sampleData = [
          {
            type: "single-choice",
            question: "question 1625?",
            challengeName: "C1",
            answerList: [
              { value: "A", isCorrect: true },
              { value: "B", isCorrect: false },
              { value: "C", isCorrect: false },
              { value: "D", isCorrect: false }
            ]
          },
          {
            type: "multiple_choice",
            question: "Which planet is known as the Red Planet?",
            challengeName: "Space Trivia",
            answerList: [
              { value: "A", isCorrect: false },
              { value: "B", isCorrect: false },
              { value: "C", isCorrect: true },
              { value: "D", isCorrect: false }
            ]
          },
          // Thêm các câu hỏi khác tại đây
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
    if (selectedOptions[currentQuestionIndex] !== undefined) {
      // If the question has already been answered, do nothing
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answerList.find((answer) => answer.value === selectedOption);
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = selectedOption;
    setSelectedOptions(updatedSelectedOptions);
    if (selectedAnswer.isCorrect) {
      setScore((prevScore) => prevScore + 10); // Thay đổi giá trị prevScore + 10
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
    setIsTimePaused(true); // Tạm dừng thời gian
    setTotalTime(180 - timeLeft); // Tính tổng thời gian đã dành cho trò chơi

    // Calculate final result
    const result = `Số câu đúng: ${correctAnswers}/${questions.length}`;
    setFinalResult(result);
    setShowSubmitButton(true); // Show the submit button
    message.success("Trò chơi kết thúc");
  
    // Update timeLeft to 0 when the last question is completed
    setTimeLeft(0);
  };

  const handleSubmission = () => {
    setIsSubmitting(true); // Set isSubmitting to true
    if (completedQuestions === questions.length) {
      handleGameOver();
    }
  };

  const handleConfirmation = () => {
    setIsSubmitting(false); // Set isSubmitting to false
    // Process submission and show the final result
    const totalScore = correctAnswers * 10;
    const result = `Số câu đúng: ${correctAnswers}/${questions.length}. Điểm của bạn: ${totalScore}`;
    setFinalResult(result);
    setShowSubmitButton(false); // Ẩn nút "Nộp bài" sau khi nộp thành công
    // Hiển thị số điểm tổng kết và thời gian hoàn thành câu hỏi
    const totalTime = 180 - timeLeft;
    setTotalTime(totalTime);
  };



  const handleQuestionTypeSelect = (type) => {
    // Xử lý khi chọn loại câu hỏi
    setQuestionType(type);
    setCurrentQuestionIndex(0); // Reset lại chỉ số câu hỏi khi chọn loại câu hỏi mới
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
  
        <div className="question-types">
            <Button onClick={() => handleQuestionTypeSelect("single-choice")}>Lựa chọn duy nhất</Button>
            <Button onClick={() => handleQuestionTypeSelect("multiple-choice")}>Nhiều lựa chọn</Button>
            <Button onClick={() => handleQuestionTypeSelect("arrange")}>Sắp xếp</Button>
          </div>


        <div className="container-questions">
          <div className="info-question">
            <Flex>Số câu hỏi: {currentQuestionIndex + 1}/{questions.length}</Flex>
            {finalResult && <Flex>Điểm: {score}</Flex>} {/* Only display score when final result is shown */}
            <Flex className="info-question-Progress" wrap="wrap" gap={30}>
              <Progress strokeColor="#1890ff" type="circle" percent={formatTime(timeLeft)} size="small"  />
            </Flex>
          </div>
          {questions[currentQuestionIndex] && (
            <div>
              <h2 className="question">{questions[currentQuestionIndex].question}</h2>
              <Row gutter={[16, 16]}>
                {questions[currentQuestionIndex].answerList.map((answer) => (
                  <Col span={12} key={answer.value}>
                    <ul className="options">
                      <li className="option" onClick={() => handleOptionSelect(answer.value)}>
                        {`${answer.value}. ${answer.text}`}
                      </li>
                    </ul>
                  </Col>
                ))}
              </Row>
              {showSubmitButton && (
                <div className="submit-button-container">
                  <Button type="primary" onClick={handleSubmission}>Trả lời</Button>
                  <Modal
                    title="Xác nhận nộp bài"
                    open={isSubmitting}
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
                  <div>Tổng thời gian: {formatTime(totalTime)}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
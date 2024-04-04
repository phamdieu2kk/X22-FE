import "./style.css";
import { useEffect, useState } from "react";
import { Breadcrumb, Flex, Row, Col, Button, message, Progress, Modal } from "antd"; // Thêm Modal từ antd
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [score, setScore] = useState(0); // Initial score
  const [finalResult, setFinalResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [completedQuestions, setCompletedQuestions] = useState(0); // Track number of completed questions
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track number of correct answers
  const [selectedOptions, setSelectedOptions] = useState(Array.from({ length: questions.length }, () => []));
  const [showSubmitButton, setShowSubmitButton] = useState(false); // Track whether to show the submit button
  const [isSubmitting, setIsSubmitting] = useState(false); // Track whether the user is submitting
  // Thêm state mới để theo dõi trạng thái thời gian đã dừng lại
  const [isTimePaused, setIsTimePaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0); // State để lưu trữ tổng thời gian đã dành cho trò chơi
  const [questionType, setQuestionType] = useState(null); // State để lưu trữ loại câu hỏi được chọn
  const [selectedButtonType, setSelectedButtonType] = useState(null);
  const [currentQuestionType, setCurrentQuestionType] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  // Thêm state mới để theo dõi trạng thái đã trả lời của mỗi câu hỏi
const [answeredQuestions, setAnsweredQuestions] = useState(Array.from({ length: questions.length }, () => false));
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sử dụng dữ liệu mẫu thay vì lấy từ API
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
       
          // {
          //   type: "arrange",
          //   question: ""Sắp xếp các màu sau theo thứ tự của cầu vồng:",
          //   challengeName: "Color Order Quiz",
          //   elements: [
          //     { text: "Red" },
          //     { text: "Orange" },
          //     { text: "Yellow" },
          //     { text: "Green" },
          //     { text: "Blue" },
          //     { text: "Indigo" },
          //     { text: "Violet" }
          //   ]
          // },
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
    // Chỉ tính thời gian khi người dùng đã bắt đầu trả lời
    if (isAnswering) {
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
    }
  }, [isAnswering]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleOptionSelect = (selectedOption, selectedQuestionId) => {
    if (!isAnswering) {
      setIsAnswering(true);
    }
    // Kiểm tra xem câu hỏi đã được trả lời chưa
    if (answeredQuestions[currentQuestionIndex]) {
      return; // Nếu đã trả lời rồi thì không làm gì cả
    }
    
    // Đánh dấu câu hỏi này là đã trả lời
    const updatedAnsweredQuestions = [...answeredQuestions];
    updatedAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(updatedAnsweredQuestions);
  
    if (selectedOptions[currentQuestionIndex] !== undefined) {

// Nếu câu hỏi đã được trả lời rồi thì không làm gì cả  return;
    }
    // Tiếp tục xử lý như bình thường
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

  // Hàm xử lý khi trò chơi kết thúc
  const handleGameOver = () => { 
    setIsTimePaused(true); // Tạm dừng thời gian
    setTotalTime(180 - timeLeft); // Tính tổng thời gian đã dành cho trò chơi

    // Calculate final result
    const result = `Số câu đúng: ${correctAnswers}/${questions.length}`;
    setFinalResult(result);
    setShowSubmitButton(true); // Show the submit button
    message.success("Trò chơi kết thúc");
  
    // Update timeLeft to 0 when the last question is completed
  
  };

  const handleSubmission = () => {
    setIsSubmitting(true); // Set isSubmitting to true
    if (completedQuestions === questions.length) {
      handleGameOver();
    }
  };

  const handleConfirmation = () => {
    setIsSubmitting(false); // Set isSubmitting to false
    
// Xử lý submit và hiển thị kết quả cuối cùng
    const totalScore = correctAnswers * 10;
    const result = `Số câu đúng: ${correctAnswers}/${questions.length}. Điểm của bạn: ${totalScore}`;
    setFinalResult(result);
    setShowSubmitButton(false); // Ẩn nút "Nộp bài" sau khi nộp thành công
    // Hiển thị số điểm tổng kết và thời gian hoàn thành câu hỏi
    const totalTime = timeLeft;
    setTotalTime(totalTime);
  };



  // Hàm xử lý sự kiện khi chọn loại câu hỏi
  const handleQuestionTypeSelect = (type) => {
    setQuestionType(type);
    setSelectedButtonType(type);
    setCurrentQuestionIndex(0); // Reset lại chỉ số câu hỏi khi chọn loại câu hỏi mới
  };
  const isButtonSelected = (type) => {
  return selectedButtonType === type ? 'primary' : 'default';
};





 // Render câu hỏi tùy thuộc vào loại câu hỏi được chọn
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




  // Render các nút lựa chọn loại câu hỏi với màu tương ứng
  const renderQuestionTypeButtons = () => (
    <div className="question-types">
      <Button type={isButtonSelected("single-choice")} onClick={() => handleQuestionTypeSelect("single-choice")}>Lựa chọn duy nhất</Button>
      <Button type={isButtonSelected("multiple-choice")} onClick={() => handleQuestionTypeSelect("multiple-choice")}>Nhiều lựa chọn</Button>
      <Button type={isButtonSelected("arrange")} onClick={() => handleQuestionTypeSelect("arrange")}>Sắp xếp</Button>
    </div>
  );

  
  // Render câu hỏi loại lựa chọn duy nhất
const renderSingleChoiceQuestions = () => (
  <div>
    {questions[currentQuestionIndex] && (
      <div>
        <h2 className="question">{questions[currentQuestionIndex].question}</h2>
        <Row gutter={[16, 16]}>
          {questions[currentQuestionIndex].answerList.map((answer) => (
            <Col span={12} key={answer.value}>
              <ul className="options-single-choice">
                <li className="option-single-choice" onClick={() => handleOptionSelect(answer.value)}>
                  {`${answer.value}. ${answer.text}`}
                </li>
              </ul>
            </Col>
          ))}
        </Row>
      </div>
    )}
  </div>
);

// Render câu hỏi loại nhiều lựa chọn 
const renderMultipleChoiceQuestions = () => (
  <div>
    {questions[currentQuestionIndex] && (
      <div>
        <h2 className="question">{questions[currentQuestionIndex].question}</h2>
        <Row gutter={[16, 16]}>
          {questions[currentQuestionIndex].answerList.map((answer) => (
            <Col span={12} key={answer.value}>
              <ul className="options-multiple-choice">
                <li className="option-multiple-choice" onClick={() => handleOptionSelect(answer.value)}>
                  {`${answer.value}. ${answer.text}`}
                </li>
              </ul>
            </Col>
          ))}
        </Row>
      </div>
    )}
  </div>
);

// Render câu hỏi loại sắp xếp
const renderArrangeQuestions = () => {
  if (questionType === "arrange" && questions[currentQuestionIndex]) {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div>
        <h2 className="question">{currentQuestion.question}</h2>
        <DragDropContext>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {currentQuestion.elements.map((element, index) => (
                  <Draggable key={element.text} draggableId={element.text} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Button type={isButtonSelected("")}>{element.text}</Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
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
              open={isSubmitting} // Sửa  visible thành open
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
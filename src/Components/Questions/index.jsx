import { Breadcrumb , Flex} from "antd";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5173/questions');
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return (
      <div>
        <h1>Quiz Completed!</h1>
        <p>Your score: {score}</p>
        {/* Display other summary details */}
      </div>
    );
  }

  
  return (
    <>
      <div className="content">
        <div className="title-home">
          <Breadcrumb
            items={[
              { title: <Link to="/">Trang chủ</Link> },
              { title: "Câu hỏi" },
            ]}
          />
          
          {/* <Flex className="flexbox-items">
            <div className="item-0" />
            <div className="item-1" />
            <div className="item-2" />
            <div className="item-3" />
          </Flex>  */}
          

          <div>
        <h1>Question {currentQuestionIndex + 1}</h1>
        <p>{questions[currentQuestionIndex]?.question}</p>
        <div>
          {questions[currentQuestionIndex]?.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelection(option)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>




          
          </div>
      </div>
    </>
  );
};

export default Questions;
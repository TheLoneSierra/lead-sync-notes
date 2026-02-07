import { useState, useEffect } from "react";
import QuizBox from "./QuizBox";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStyle, setModalStyle] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setPoints((prevPoints) => prevPoints + 1);
      setModalMessage("🎉 Correct!");
      setModalStyle("correct");
    } else {
      setModalMessage("Oops! Try Again. 😞");
      setModalStyle("incorrect");
    }
    setShowModal(true);
  };

  const handleQuizFinish = () => {
    setQuizFinished(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="quiz-container">
      <div className={showModal ? "overlay active" : "overlay"}></div>

      {!quizFinished ? (
        <>
          <div className="quiz-scroll-container">
            {questions.slice(0, 10).map((question) => (
              <div
                key={question.id}
                className="quiz-item"
                style={{
                  transform: `translateX(-${currentQuestionIndex * 100}%)`,
                }}
              >
                <QuizBox question={question} onAnswer={handleAnswer} />
              </div>
            ))}
          </div>
          <div className="quiz-navigation">
            <button
              onClick={handlePrevious}
              className="nav-btn"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="nav-btn"
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
          <button onClick={handleQuizFinish} className="finish-btn">
            Finish Quiz
          </button>
        </>
      ) : (
        <div className="summary">
          <h2>Quiz Finished!</h2>
          <p>You scored {points} out of 10 points.</p>
        </div>
      )}

      {showModal && (
        <div className={`modal ${modalStyle}`}>
          <div className="modal-content">
            <h2>{modalMessage}</h2>
            <button
              onClick={() => setShowModal(false)}
              className="modal-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;

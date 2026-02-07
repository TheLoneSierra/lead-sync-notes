import { useState } from "react";
const QuizBox = ({ question, onAnswer }) => {
  const [showSolution, setShowSolution] = useState(false);

  const handleOptionClick = (isCorrect) => {
    onAnswer(isCorrect);
  };

  const handleShowSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="quiz-box">
      <div className="question">{question.description}</div>
      <div className="options">
        {question?.options?.map((option) => (
          <div
            key={option.id}
            className="option"
            onClick={() => handleOptionClick(option.is_correct)}
          >
            <div className="option-text">{option.description}</div>
          </div>
        ))}
      </div>

      <div className="solution-btn-container">
        <button onClick={handleShowSolution} className="solution-btn">
          Detailed Solution
        </button>
      </div>

      {showSolution && (
        <div className="detailed-solution">
          <p>{question.detailed_solution}</p>
        </div>
      )}
    </div>
  );
};

export default QuizBox;

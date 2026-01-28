import happyCat from "./img/happyCat.jpg";
import "./Result.css";

const Result = ({ score, total }) => {
  const percentage = Math.round((score / total) * 100);

  const chartStyle = {
    "--percentage": `${percentage}%`,
    "--color": percentage > 50 ? "#4facfe" : "#ff4b2b",
  };

  const resetQuizButton = () => {
    window.location.reload();
  };

  return (
    <div className="result">
      {}
      <div className="result__chart-container">
        <div className="result__chart" style={chartStyle}>
          <div className="result__chart-inner">{percentage}%</div>
        </div>
      </div>

      <div className="result__image">
        <img src={happyCat} alt="Cat" />
      </div>

      <p className="result__score">
        You got {score} out of {total} correct!
      </p>

      <button className="result__button" onClick={resetQuizButton}>
        Try Again
      </button>
    </div>
  );
};

export default Result;

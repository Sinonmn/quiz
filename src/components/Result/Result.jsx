import happyCat from "../../assets/happyCat.jpg";
import sadCat from "../../assets/sadCat.jpg";
import "./Result.css";

const Result = (props) => {
  const { score, total, resetQuizButton } = props;
  const percentage = Math.round((score / total) * 100);

  const chartStyle = {
    "--percentage": `${percentage}%`,
    "--color": percentage > 50 ? "#4facfe" : "#ff4b2b",
  };

  return (
    <div className="result fade-in">
      <div className="result__chart-container">
        <div className="result__chart" style={chartStyle}>
          <div className="result__chart-inner">{percentage}%</div>
        </div>
      </div>

      <div className="result__image">
        {percentage > 50 ? (
          <img src={happyCat} alt="Cat" />
        ) : (
          <img src={sadCat} alt="Cat" />
        )}
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

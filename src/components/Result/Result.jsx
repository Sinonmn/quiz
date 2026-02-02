import happyCat from "../../assets/happyCat.jpg";
import sadCat from "../../assets/sadCat.jpg";
import "./Result.css";
import { Link } from "react-router";

const Result = (props) => {
  const { score, total, resetQuizButton } = props;
  const percentage = Math.round((score / total) * 100);

  const chartStyle = {
    "--percentage": `${percentage}%`,
    "--color": percentage > 50 ? "#4facfe" : "#ff4b2b",
  };

  return (
    <div className="result-page">
      {" "}
      {}
      <div className="result fade-in">
        <div className="result__chart-container">
          <div className="result__chart" style={chartStyle}>
            <div className="result__chart-inner">{percentage}%</div>
          </div>
        </div>

        <div className="result__image">
          <img src={percentage > 50 ? happyCat : sadCat} alt="Cat Result" />
        </div>

        <p className="result__score">
          You got {score} out of {total} correct!
        </p>

        <div className="result__actions">
          <button className="result__button" onClick={resetQuizButton}>
            Try Again
          </button>
          <Link  className="result__button" to="/">
            Back to the main page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;

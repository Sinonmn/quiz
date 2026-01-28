import "./FullScreenFeedback.css";
import happyCat from "../../assets/happyCat.jpg";
import sadCat from "../../assets/sadCat.jpg";
const FullScreeenFeedback = (props) => {
  const { type } = props;

  const isCorrect = type === "correct";
  const message = isCorrect ? "Correct!" : "Incorrect !";
  const icon = isCorrect ? happyCat : sadCat;
  return (
    <>
      <div className={`fullscreen-feedback ${type}-feedback`}>
        <div className="feedback-content">
          <div className="feedback-icon">
            <img src={icon} alt="" />
          </div>
          <h2 className="feedback-message">{message}</h2>
        </div>
      </div>
    </>
  );
};

export default FullScreeenFeedback;

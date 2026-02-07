import "./Quiz.css";
import Img from "../Img/Img.jsx";
const Quiz = (props) => {
  const { step, questionData, total, onClickVariant, hasImg } = props;

  if (!questionData) return null;

  const percentage = Math.round((step / total) * 100);

  return (
    <div className="quiz-wrapper">
      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner"
        ></div>
      </div>
      <div className="quiz fade-in" key={step}>
        <h1 className="quiz__title">{questionData.question}</h1>

        {}
        {(hasImg || questionData.image) && (
          <Img src={questionData.image} alt={questionData.question} />
        )}

        <ul className="quiz__items">
          {questionData.options.map((text, index) => (
            <li
              className="quiz__item"
              onClick={() => onClickVariant(text)}
              key={`${step}-${index}`}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Quiz;

import "./Quiz.css";

const Quiz = (props) => {
  const { step, questionData, total, onClickVariant } = props;
  const percentage = Math.round((step / total) * 100);
  return (
    <>
      <div className="quiz-wrapper">
        <div className="progress">
          <div
            style={{ width: `${percentage}%` }}
            className="progress__inner"
          ></div>
        </div>
        <div className="quiz fade-in" key={step}>
          <h1 className="quiz__title">{questionData.question}</h1>
          <div className="quiz__img ">
            <img src={questionData.image} alt="" />
          </div>
          <ul className="quiz__items">
            {questionData.options.map((text) => (
              <li
                className="quiz__item"
                onClick={() => onClickVariant(text)}
                key={`${questionData.id}-${text}`}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Quiz;

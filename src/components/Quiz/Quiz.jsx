import "./Quiz.css";

const Quiz = (props) => {
  const { step, questionData, total, onClickVariant } = props;
  const precentage = Math.round((step / total) * 100);
  return (
    <>
      <div className="progress">
        <div
        // style={{ width: `${percentage}%` }}
        // className="progress__inner"
        ></div>
      </div>

      <div className="quiz">
        <h1 className="quiz__title">{questionData.question}</h1>
        <img className="quiz__img" src={questionData.image} alt="" />
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
    </>
  );
};

export default Quiz;

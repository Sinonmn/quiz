const Quiz = (props) => {
  const { step, question, total, onClickVariant } = props;
  const precentage = Math.round((step / total) * 100);
  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner"
        ></div>
      </div>

      <div>
        <div>{title}</div>
        <ul>
          {question.options.map((text, index) => {
            <li key={text} onClick={() => onClickVariant(index)}>
              {text}
            </li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Quiz;

import { useState } from "react";

const QuizSearchForm = () => {
  const [quizId, setQuizId] = useState("");

  const navigateToQuiz = (event) => {
    event.preventDefault();
    const trimmedId = quizId.trim();
    window.location.href = `https://quiz-ashen-pi.vercel.app/quiz/${trimmedId}`;
  };

 // console.log("quizsearchform kfjdskfj");

  return (
    <>
      <form className="main-form" onSubmit={navigateToQuiz}>
        <input
          className="main-content__link"
          type="text"
          placeholder="Select Your Id"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
        />
        <button className="main-form__button">Go</button>
      </form>
    </>
  );
};

export default QuizSearchForm;

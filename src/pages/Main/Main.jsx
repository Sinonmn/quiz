import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Main.css";
import { Link } from "react-router";
import Slider from "../../components/Slider/Slider.jsx";
import { useState } from "react";

const Main = () => {
  const [quizId, setQuizId] = useState("");

  const navigateToQuiz = (event) => {
    event.preventDefault();
    const trimmedId = quizId.trim();
    window.location.href = `https://quiz-ashen-pi.vercel.app/quiz/${trimmedId}`;
  };
  return (
    <>
      <div className="app-container">
        <Header />
        <main className="main">
          <div className="main__content main-content">
            <p>Try To Complete This Quiz</p>
            <div className="main-content__links">
              <Link className="main-content__link" to="/quiz">
                Cat Quiz
              </Link>
              <Link className="main-content__link" to="/createQuiz">
                Create Your Own Quiz
              </Link>
            </div>
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
          </div>
          <div className="main__slider">
            <Slider />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Main;

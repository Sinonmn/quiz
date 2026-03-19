import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Main.css";
import { Link } from "react-router";
import Slider from "../../components/Slider/Slider.jsx";
import { useMemo, useState } from "react";
import QuizSearchForm from "../../components/QuizSearchForm/QuizSearchForm.jsx";
//console.log("download Main");
const Main = () => {
// console.log("main mounted");
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
            <QuizSearchForm />
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

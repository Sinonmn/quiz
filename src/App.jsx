import { useState, useEffect } from "react";
import "./reset.css";
import questions from "./data/questions.json";
import { fetchCatImages } from "./services/catServise.js";
import Quiz from "./components/quiz/quiz.jsx";
import Result from "./components/Result/Result.jsx";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
import FullScreeenFeedback from "./components/FullScreenFeedback/FullScreenFeedback.jsx";
import happyCat from "./assets/happyCat.jpg";
import sadCat from "./assets/sadCat.jpg";

function App() {
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const prepareQuiz = async () => {
      if (quizData.length > 0) return;

      setLoading(true);
      try {
        const images = await fetchCatImages();

        if (isMounted) {
          const combinedData = questions.map((question, index) => ({
            ...question,
            image: images[index].url,
          }));
          setQuizData(combinedData);
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    prepareQuiz();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    [happyCat, sadCat].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleNext = (selectedAnswer) => {
    if (feedback) return;
    const correctAnswer = quizData[currentIndex].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
    if (isCorrect) {
      setScore((prev) => {
        const newScore = prev + 1;
        return newScore;
      });
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex((prev) => prev + 1);
    }, 1200);
  };

  const resetQuizButton = () => {
    setCurrentIndex(0);
    setScore(0);
  };

  const isFinished = currentIndex >= quizData.length;

  if (loading && quizData.length === 0) {
    return (
      <div className="pre-react-loader">
        <div class="loader-circle"></div>
      </div>
    );
  }
  if (quizData.length === 0 && !loading) return <ErrorPage />;

  return (
    <div className="App">
      {feedback && <FullScreeenFeedback type={feedback} />}
      {!isFinished ? (
        <Quiz
          questionData={quizData[currentIndex]}
          total={quizData.length}
          step={currentIndex}
          onClickVariant={handleNext}
        />
      ) : (
        <Result
          total={quizData.length}
          score={score}
          resetQuizButton={resetQuizButton}
        />
      )}
    </div>
  );
}

export default App;

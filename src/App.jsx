import { useState, useEffect } from "react";
import "./reset.css";
import questions from "./data/questions.json";
import { fetchCatImages } from "./services/catServise.js";
import Quiz from "./components/Quiz/Quiz.jsx";
import Result from "./components/Result/Result.jsx";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
import FullScreeenFeedback from "./components/FullScreenFeedback/FullScreenFeedback.jsx";
import happyCat from "./assets/happyCat.jpg";
import sadCat from "./assets/sadCat.jpg";

function App() {
  const [quizData, setQuizData] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [catUrls, setCatUrls] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      const images = await fetchCatImages();
      if (isMounted && images.length > 0) {
        setCatUrls(images.map((img) => img.url));
      }
    };
    loadImages();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const nextIndex = currentIndex + 1;
    if (catUrls[nextIndex]) {
      const img = new Image();
      img.src = catUrls[nextIndex];
    }
    [happyCat, sadCat].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [currentIndex, catUrls]);

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

  if (!quizData || quizData.length === 0) {
    return <ErrorPage />;
  }
  console.log("current cat", catUrls[currentIndex]);
  if (catUrls.length === 0) {
    return (
      <div className="pre-react-loader">
        <div className="loader-circle"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {feedback && <FullScreeenFeedback type={feedback} />}
      {!isFinished ? (
        <Quiz
          key={currentIndex}
          hasImg={true}
          questionData={{
            ...quizData[currentIndex],
            image: catUrls[currentIndex] || null,
          }}
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

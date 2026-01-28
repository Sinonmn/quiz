import { useState, useEffect } from "react";
import "./reset.css";
import questions from "./data/questions.json";
import { fetchCatImages } from "./services/catServise.js";
import Quiz from "./components/quiz/quiz.jsx";
import Result from "./components/result/Result.jsx";
import LoadingPage from "./pages/loadingPage/LoadingPage.jsx";

function App() {
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

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

  const handleNext = (selectedAnswer) => {
    const correctAnswer = quizData[currentIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      setScore((prev) => {
        const newScore = prev + 1;
        console.log(newScore);
        return newScore;
      });
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const resetQuizButton = () => {
    setCurrentIndex(0);
    setScore(0);
  };

  const isFinished = currentIndex >= quizData.length;

  if (loading && quizData.length === 0) return <LoadingPage />;
  if (quizData.length === 0 && !loading) return <h1>Error</h1>;

  return (
    <div className="App">
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

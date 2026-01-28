import { useState, useEffect } from "react";
import "./reset.css";
import questions from "./data/questions.json";
import { fetchCatImages } from "./services/catServise.js";
import Quiz from "./components/quiz/quiz.jsx";
import Result from "./components/result/Result.jsx";

function App() {
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const isFinished = currentIndex >= quizData.length;

  if (loading && quizData.length === 0) return <h1>Loading...</h1>;
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
        <Result />
      )}
    </div>
  );
}

export default App;

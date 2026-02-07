import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Quiz from "../../components/Quiz/Quiz.jsx";
import Result from "../../components/Result/Result.jsx";
import FullScreeenFeedback from "../../components/FullScreenFeedback/FullScreenFeedback.jsx";
import ErrorPage from "../errorPage/ErrorPage.jsx";

const QuizPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const handleNext = (selectedAnswer) => {
    const correctAnswer = quizData[currentIndex].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
    if (isCorrect) {
      setScore((score) => {
        const newScore = score + 1;
        return newScore;
      });
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const resetQuizButton = () => {
    setCurrentIndex(0);
    setScore(0);
  };
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  useEffect(() => {
    fetch(`${API_URL}/api/quiz/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Квиз не найден");
        return res.json();
      })
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading </div>;
  if (!quizData) return <ErrorPage />;

  const isFinished = currentIndex >= quizData.length;

  return (
    <div>
      <h1
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}
      >
        Quiz ID: {id}
      </h1>
      {feedback && <FullScreeenFeedback type={feedback} />}
      {!isFinished ? (
        <Quiz
          hasImage={false}
          questionData={quizData[currentIndex]}
          total={quizData.length}
          step={currentIndex}
          onClickVariant={handleNext}
        />
      ) : (
        <Result
          score={score}
          total={quizData.length}
          resetQuizButton={resetQuizButton}
        />
      )}
    </div>
  );
};

export default QuizPage;

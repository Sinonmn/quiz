import { useState, useEffect, use } from "react";
import questions from "./data/questions.json"; // Твой локальный JSON
import { fetchCatImages } from "./services/catServise.js";
import Quiz from "./components/quiz/quiz.jsx";
import Result from "./components/result/Result.jsx";
function App() {
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const prepareQuiz = async () => {
      setLoading(true);
      try {
        const images = await fetchCatImages();

        const combinedData = questions.map((question, index) => {
          return {
            ...question,
            image: images[index]?.url || "Not found",
          };
        });
        setQuizData((prev) => combinedData);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };

    prepareQuiz();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return <>{step !== quizData.length ? <Quiz></Quiz>

	: <Result />}</>;
}
export default App;

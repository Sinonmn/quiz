import { useEffect, useState } from "react";
import { useParams } from "react-router";

const QuizPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((err) => console.error("Ошибка:", err));
  }, [id]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Quiz ID: {id}</h1>
      <pre>{JSON.stringify(quizData, null, 2)}</pre>
    </div>
  );
};
export default QuizPage;

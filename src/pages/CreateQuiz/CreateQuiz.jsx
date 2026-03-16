import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./CreateQuiz.css";
import "react-responsive-modal/styles.css";

const CreateQuiz = () => {
  const [slides, setSlides] = useState([
    { id: Date.now(), question: "", options: ["", ""], correctAnswer: null },
  ]);
  const [open, setOpen] = useState(false);

  const [currectSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const currentSlide = slides[currectSlideIndex];

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      question: "",
      options: ["", ""],
      correctAnswer: null,
    };
    setSlides([...slides, newSlide]);
  };

  const addOption = (e) => {
    e.preventDefault();
    if (currentSlide.options.length < 4) {
      const updatedSlides = [...slides];
      updatedSlides[currectSlideIndex] = {
        ...updatedSlides[currectSlideIndex],
        options: [...updatedSlides[currectSlideIndex].options, ""],
      };
      setSlides(updatedSlides);
    }
  };

  const updateQuestion = (text) => {
    const updatedSlides = [...slides];
    updatedSlides[currectSlideIndex] = {
      ...updatedSlides[currectSlideIndex],
      question: text,
    };
    setSlides(updatedSlides);
  };

  const updateOptionText = (optionIndex, text) => {
    const updatedSlides = slides.map((slide, idx) => {
      if (idx === currectSlideIndex) {
        const newOptions = [...slide.options];
        const oldText = newOptions[optionIndex];
        newOptions[optionIndex] = text;

        let newCorrectAnswer = slide.correctAnswer;
        if (slide.correctAnswer === oldText && oldText !== "") {
          newCorrectAnswer = text;
        }

        return {
          ...slide,
          options: newOptions,
          correctAnswer: newCorrectAnswer,
        };
      }
      return slide;
    });

    setSlides(updatedSlides);
  };
  const toggleCorrectAnswer = (index) => {
    const textAtThisIndex = currentSlide.options[index];

    if (!textAtThisIndex) return;

    const updatedSlides = slides.map((slide, idx) => {
      if (idx === currectSlideIndex) {
        return {
          ...slide,

          correctAnswer:
            slide.correctAnswer === textAtThisIndex ? null : textAtThisIndex,
        };
      }
      return slide;
    });

    setSlides(updatedSlides);
  };
  const isQuizValid = slides.every((slide) => {
    const hasQuestion = slide.question.trim() !== "";
    const hasAtLeastTwoOptions =
      slide.options.filter((opt) => opt.trim() !== "").length >= 2;
    const hasCorrectAnswer =
      slide.correctAnswer !== null && slide.correctAnswer !== "";

    return hasQuestion && hasAtLeastTwoOptions && hasCorrectAnswer;
  });
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  const handleCreateQuiz = async () => {
    if (!isQuizValid) {
      if (!isQuizValid) {
        toast.error("Check your slides! Missing question or correct answer.", {
          duration: 3000,
          position: "top-right",

          style: {
            backgroundColor: "#ff4b4b",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ff4b4b",
          },
        });
        return;
      }
    }
    if (isSending) return;
    setIsSending(true);
    try {
      console.log("handleCreateQuiz start");
      const response = await fetch(`${API_URL}/api/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      console.log(
        "fetch finished, status",
        response.status,
        response.statusText,
      );
      const text = await response.text();
      console.log("raw text:", text);
      let data;
      try {
        data = JSON.parse(text);
        console.log("parsed JSON:", data);
      } catch (e) {
        console.error("Failed to parse JSON response", e);
        throw new Error("Invalid JSON response from server");
      }

      if (data.id) {
        console.log("POST response:", data);
        console.log("Navigate to:", `/quiz/${data.id}`);
        window.location.href = `/quiz/${data.id}`;
      } else {
        console.warn("Server replied without id", data);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <>
      <Toaster />
      <div className="quiz-creator ">
        <aside className="quiz-creator__sidebar sidebar">
          <button onClick={addSlide} className="add-slide-button">
            +
          </button>
          <div className="sidebar__slides-list">
            {slides.map((slide, index) => (
              <div
                className={`slide-preview ${index === currectSlideIndex ? "active" : ""}`}
                onClick={() => setCurrentSlideIndex(index)}
                key={`${slide}-${index}`}
              >
                <span>{index + 1}</span>
                <div className="preview-box">{slide.question || "Empty"}</div>
              </div>
            ))}
          </div>
        </aside>
        <main className="quiz-creator__editor">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Put your question here..."
              value={currentSlide.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="question-input"
            />
            <div className="options-grid">
              {currentSlide.options.map((option, index) => (
                <div key={index} className="option-wrapper">
                  <button
                    type="button"
                    className={`correct-indicator ${currentSlide.correctAnswer === option && option !== "" ? "correct" : ""}`}
                    onClick={() => toggleCorrectAnswer(index)}
                  >
                    ✔
                  </button>
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOptionText(index, e.target.value)}
                    className="option-input"
                  />
                </div>
              ))}
              {currentSlide.options.length < 4 && (
                <button className="add-option-button" onClick={addOption}>
                  Add Option
                </button>
              )}
            </div>
            <button
              type="button"
              className="button-create-quiz"
              onClick={handleCreateQuiz}
              disabled={isSending}
            >
              {isSending ? "Creating..." : "Create Quiz"}
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default CreateQuiz;

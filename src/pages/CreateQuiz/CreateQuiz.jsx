import { useState } from "react";
import "./CreateQuiz.css";

const CreateQuiz = () => {
  const [slides, setSlides] = useState([
    { id: Date.now(), question: "", options: ["", ""], correctAnswer: null },
  ]);

  const [currectSlideIndex, setCurrentSlideIndex] = useState(0);

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
    const updatedSlides = [...slides];
    const newOptions = [...updatedSlides[currectSlideIndex].options];
    newOptions[optionIndex] = text;

    updatedSlides[currectSlideIndex] = {
      ...updatedSlides[currectSlideIndex],
      options: newOptions,
    };
    setSlides(updatedSlides);
  };

  const toggleCorrectAnswer = (index) => {
    const updatedSlides = [...slides];
    const current = updatedSlides[currectSlideIndex];
    current.correctAnswer = current.correctAnswer === index ? null : index;
    setSlides(updatedSlides);
  };

  return (
    <>
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
                    className={`correct-indicator ${currentSlide.correctAnswer === index ? "correct" : ""}`}
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
          </form>
          <button className="button-create-quiz">Create Quiz</button>
        </main>
      </div>
    </>
  );
};

export default CreateQuiz;

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`-> ${req.method} ${req.url}`);
  next();
});

let quizes = {};

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/api/send", (req, res) => {
  try {
    const id = Date.now().toString();

    if (!req.body || !req.body.slides) {
      return res.status(400).json({ error: "No slides provided" });
    }

    quizes[id] = req.body.slides;
    console.log(`-> Saved quiz with id: ${id}`);

    res.json({ status: "ok", id });
  } catch (err) {
    console.error("Error saving quiz:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/quiz/:id", (req, res) => {
  const quizId = req.params.id;
  const quiz = quizes[quizId];

  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).json({ error: "Quiz not found" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

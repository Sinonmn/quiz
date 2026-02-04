// Приём POST-запроса с фронта

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Логирование всех входящих запросов — помогает отладить preflight и POST
app.use((req, res, next) => {
  console.log(`-> ${req.method} ${req.url}`);
  if (req.url === "/api/send") {
    console.log("  headers:", req.headers);
  }
  next();
});

const quizes = {};

app.options("/api/send", (req, res) => {
  console.log("-> OPTIONS /api/send (preflight)");
  console.log("  headers:", req.headers);
  res.sendStatus(204);
});

app.post("/api/send", (req, res) => {
  const id = Date.now().toString();
  console.log("-> POST /api/send body:", req.body);
  console.log("  headers:", req.headers);
  quizes[id] = req.body.slides || req.body;
  // Return id and echo received body so the client can verify
  res.setHeader("X-Quiz-Server", "local-3001");
  res.json({ status: "ok", id, received: req.body });
});

app.get("/api/quiz/:id", (req, res) => {
  const quizId = req.params.id;
  const quiz = quizes[quizId];
  if (quiz) {
    res.setHeader("X-Quiz-Server", "local-3001");
    res.json(quiz);
  } else {
    res.status(404).json({ error: "Quiz not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (pid=${process.pid})`);
});

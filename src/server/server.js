const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // Импортируем работу с базой

const app = express();
const PORT = process.env.PORT || 8000;

// Настройка подключения к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Обязательно для Render
  },
});

app.use(cors());
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`-> ${req.method} ${req.url}`);
  next();
});

// Автоматическое создание таблицы при запуске, если её нет
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quizes (
        id TEXT PRIMARY KEY,
        slides JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("-> Database table is ready");
  } catch (err) {
    console.error("-> Error initializing database:", err);
  }
};
initDb();

app.get("/", (req, res) => {
  res.send("Server with Postgres is running!");
});

// Сохранение квиза в базу
app.post("/api/send", async (req, res) => {
  try {
    const id = Date.now().toString();

    if (!req.body || !req.body.slides) {
      return res.status(400).json({ error: "No slides provided" });
    }

    const slides = req.body.slides;

    // Сохраняем в таблицу quizes
    await pool.query("INSERT INTO quizes (id, slides) VALUES ($1, $2)", [
      id,
      JSON.stringify(slides),
    ]);

    console.log(`-> Saved quiz to DB with id: ${id}`);
    res.json({ status: "ok", id });
  } catch (err) {
    console.error("Error saving quiz to DB:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Получение квиза из базы
app.get("/api/quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;

    // Ищем в базе по id
    const result = await pool.query("SELECT slides FROM quizes WHERE id = $1", [
      quizId,
    ]);

    if (result.rows.length > 0) {
      res.json(result.rows[0].slides);
    } else {
      console.log(`-> Quiz not found in DB: ${quizId}`);
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch (err) {
    console.error("Error fetching quiz from DB:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
import Main from "./pages/Main/Main.jsx";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz.jsx";
import QuizPage from "./pages/QuizPage/QuizPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/createQuiz", element: <CreateQuiz /> },
        { path: "/quiz", element: <QuizPage /> },
        { path: "/quiz/:id", element: <QuizPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.DEV ? "/" : "/quiz",
  },
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

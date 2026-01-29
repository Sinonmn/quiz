import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
import App from "./App.jsx";
import Main from "./pages/Main/Main.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/quiz",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    basename: import.meta.env.DEV ? "/" : "/quiz",
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

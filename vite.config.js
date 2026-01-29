import { defineConfig } from "vite";
import react from "@vitejs/api-react";

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],

    base: command === "serve" ? "/" : "/quiz/",
  };
});

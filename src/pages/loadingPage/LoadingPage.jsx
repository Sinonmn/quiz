import { useState, CSSProperties } from "react";
import { ClipLoader, MoonLoader } from "react-spinners";

const override = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "",
};

const LoadingPage = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#4facfe");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <MoonLoader color="#4facfe" loading={true} size={150} />
    </div>
  );
};

export default LoadingPage;

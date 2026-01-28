import { useState, CSSProperties } from "react";
import { ClipLoader, MoonLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingPage = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#4facfe");
  return (
    <MoonLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingPage;

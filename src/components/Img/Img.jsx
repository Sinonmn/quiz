import { useState, useEffect } from "react";
import "./Img.css";

const Img = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  useEffect(() => {
    
    setIsLoading(true);

    let isMounted = true; 
    const img = new Image();
    img.src = src;

    img.onload = () => {
      if (isMounted) {
        if (img.naturalHeight > 0) {
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      if (isMounted) setIsLoading(false);
    };

    return () => {
      isMounted = false; 
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div
      className="img-wrapper"
      style={{ aspectRatio: `${aspectRatio}` }} 
    >
      {isLoading && <div className="skeleton"></div>}
      <img
        src={src}
        alt={alt}
   
        className={`img-content ${isLoading ? "is-hidden" : "is-visible"}`}
      />
    </div>
  );
};

export default Img;

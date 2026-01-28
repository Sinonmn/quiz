import sadCat from "../../assets/sadCat.jpg";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <>
      <div className="error">
        <img className="error__image" src={sadCat} alt="" />
        <h1 className="error__title">Ooops!</h1>
        <p className="error__text">Something went wrong...</p>
      </div>
    </>
  );
};

export default ErrorPage;

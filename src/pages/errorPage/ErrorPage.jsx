import sadCat from "../../assets/sadCat.jpg";
import { useRouteError } from "react-router";
import "./ErrorPage.css";

const ErrorPage = ({customError}) => {
  const routeError = useRouteError();
  const error = customError || routeError || {};
  return (
    <>
      <div className="error">
        <img className="error__image" src={sadCat} alt="" />
        <h1 className="error__title">Ooops!</h1>
        <p className="error__text">Something went wrong...</p>
        <p>{error.statusText || error.message}</p>
      </div>
    </>
  );
};

export default ErrorPage;

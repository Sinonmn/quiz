import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Main.css";
import AutoPlay from "../../components/Autoplay/Autoplay.jsx";
import { Link } from "react-router";

const Main = () => {
  return (
    <>
      <div className="app-container">
        <Header />
        <main className="main">
          <div className="main__content">
            <p>Try To Complete This Quiz</p>
            <Link className="main-content__link" to="/quiz">Cat Quiz</Link>
            <Link className="main-content__link" to="/">Create Your Own Quiz</Link>
          </div>
          <div className="main__slider">
            <AutoPlay />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Main;

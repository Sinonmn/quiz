import { Link } from "react-router";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img
            src="../../../public/favicon.png"
            alt="Logo"
            className="header__logo-img"
          />
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__link">
            Main
          </Link>
          <Link to="/quiz" className="header__link">
            Cat Quiz
          </Link>
          <Link to="/quiz" className="header__link">
            Create Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}

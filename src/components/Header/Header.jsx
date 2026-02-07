import { Link } from "react-router";
import "./Header.css";
import logo from "../../assets/logo/favicon.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Logo" className="header__logo-img" />
        </Link>
        <nav className="header__nav">
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

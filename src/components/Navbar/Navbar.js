import "./Navbar.css";
import { Home } from "../../pages";
import { Link } from "react-router-dom";
import { LoginButton } from "../LoginButton";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="site-title">
        <Link to="/" element={<Home />}>
          <h1>Sortify</h1>
        </Link>
      </div>
      <div className="login">
        <LoginButton />
      </div>
    </nav>
  );
}

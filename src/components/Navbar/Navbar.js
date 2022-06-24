import "./Navbar.css";
import { Home } from "../../pages";
import { Link } from "react-router-dom";
import { Login } from "../Login";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="site-title">
        <Link to="/" element={<Home />}>
          <h1>Sortify</h1>
        </Link>
      </div>
      <div className="login">
        <Login />
      </div>
    </nav>
  );
}

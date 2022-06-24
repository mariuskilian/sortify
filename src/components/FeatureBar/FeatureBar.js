import "./FeatureBar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export function FeatureBar() {
  return (
    <nav className="featurebar">
      <ul>
        <CustomLink to="/cleanup">Cleanup</CustomLink>
        <CustomLink to="/listenlater">Listen Later</CustomLink>
        <CustomLink to="/snapshots">Snapshots</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

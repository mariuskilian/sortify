import { Link, useMatch, useResolvedPath } from "react-router-dom";

import styled from "styled-components";

export function FeatureBar() {
  return (
    <FeatureBarNav>
      <ul>
        <CustomLink to="/cleanup">Cleanup</CustomLink>
        <CustomLink to="/listenlater">Listen Later</CustomLink>
        <CustomLink to="/snapshots">Snapshots</CustomLink>
      </ul>
    </FeatureBarNav>
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

//#region Styles
const FeatureBarNav = styled.nav`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-evenly;
  height: 3rem;
  padding: 0 1rem;

  & ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    gap: 1rem;
  }

  & a {
    color: inherit;
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0.25rem;
  }

  & li {
    &.active {
      background-color: #555;
    }
    &:hover {
      background-color: #777;
    }
  }
`;
//#endregion

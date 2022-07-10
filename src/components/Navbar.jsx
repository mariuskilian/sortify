import { Home } from "../pages";
import { Link } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import styled from "styled-components";

export function Navbar() {
  return (
    <NavbarNav>
      <SiteTitle>
        <Link to="/" element={<Home />}>
          <h1>Sortify</h1>
        </Link>
      </SiteTitle>
      <LoginWrapper>
        <LoginButton />
      </LoginWrapper>
    </NavbarNav>
  );
}

//#region Styles
const SiteTitle = styled.div`
  font-size: 2rem;
`;

const NavbarNav = styled.nav`
  background-color: #111;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;

  & a {
    color: inherit;
    text-decoration: none;
  }
`;

const LoginWrapper = styled.div`
  justify-content: center;
`;
//#endregion

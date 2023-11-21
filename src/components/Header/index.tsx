import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { useUser } from "../../stores/user";

function Header() {
  const isAuthed = useUser((state) => state.isAuthed);
  const logout = useUser((state) => state.logout);

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">Tinder for ducks</Navbar.Brand>
          <Nav className="ms-auto">
            {isAuthed ? (
              <Nav.Link as="button" onClick={logout}>
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link
                  to="/login"
                  as={Link}
                  active={window.location.pathname === "/login"}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  to="/register"
                  as={Link}
                  active={window.location.pathname === "/register"}
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

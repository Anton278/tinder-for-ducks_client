import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#">Tinder for ducks</Navbar.Brand>
        <Nav className="ms-auto">
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
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;

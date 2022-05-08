import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiRestaurant } from "react-icons/bi";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
export default function CustomNav({ isLogged, setIsLogged }) {
  const userName = window.localStorage.getItem("userName");
  const userId = window.localStorage.getItem("userId");
  const handleLogout = () => {
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userId");
    setIsLogged(false);
  };
  useEffect(() => {
    setIsLogged(!!(userName && userId));
  }, [userName, userId]);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">
            Restaurant Reviews
            <BiRestaurant size={"1.5rem"} />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/">
            Restaurants
          </Link>
        </Nav>
        <Nav>
          {isLogged ? (
            <Button variant="dark" className="nav-link" onClick={handleLogout}>
              Logout {userName}
            </Button>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

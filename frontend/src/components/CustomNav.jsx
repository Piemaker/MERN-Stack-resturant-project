import React from 'react'
import { Link } from 'react-router-dom';
import {BiRestaurant} from "react-icons/bi"
import { Container, Nav, Navbar } from "react-bootstrap";
export default function CustomNav() {
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
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

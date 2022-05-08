import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLogged }) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (userName && userId) {
      window.localStorage.setItem("userName", userName);
      window.localStorage.setItem("userId", userId);
      setIsLogged(true);
      navigate(-1);
    }
  };
  return (
    <Container>
      <Row className="my-5">
        <Col className="d-flex justify-content-center">
          <Col xs={10} md={4}>
            <Form
              className="shadow p-3 m-auto bg-dark text-white rounded-2"
              onSubmit={handleLogin}
            >
              <Form.Group className="mb-3" controlId="formBasicTextName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter user name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="fomrBasicTextId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  type="text"
                  placeholder="User ID"
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 mb-2"
                variant="outline-light"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

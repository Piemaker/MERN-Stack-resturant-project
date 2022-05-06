import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap';

export default function CustomSpinner() {
  return (
    <Container className="h-100">
      <Row className="position-absolute top-50 start-50 translate-middle">
        <Spinner animation="border" style={{ width: "50px", height: "50px" }} />
      </Row>
    </Container>
  );
}

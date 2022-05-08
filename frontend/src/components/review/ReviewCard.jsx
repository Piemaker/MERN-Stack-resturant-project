import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
export default function ReviewCard({
  name,
  userId,
  text,
  date,
  restaurantId,
  loggedInUserId,
  isLogged,
}) {
    // TODO add functionality for editing/deleting/adding reviews
  return (
    <Card className="d-flex" text="white" bg="dark" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 ">
          <span className="text-muted">Review:&nbsp;</span>
          {text}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 ">
          <span className="text-muted">User ID:&nbsp;</span>
          {userId}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 ">
          <span className="text-muted">Date:&nbsp;</span>
          {new Date(date).toDateString()}
        </Card.Subtitle>
      </Card.Body>
      {isLogged && loggedInUserId === userId && (
        <Row className="g-1 mx-2 mb-2">
          <Col className="">
            <Button variant="outline-light w-100">
              <AiFillEdit size="1.5rem" color="orange" />
            </Button>
          </Col>
          <Col className="m-1">
            <Button variant="outline-light w-100">
              <AiFillDelete size="1.5rem" color="red" />
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );
}

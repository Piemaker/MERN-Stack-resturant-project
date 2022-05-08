import React from "react";
import { Card } from "react-bootstrap";

export default function ReviewCard({
  name,
  userId,
  text,
  date,
  restaurantId,
  loggedInUserId,
}) {
    //TODO add update/delete buttons if logged in user id matches user id
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
    </Card>
  );
}

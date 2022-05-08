import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RestaurantCard({
  name,
  cuisine,
  address,
  _id,
  showReviewButton = true,
}) {
  return (
    <Col className="d-flex flex-column  align-items-center justify-content-center">
      <Card
        className="d-flex"
        text="white"
        bg="dark"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 ">
            <span className="text-muted">Cuisine:&nbsp;</span>
            {cuisine}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 ">
            <span className="text-muted">Address:&nbsp;</span>
            {address}
          </Card.Subtitle>
          <Row>
            {showReviewButton && (
              <Col className="d-flex  h-100 justify-content-center align-items-center">
                <Link className="w-100" to={`/id/${_id}`}>
                  <Button className="w-100" variant="outline-light">
                    Reviews
                  </Button>
                </Link>
              </Col>
            )}

            <Col className="d-flex justify-content-center align-items-center">
              <a
                target="_blank"
                rel="noreferrer"
                className="w-100"
                href={`https://www.google.com/maps/place/${address}`}
              >
                <Button className="w-100" variant="outline-light">
                  Location
                </Button>
              </a>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

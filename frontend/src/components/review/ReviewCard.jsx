import React, { useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import DataFetchingClass from "../../DataFetchingClass";
export default function ReviewCard({
  _id,
  name,
  userId,
  text,
  date,
  restaurantId,
  loggedInUserId,
  isLogged,
  setIsReviewsChanged,
}) {
  const [isErrorDeleting, setIsErrorDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setIsErrorDeleting(false);
      setIsReviewsChanged(false);
      const response = await DataFetchingClass.deleteReview(_id, userId);
      // console.log(
      // "🚀 ~ file: ReviewCard.jsx ~ line 22 ~ handleDelete ~ response",
      // response
      // );
      const { status } = response;
      if (status === 200) {
        setIsReviewsChanged(true);
      } else {
        setIsErrorDeleting(true);
      }
    } catch (error) {
      console.error(`Error in deleting review, ${error}`);
      setIsErrorDeleting(true);
    }
  };
  return (
    <Card className="d-flex" text="white" bg="dark" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 ">
          <span className="text-muted">Review:&nbsp;</span>
          {text}
        </Card.Subtitle>
        {/* <Card.Subtitle className="mb-2 ">
          <span className="text-muted">User ID:&nbsp;</span>
          {userId}
        </Card.Subtitle> */}
        <Card.Subtitle className="mb-2 ">
          <span className="text-muted">Date:&nbsp;</span>
          {new Date(date).toDateString()}
        </Card.Subtitle>
      </Card.Body>
      {isLogged && loggedInUserId === userId && (
        <Row className="g-1 mx-2 mb-2">
          <Col className="">
            <Link to={`/id/${restaurantId}/${_id}/${text}`}>
              <Button variant="outline-light w-100">
                <AiFillEdit size="1.5rem" color="orange" />
              </Button>
            </Link>
          </Col>
          <Col className="m-1">
            <Button variant="outline-light w-100" onClick={handleDelete}>
              <AiFillDelete size="1.5rem" color="red" />
            </Button>
          </Col>
        </Row>
      )}
      {isErrorDeleting && (
        <Alert className="mt-2 text-uppercase text-center" variant={"danger"}>
          Error in deleting review
        </Alert>
      )}
    </Card>
  );
}

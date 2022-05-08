import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataFetchingClass from "../../DataFetchingClass";

export default function AddEditReviewFrom({ isLogged }) {
  const { reviewText, id, reviewId } = useParams();
  const userName = window.localStorage.getItem("userName");
  const userId = window.localStorage.getItem("userId");
  const isEditing = reviewText !== "addReview";
  const [review, setReview] = useState(reviewText);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review) {
      const userObject = {
        reviewId,
        userId,
        name: userName,
        text: review,
        restaurantId: id,
      };

      if (isEditing) {
        try {
          //* name isn't necessary here, but won't cause problem
          const response = await DataFetchingClass.updateReview(userObject);
          // console.log(
          // "🚀 ~ file: AddEditReviewFrom.jsx ~ line 27 ~ handleSubmit ~ response",
          // response
          // );
          navigate(-1);
        } catch (error) {
          console.error(`Error in editing review, ${error}`);
        }
      } else {
        try {
          const response = await DataFetchingClass.addReview(userObject);
          // // console.log(
          // // "🚀 ~ file: AddEditReviewFrom.jsx ~ line 28 ~ handleSubmit ~ response",
          // // response
          // // );
          navigate(-1);
        } catch (error) {
          console.error(`Error in adding review, ${error}`);
        }
      }
    }
  };
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);
  return (
    <Container className="my-5">
      <Row>
        <Col className="d-flex justify-content-center ">
          <Col
            xs={10}
            md={6}
            className="shadow-2 p-3 rounded-2 bg-dark text-white"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Label htmlFor="textfield">Write Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                id="reviewTextField"
                aria-describedby="reviewTextField"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                ref={textAreaRef}
              />
              <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                  {isLogged ? (
                    <Button type="submit" variant="outline-light">
                      Submit Review
                    </Button>
                  ) : (
                    <Link
                      className="text-center text-capitalize text"
                      to={`/login`}
                    >
                      <Button type="submit" variant="outline-light">
                        Login to add a review
                      </Button>
                    </Link>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DataFetchingClass from "../../DataFetchingClass";
import CustomSpinner from "../CustomSpinner";
import RestaurantCard from "../restaurant/RestaurantCard";
import ReviewCard from "./ReviewCard";

export default function ReviewPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState({});
  // TODO add loggedInUserId from browser storage when user login
  // TODO add add review button which will open a form for the user to add his review
  const loggedInUserId = 512;
  useEffect(() => {
    const getRestaurant = async (id) => {
      try {
        setIsLoading(true);
        const response = await DataFetchingClass.getRestaurantById(id);
        const restaurant = response.data.response;
        // console.log(
        // "🚀 ~ file: ReviewPage.jsx ~ line 17 ~ getRestaurant ~ restaurant",
        // restaurant
        // );
        setRestaurant(restaurant);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error in fetching restaurant by id, ${error}`);
      }
    };
    getRestaurant(id);
  }, [id]);
  if (Object.keys(restaurant).length) {
    const { name, cuisine, _id } = restaurant;
    const address = `${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`;
    const reviewList = restaurant.restaurant_reviews.map((review) => {
      const { _id, name, userId, text, date } = review;
      return (
        <Col
          className="d-flex justify-content-center align-items-center"
          key={_id}
        >
          <ReviewCard
            {...{ name, userId, text, date, restaurantId: id, loggedInUserId }}
          />
        </Col>
      );
    });
    const noReviewsResponse = <h2 className="text-center">No reviews found, be the first to review</h2>;
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <RestaurantCard
              {...{
                name,
                cuisine,
                address,
                _id,
                showReviewButton: false,
                loggedInUserId,
              }}
            />
          </Col>
        </Row>

        <Row className="my-4 g-5">
          <h2 className="mb-4 text-center">Reviews</h2>
          {restaurant.restaurant_reviews.length ? reviewList : noReviewsResponse}
        </Row>
      </Container>
    );
  }
  if (isLoading) {
    return <CustomSpinner />;
  }
  return (<></>)
}

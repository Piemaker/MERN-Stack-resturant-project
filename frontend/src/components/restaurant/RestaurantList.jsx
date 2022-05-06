import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DataFetchingClass from "../../DataFetchingClass";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList() {
  const [restaurantList, setRestaurantsList] = useState([]);
  const fetchAllRestaurants = async () => {
    try {
      const response = await await DataFetchingClass.getAll();
      console.log(
        "🚀 ~ file: RestaurantList.jsx ~ line 8 ~ fetchAllRestaurants ~ response",
        response
      );
      const { restaurantsList } = response.data;
      setRestaurantsList(restaurantsList);
    } catch (error) {
      console.error(`Error in fetching restaurant data, ${error}`);
    }
  };
  useEffect(() => {
    fetchAllRestaurants();
  }, []);
  let restaurants = [];
  if (restaurantList.length > 0) {
    restaurants = restaurantList.map((restaurant) => {
      const { name, _id, cuisine } = restaurant;
      const address = `${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`;
      return <RestaurantCard {...{ name, cuisine, _id, address }} />;
    });
  }
  return (
    <Container>
      <Row className="my-5 gy-5  justify-content-center">{restaurants}</Row>
    </Container>
  );
}

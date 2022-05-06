import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DataFetchingClass from "../../DataFetchingClass";
import CustomSpinner from "../CustomSpinner";
import PaginationComponent from "../PaginationComponent";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList() {
  const [restaurantList, setRestaurantsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRestaurantCount, setTotalRestaurantCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await await DataFetchingClass.getAll(currentPage);
        console.log(
          "🚀 ~ file: RestaurantList.jsx ~ line 8 ~ fetchAllRestaurants ~ response",
          response
        );
        const { restaurantsList } = response.data;
        setRestaurantsList(restaurantsList);
        setTotalRestaurantCount(response.data.totalNumRestaurants);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error in fetching restaurant data, ${error}`);
      }
    };
    fetchAllRestaurants();
  }, [currentPage]);
  let restaurants = [];
  if (isLoading) {
    return <CustomSpinner />;
  }
  if (restaurantList.length > 0) {
    restaurants = restaurantList.map((restaurant) => {
      const { name, _id, cuisine } = restaurant;
      const address = `${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`;

      return <RestaurantCard key={_id} {...{ name, cuisine, address }} />;
    });
  }
  return (
    <Container>
      <Row className="my-5 gy-5  justify-content-center">{restaurants}</Row>
      <Row className="mb-2 ">
        <PaginationComponent
          {...{ currentPage, setCurrentPage }}
          totalItems={totalRestaurantCount}
        />
      </Row>
    </Container>
  );
}

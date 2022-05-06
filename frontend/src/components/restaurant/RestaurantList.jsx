import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import DataFetchingClass from "../../DataFetchingClass";
import CustomSpinner from "../CustomSpinner";
import PaginationComponent from "../PaginationComponent";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList() {
  const [restaurantList, setRestaurantsList] = useState([]);
  const [cuisinesList, setCuisinesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRestaurantCount, setTotalRestaurantCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [userQuery, setUserQuery] = useState("");
  const [isInvalidFilter, setInvalidFilter] = useState(false);
  const [isInvalidCuisine, setIsInvalidCuisine] = useState(false);

  const [selectedCuisine, setSelectedCuisine] = useState("Cuisines");
  const handleFilterChange = (e) => {
    setSelectedFilter(e);
    setInvalidFilter(false);
  };
  const handleCuisineChange = (e) => {
    setSelectedCuisine(e);
    setIsInvalidCuisine(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isInvalidFilter =
      selectedFilter === "Filter" || selectedFilter === "Please Select";
    const isInvalidCuisine =
      (selectedCuisine === "Cuisines" || selectedCuisine === "Please Select") &&
      selectedFilter === "cuisine";
    if (isInvalidFilter) {
      setInvalidFilter(true);
    }
    if (isInvalidCuisine) {
      setIsInvalidCuisine(true);
    } else if (!isInvalidCuisine && !isInvalidFilter) {
      let response;
      try {
        setIsLoading(true);
        if (selectedFilter === "cuisine") {
          response = await DataFetchingClass.getByQuery(
            selectedFilter,
            selectedCuisine
          );
        } else {
          response = await DataFetchingClass.getByQuery(
            selectedFilter,
            userQuery
          );
        }
        setRestaurantsList(response.data.restaurantsList);
        setTotalRestaurantCount(response.data.restaurantsList.length);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error in fetching by query, ${error}`);
      }
    }
  };
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await DataFetchingClass.getAll(currentPage);
        const cuisines = (await DataFetchingClass.getAllCuisines()).data
          .response;
        // console.log(
        // "🚀 ~ file: RestaurantList.jsx ~ line 71 ~ fetchAllRestaurants ~ cuisines",
        // cuisines
        // );
        const { restaurantsList } = response.data;
        // // console.log("🚀 ~ file: RestaurantList.jsx ~ line 72 ~ fetchAllRestaurants ~ restaurantsList", restaurantsList)

        setRestaurantsList(restaurantsList);
        setCuisinesList(cuisines);
        setTotalRestaurantCount(response.data.totalNumRestaurants);
        setIsLoading(false);
      } catch (error) {
        console.error(
          `Error in fetching restaurant data or cuisines, ${error}`
        );
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
      <Row className="mt-5 justify-content-center">
        <Col xs={8} md={6} className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              {selectedFilter !== "cuisine" && (
                <FormControl
                  required
                  onChange={(e) => setUserQuery(e.target.value)}
                  value={userQuery}
                  aria-label="Text input with dropdown button"
                />
              )}

              <DropdownButton
                variant="outline-dark"
                title={
                  isInvalidFilter
                    ? "Please Select"
                    : `${selectedFilter[0].toUpperCase()}${selectedFilter.slice(
                        1
                      )}`
                }
                id="input-group-dropdown-1"
                align="end"
                onSelect={handleFilterChange}
              >
                <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                <Dropdown.Item eventKey="zipcode">Zipcode</Dropdown.Item>
                <Dropdown.Item eventKey="cuisine">Cuisine</Dropdown.Item>
              </DropdownButton>
              {selectedFilter === "cuisine" && (
                <DropdownButton
                  variant="outline-dark"
                  title={isInvalidCuisine ? "Please Select" : selectedCuisine}
                  id="input-group-dropdown-2"
                  align="end"
                  onSelect={handleCuisineChange}
                >
                  {cuisinesList.map((cuisine, index) => {
                    return (
                      <Dropdown.Item key={index} eventKey={cuisine}>
                        {cuisine.slice(0, 20)}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              )}
              <Button type="submit" variant="outline-dark" />
            </InputGroup>
          </Form>
        </Col>
      </Row>
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

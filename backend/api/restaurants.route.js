import express from "express";
import RestaurantsController from "./restaurants.controller.js";
import ReviewController from "./reviews.controller.js";

const router = express.Router();

router.route("/").get(RestaurantsController.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsController.apiGetRestaurantCuisines);


router
  .route("/reviews")
  .get(ReviewController.apiGetReviews)
  .post(ReviewController.apiPostReview)
  .delete(ReviewController.apiDeleteReview)
  .put(ReviewController.apiUpdateReview);

export default router;

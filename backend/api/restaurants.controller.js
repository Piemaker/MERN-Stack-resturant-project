import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    // get values from passed in queries
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });

    const response = {
      restaurantsList,
      totalNumRestaurants,
      page,
      filters,
      restaurantsPerPage,
    };
    res.json(response);
  }
  static async apiGetRestaurantById(req, res, next) {
    try {
      const { id } = req.params || {};
      let response = await RestaurantsDAO.apiGetRestaurantById(id);
      if (!response) {
        res.status(404).json({ error: "Not Found" });
      } else {
        res.json({ response: response });
      }
    } catch (error) {
      console.error(`Error in finding restaurant by id, ${e}`);
      res.status(500).json({ error: error });
    }
  }
  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let response = await RestaurantsDAO.apiGetRestaurantCuisines();
      if (!response) {
        res.status(404).json({ error: "Not Found" });
      } else {
        res.json({ response: response });
      }
    } catch (error) {
      console.error(`Error in finding cuisines, ${e}`);
      res.status(500).json({ error: error });
    }
  }
}

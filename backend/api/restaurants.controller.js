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
}

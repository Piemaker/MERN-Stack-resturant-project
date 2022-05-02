// DAO (Data Access Object)
//  a pattern that provides an abstract interface to some type of database or other persistence mechanism.
// persistence mechanism is the queries manipulating the DB
//* Reference to the DB
let restaurants;

export default class RestaurantsDAO {
  // Method to connect to the DB Collection
  static async injectDB(conn) {
    //* the reference can either be initialized at the time of calling, or not
    if (restaurants) {
      // already initialized skip connection
      console.log("RestaurantsDAO, connection already established");
      return;
    }
    try {
      // connect and get restaurants collection specifically (neighborhood exists too)
      restaurants = await conn
        .db(process.env.RESTAURANT_SAMPLE)
        .collection("restaurants");
    } catch (e) {
      console.error(`Unable to connect to collection in restaurantsDAO ${e}`);
    }
  }
  // Queries
  //* you have to pass an empty {} in order to initialize the defaults
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        //* You have to specify what key to search in MongoDB Atlas
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        // this searches the 'cuisine' field in the DB to be 'eq' equal to given filter
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }
    //* a cursor is like a pointer having the index to the returned documents
    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`Error in finding collection, ${e}`);
      return { restaurantList: [], totalNumRestaurants: 0 };
    }
    //! displayCursor was set to const which stopped it from working
    let displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
}

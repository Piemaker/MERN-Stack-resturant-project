import configedAxios from "./http-common";

export default class DataFetchingClass {
  static getAll(page = 0) {
    return configedAxios.get(`?page=${page}`);
  }
  static getByQuery(queryName, queryValue, page) {
    return configedAxios.get(`?${queryName}=${queryValue}&page=${page}`);
  }
  static getAllCuisines() {
    return configedAxios.get(`/cuisines`);
  }

  static getRestaurantById(id) {
    return configedAxios.get(`/id/${id}`);
  }
  static addReview(reviewObject) {
    //! Notice that if you use the data key for object having more than one field, the req will have
    //! this structure body.data
    return configedAxios.post("/reviews", {
      ...reviewObject,
    });
  }
  static updateReview(reviewObject) {
    return configedAxios.put("/reviews", {
      ...reviewObject,
    });
  }
  static deleteReview(reviewId, userId) {
    return configedAxios.delete("/reviews", {
      params: {
        reviewId: reviewId,
      },
      data: {
        userId: userId,
      },
    });
  }
}

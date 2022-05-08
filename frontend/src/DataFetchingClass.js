import configedAxios from "./http-common";

export default class DataFetchingClass {
   static getAll(page = 0) {
        return configedAxios.get(`?page=${page}`);
    }
    static getByQuery(queryName, queryValue,page) {
        return configedAxios.get(`?${queryName}=${queryValue}&page=${page}`);
    }
    static getAllCuisines() { 
        return configedAxios.get(`/cuisines`);
    }

    static getRestaurantById(id) {
        return configedAxios.get(`/id/${id}`)
    }

}
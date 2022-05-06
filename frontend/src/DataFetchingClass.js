import configedAxios from "./http-common";

export default class DataFetchingClass {
   static getAll(page = 0) {
        return configedAxios.get(`?page=${page}`);
    }
    static getByQuery(queryName, queryValue) {
        console.log("🚀 ~ file: DataFetchingClass.js ~ line 8 ~ DataFetchingClass ~ getByQuery ~ queryName, queryValue", queryName, queryValue)
        return configedAxios.get(`?${queryName}=${queryValue}`);
    }
    static getAllCuisines() { 
        return configedAxios.get(`/cuisines`);
    }

}
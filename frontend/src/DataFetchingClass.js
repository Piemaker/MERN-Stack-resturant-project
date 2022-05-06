import configedAxios from "./http-common";

export default class DataFetchingClass {
   static getAll(page = 0) {
        return configedAxios.get(`?page=${page}`);
    }
}
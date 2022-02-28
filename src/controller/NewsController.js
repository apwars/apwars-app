import BaseController from './BaseController';
import store from "@/store";

export default class NewsController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getMany(limit = 10, skip = 0) {
    try {
      const query = new URLSearchParams({ ...{ limit }, ...{ skip } });
      return this.base._get(`/news?${query}`);
    } catch (error) {
      throw error;
    }
  }

}

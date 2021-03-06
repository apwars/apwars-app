import BaseController from './BaseController';
import store from "@/store";

export default class OrdersController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.serverless);
  }

  getOrders(filter, skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      const query = new URLSearchParams({ ...filter, ...{ skip: skip }, ...{ limit: limit }, ...{ sort: sort } });
      return this.base._get(`/orders?${query}`);
    } catch (error) {
      throw error;
    }
  }

  getOpenBuyOrders(skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      return this.getOrders({
        orderType: 0,
        orderStatus: 0,
      }, skip, limit, sort);
    } catch (error) {
      throw error;
    }
  }

  getOpenSellOrders(skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      return this.getOrders({
        orderType: 1,
        orderStatus: 0,
      }, skip, limit, sort);
    } catch (error) {
      throw error;
    }
  }

  getMyOpenOrders(sender, orderType, skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      return this.getOrders({
        orderType: orderType,
        orderStatus: 0,
        sender: sender,
      }, skip, limit, sort);
    } catch (error) {
      throw error;
    }
  }
}

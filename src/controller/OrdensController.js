import BaseController from './BaseController';
import querystring from 'querystring';

export default class OrdensController {
  constructor() {
    this.base = new BaseController();
  }

  getOrdens(filter, skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;

      const query = querystring.stringify({ ...filter, ...{ skip: skip }, ...{ limit: limit }, ...{ sort: sort } });
      return this.base._get(`/ordens?${query}`);
    } catch (error) {
      throw error;
    }
  }

  getOpenBuyOrdens(skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      return this.getOrdens({
        orderType: 0,
        orderStatus: 0,
      }, skip, limit, sort);
    } catch (error) {
      throw error;
    }
  }

  getOpenSellOrdens(skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      return this.getOrdens({
        orderType: 1,
        orderStatus: 0,
      }, skip, limit, sort);
    } catch (error) {
      throw error;
    }
  }

  getMyOpenOrdens(sender, orderType, skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      return this.getOrdens({
        orderType: orderType,
        orderStatus: 0,
        sender: sender,
      }, skip, limit, sort);
    } catch (error) {
      throw error;
    }
  }
}

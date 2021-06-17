import BaseController from './BaseController';

export default class OrdensController {
  constructor() {
    this.base = new BaseController();
  }

  getOrdensBuy(skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      return this.base._get(`/ordens?orderType=0&orderStatus=0&sort=${sort}&skip=${skip}&limit=${limit}`);
    } catch (error) {
      throw error;
    }
  }

  getOrdensSell(skip, limit, sort) {
    try {
      sort = sort || 'orderId:-1';
      skip = skip || 0;
      limit = limit || 5;
      return this.base._get(`/ordens?orderType=1&orderStatus=0&sort=${sort}&skip=${skip}&limit=${limit}`);
    } catch (error) {
      throw error;
    }
  }
}

export default class BaseController {
  constructor(_api) {
    this.api = _api;
  }

  async _get(endpoint) {
    try {
      const response = await fetch(`${this.api}${endpoint}`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

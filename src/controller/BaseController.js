export default class BaseController {
  constructor() { }

  async _get(endpoint) {
    try {
      const response = await fetch(`${process.env.VUE_APP_SERVERLESS}${endpoint}`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

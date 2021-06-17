export default class BaseController {
  constructor() { }

  async _get(endpoint) {
    try {
      const response = await fetch(`/api${endpoint}`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default class BaseController {
  constructor(_api) {
    this.api = _api;
  }

  async _get(endpoint) {
    try {
      const response = await fetch(`${this.api}${endpoint}`);
      if (response.status !== 200 && response.status !== 201) {
        throw await response.json();
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async _post(endpoint, body) {
    try {
      const response = await fetch(`${this.api}${endpoint}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.status !== 200 && response.status !== 201) {
        throw await response.json();
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

import store from "@/store";
export default class BaseController {
  constructor(_api) {
    this.api = _api;
    this.account = store.getters["user/account"];
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

  async _postSignature(endpoint, body) {
    try {
      const message = {
        wallet: this.account.toLowerCase(),
        nonce: new Date().getTime()
      };
      const messageSignature = web3.utils.sha3(JSON.stringify(message));
      const signature = await window.web3.eth.personal.sign(messageSignature, message.wallet);
      const response = await fetch(`${this.api}${endpoint}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'message-signature': messageSignature,
          'message-nonce': message.nonce,
          'signature': signature
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

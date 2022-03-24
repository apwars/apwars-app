import store from "@/store";
import { ethers } from "ethers";
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
      if (response.headers.get('X-Total-Count')) {
        const data = await response.json();
        data.total = response.headers.get('X-Total-Count');
        return data;
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

  async _postSignature(endpoint, body, method = 'POST') {
    try {
      const message = {
        wallet: this.account.toLowerCase(),
        nonce: new Date().getTime()
      };
      const messageSignature = web3.utils.sha3(JSON.stringify(message));
      const signature = await window.web3.eth.personal.sign(messageSignature, message.wallet);
      const response = await fetch(`${this.api}${endpoint}`, {
        method,
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

  async _postSignatureEthers(endpoint, body, method = 'POST') {
    try {
      const message = {
        wallet: this.account.toLowerCase(),
        nonce: new Date().getTime()
      };

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const messageSignature = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(message)));
      const signature = await signer.signMessage(ethers.utils.toUtf8Bytes(messageSignature));
      const response = await fetch(`${this.api}${endpoint}`, {
        method,
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

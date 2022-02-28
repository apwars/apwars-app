import Web3 from "web3";

const DEFAULT_DECIMALS = 2;
const DEFAULT_DECIMALS_BIGNUMBER = 18;

const w3 = new Web3(window.ethereum);

export default {
  toWei(amount) {
    amount = (parseFloat(amount)).toFixed(DEFAULT_DECIMALS_BIGNUMBER);
    return w3.utils.toWei(amount, "ether");
  },

  fromWei(amount, convertFloat) {
    if (convertFloat) {
      return parseFloat(web3.utils.fromWei(amount.toString()));
    }
    return w3.utils.fromWei(amount.toString());
  },

  formatString(amount, decimals = DEFAULT_DECIMALS) {
    const language = window.navigator.userLanguage || window.navigator.language;
    amount = this.roundDown(amount, decimals);
    return amount.toLocaleString(language, {
      minimumFractionDigits: decimals,
    });
  },

  roundDown(amount, decimals) {
    amount = parseFloat(amount);
    const setDecimals = Math.pow(10, decimals);
    return Math.floor(amount * setDecimals) / setDecimals;
  },

  compactNumber(value, decimals, ignoreThousand) {
    if (value < 1e3) {
      if (ignoreThousand) {
        return value;
      }
      return this.formatString(value, decimals);
    } else if (value >= 1e3 && value < 1e6) {
      return `${this.formatString(value / 1e3, decimals)}K`;
    } else if (value >= 1e6 && value < 1e9) {
      return `${this.formatString(value / 1e6, decimals)}M`;
    } else if (value >= 1e9 && value < 1e12) {
      return `${this.formatString(value / 1e9, decimals)}B`;
    } else if (value >= 1e12) {
      return `${this.formatString(value / 1e12, decimals)}T`;
    }
  },
};
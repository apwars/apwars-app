const DEFAULT_DECIMALS = 2;
export default {
  toWei(amount) {
    return web3.utils.toWei(amount.toString(), "ether");
  },

  fromWei(amount) {
    return web3.utils.fromWei(amount.toString());
  },

  formatString(amount, decimals) {
    decimals = decimals || DEFAULT_DECIMALS;
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
};

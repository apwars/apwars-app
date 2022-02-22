export default {
  setOnChainBalance: (state, balances) => {
    state.onChainBalance = balances;
  },
  setOffChainBalance: (state, balances) => {
    state.offChainBalance = balances;
  },
};

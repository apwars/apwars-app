<template>
  <span>
    {{ computedAmount }}
  </span>
</template>

<script>
export default {
  props: ["amount", "compact", "decimals"],

  computed: {
    computedAmount() {
      let numberAmount = web3.utils.fromWei(this.amount.toString());
      if (this.compact !== undefined) {
        numberAmount = this.compactNumber(numberAmount, this.getDecimals);
      }
      else {
        numberAmount = this.roundDown(parseFloat(numberAmount), this.getDecimals);
      }
      return numberAmount;
    },
    getDecimals() {
      return this.decimals ?? 0;
    },
  },

  methods: {
    compactNumber(value, decimals) {
      if (value < 1e3) return this.roundDown(value, decimals);
      if (value >= 1e3 && value < 1e6)
        return +this.roundDown(value / 1e3, decimals) + "K";
      if (value >= 1e6 && value < 1e9)
        return +this.roundDown(value / 1e6, decimals) + "M";
      if (value >= 1e9 && value < 1e12)
        return +this.roundDown(value / 1e9, decimals) + "B";
      if (value >= 1e12) return +this.roundDown(value / 1e12, decimals) + "T";
    },
    roundDown(value, decimals) {
      const setDecimals = Math.pow(10, decimals);
      return parseFloat(Math.floor(value * setDecimals) / setDecimals).toFixed(decimals);
    },
  },
};
</script>

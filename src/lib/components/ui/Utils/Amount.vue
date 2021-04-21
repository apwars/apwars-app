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
      numberAmount = parseFloat(numberAmount).toFixed(this.getDecimals);
      if (this.compact !== undefined) {
        numberAmount = this.compactNumber(numberAmount, this.getDecimals);
      }
      return numberAmount;
    },
    getDecimals() {
      return this.decimals ?? 0;
    },
  },

  methods: {
    compactNumber(value, decimals) {
      if (value < 1e3) return value;
      if (value >= 1e3 && value < 1e6)
        return +(value / 1e3).toFixed(decimals) + "K";
      if (value >= 1e6 && value < 1e9)
        return +(value / 1e6).toFixed(decimals) + "M";
      if (value >= 1e9 && value < 1e12)
        return +(value / 1e9).toFixed(decimals) + "B";
      if (value >= 1e12) return +(value / 1e12).toFixed(decimals) + "T";
    },
  },
};
</script>

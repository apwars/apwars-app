<template>
  <span>
    {{computedAmount}}
  </span>
</template>

<script>
export default {
  props: ['amount'],

  computed: {
    computedAmount() {
      return web3.utils.fromWei(this.amount.toString());
    }
  }
};
</script>

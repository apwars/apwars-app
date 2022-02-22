<template>
  <div>
    <div class="lp-title">Loyalty Program</div>
    <div class="d-flex justify-start align-center">
      <img src="/images/icons/coins/wSCARS.png" width="64px" alt="War SCARS" />
      <div class="ml-2">
        <div class="scars-amount">
          <amount
            :amount="getBalance('wSCARS')"
            decimals="2"
            formatted
            tooltip
          />
        </div>
        <div class="scars-text">Your War SCARS</div>
      </div>
    </div>
    <div class="d-flex justify-center mt-1">
      <Button
        type="wsecondary"
        size="small"
        :handleClick="() => $router.push('/loyalty-program')"
        class="mt-1"
      >
        <span class="text-none text-center">Go to Loyalty Program</span>
      </Button>
      <Button
        type="wsecondary"
        size="small"
        :handleClick="() => $router.push('/loyalty-program/shop')"
        class="ml-2 mt-1"
      >
        <span class="text-none text-center">Go to Shop</span>
      </Button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import Button from "@/lib/components/ui/Buttons/Button";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: {
    Amount,
    Button,
  },
  methods: {
    ...mapState({
      offChainBalance: (state) => state.wallet.offChainBalance,
    }),
    getBalance(token) {
      return this.offChainBalance[token] || 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.lp-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.2;
  text-align: left;
  color: #ffeebc;
  margin-bottom: 12px;
}
.scars-amount {
  font-weight: bold;
  font-size: 36px;
  line-height: 1.2;
  color: #ffffff;
}
.scars-text {
  font-size: 14px;
  line-height: 1.2;
  color: #ffffff;
}
</style>

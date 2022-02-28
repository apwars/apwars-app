<template>
  <div>
    <div class="lp-title">Loyalty Program</div>
    <div class="d-flex justify-start align-center">
      <img src="/images/icons/coins/wSCARS.png" width="64px" alt="War SCARS" />
      <div class="ml-2">
        <div class="scars-amount">
          <v-skeleton-loader
            v-if="isLoadingBalances"
            type="image"
            width="100%"
            height="47px"
          />
          <Amount
            v-else
            :amount="getBalance('wSCARS')"
            :formatted="true"
            decimals="2"
            tooltip
          />
        </div>
        <div class="scars-text">Your War SCARS</div>
      </div>
    </div>
    <div class="d-flex justify-center mt-1">
      <Button
        type="wsecondary"
        icon="pcs"
        :handleClick="() => $router.push('/loyalty-program')"
        class="mt-1"
      >
        <span class="text-none text-center">Loyalty Program</span>
      </Button>
      <Button
        type="wsecondary"
        :handleClick="() => $router.push('/loyalty-program/shop')"
        class="ml-2 mt-1"
      >
        <span class="text-none text-center">Shop</span>
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
  computed: {
    ...mapState({
      offChainBalance: (state) => state.wallet.offChainBalance,
      isLoadingBalances: (state) => state.wallet.isLoadingBalances,
    }),
  },
  methods: {
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

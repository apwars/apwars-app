<template>
  <v-row>
    <v-col cols="12">
      <div class="resources-title">Your Resources</div>
      <div class="switch-container mt-1">
        Binance Smart Chain Network
        <Toggle v-model="network" class="mx-1"></Toggle>
        APWars Off-chain
      </div>
      <div class="resource-row">
        <div class="token-container">
          <v-img src="/images/wgold.png" />
        </div>
        <div class="balance-info">
          <Amount :amount="getBalance('wGOLD')" />
          <div class="token-name">wGOLD</div>
        </div>
        <div class="buy-container"></div>
      </div>
      <div class="resource-row">
        <div class="token-container">
          <img src="/images/wcourage.png" width="24px" />
        </div>
        <div class="balance-info">
          <Amount :amount="getBalance('wCOURAGE')" />
          <div class="token-name">wCOURAGE</div>
        </div>
        <div class="buy-container"></div>
      </div>
      <div class="resource-row">
        <div class="token-container">
          <img src="/images/wland.png" width="24px" />
        </div>
        <div class="balance-info">
          <Amount :amount="getBalance('wLAND')" />
          <div class="token-name">wLAND</div>
        </div>
        <div class="buy-container"></div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from "vuex";

import Toggle from "@/lib/components/ui/Toggle";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Amount, Toggle },
  computed: {
    ...mapState({
      onChainBalance: (state) => state.wallet.onChainBalance,
      offChainBalance: (state) => state.wallet.offChainBalance,
    }),
    balances() {
      if (this.network) {
        return this.offChainBalance;
      } else {
        return this.onChainBalance;
      }
    },
  },
  data() {
    return {
      network: false,
    };
  },
  methods: {
    getBalance(token) {
      return this.balances[token] || 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.resources-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.2;
  text-align: left;
  color: #ffeebc;
}
.resource-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.switch-container {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 10px;
  line-height: 1.3;
  text-align: center;
  color: #ffffff;
}
.token-container {
  width: 36px;
  height: 36px;
  background-image: url("/images/icons/gray-slot.png");
  background-size: contain;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.balance-info {
  margin-left: 4px;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
}
.token-name {
  font-size: 10px;
  line-height: 1.3;
}
</style>

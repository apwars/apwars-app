<template>
  <v-row>
    <v-col cols="12">
      <div class="resources-title">Your Resources</div>
      <div class="switch-container mt-1">
        Binance Smart Chain Network
        <v-switch v-model="network" flat></v-switch>
        APWars Off-chain
      </div>
      <div class="resource-row">
        <img src="/images/wgold.png" width="24px" />
        <div class="balance-info"><Amount :amount="getBalance('wGOLD')" /></div>
        <div class="buy-container"></div>
      </div>
      <div class="resource-row">
        <img src="/images/wcourage.png" width="24px" />
        <div class="balance-info">
          <Amount :amount="getBalance('wCOURAGE')" />
        </div>
        <div class="buy-container"></div>
      </div>
      <div class="resource-row">
        <img src="/images/wland.png" width="24px" />
        <div class="balance-info"><Amount :amount="getBalance('wLAND')" /></div>
        <div class="buy-container"></div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Amount },
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
}
.switch-container {
  display: flex;
  font-weight: bold;
  font-size: 10px;
  line-height: 1.3;
  text-align: center;
  color: #ffffff;
}
</style>

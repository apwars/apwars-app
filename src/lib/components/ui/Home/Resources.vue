<template>
  <div class="resources-container">
    <div class="resources-title">Your Resources</div>
    <div class="switch-container mt-1">
      Binance Smart Chain Network
      <Toggle v-model="network" class="mx-1"></Toggle>
      APWars Off-chain
    </div>
    <div class="resource-row mt-1">
      <div class="token-info">
        <div class="token-container">
          <v-img src="/images/wgold.png" />
        </div>
        <div class="balance-info">
          <v-skeleton-loader
            v-if="isLoadingBalances"
            type="image"
            width="100%"
            height="24px"
          />
          <Amount
            v-else
            :amount="getBalance('wGOLD')"
            :formatted="network"
            decimals="2"
            tooltip
          />
          <div class="token-name">wGOLD</div>
        </div>
      </div>
      <div class="buy-container">
        <Button
          type="wsecondary"
          :handleClick="() => $router.push('/buy-wgold')"
          isBlock
        >Buy <span class="d-none d-sm-block ml-1">wGOLD</span></Button>
      </div>
    </div>
    <div class="resource-row">
      <div class="token-info">
        <div class="token-container">
          <img src="/images/wcourage.png" width="24px" />
        </div>

        <div class="balance-info">
          <v-skeleton-loader
            v-if="isLoadingBalances"
            type="image"
            height="24px"
            width="100%"
          />
          <Amount
            v-else
            :amount="getBalance('wCOURAGE')"
            :formatted="network"
            decimals="2"
            tooltip
          />
          <div class="token-name">wCOURAGE</div>
        </div>
      </div>
      <div class="buy-container">
        <Button
          type="wsecondary"
          :handleClick="() => $router.push('/buy-wcourage')"
          isBlock
        >Buy <span class="d-none d-sm-block ml-1">wCOURAGE</span></Button>
      </div>
    </div>
    <div class="resource-row">
      <div class="token-info">
        <div class="token-container">
          <img src="/images/wland.png" width="24px" />
        </div>

        <div class="balance-info">
          <v-skeleton-loader
            v-if="isLoadingBalances"
            type="image"
            height="24px"
            width="100%"
          />
          <Amount
            v-else
            :amount="getBalance('wLAND')"
            :formatted="network"
            decimals="2"
            tooltip
          />
          <div class="token-name">wLAND</div>
        </div>
      </div>
      <div class="buy-container">
        <Button
          type="wsecondary"
          text="Buy"
          :handleClick="() => $router.push('/buy-wland')"
          isBlock
        >Buy <span class="d-none d-sm-block ml-1">wLAND</span></Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import Button from "@/lib/components/ui/Buttons/Button";
import Toggle from "@/lib/components/ui/Toggle";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Button, Amount, Toggle },
  computed: {
    ...mapState({
      onChainBalance: (state) => state.wallet.onChainBalance,
      offChainBalance: (state) => state.wallet.offChainBalance,
      isLoadingBalances: (state) => state.wallet.isLoadingBalances,
    }),
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
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
      isLoading: true,
      network: false,
    };
  },
  methods: {
    ...mapActions({
      fetchBalances: "wallet/fetchBalances",
    }),
    getBalance(token) {
      return this.balances?.[token] || 0;
    },
    fetchData() {
      if (!this.isConnected || !this.account) {
        return;
      }
      this.fetchBalances();
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    isConnected() {
      this.fetchData();
    },
    account() {
      this.fetchData();
    },
  },
};
</script>
<style lang="scss" scoped>
.resources-container {
  margin-top: 21px;
}
.resources-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.2;
  text-align: left;
  color: #ffeebc;
}
.resource-row {
  display: flex;
  justify-content: space-between;
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
.token-info {
  display: flex;
  align-content: center;
}
.balance-info {
  margin-left: 4px;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.token-name {
  font-size: 10px;
  line-height: 1.3;
}
.buy-container {
  width: 140px;
  display: flex;
  justify-content: flex-end;
}
</style>

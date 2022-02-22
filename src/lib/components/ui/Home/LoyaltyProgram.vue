<template>
  <div class="d-flex justify-center align-center">
    <img src="/images/icons/coins/wSCARS.png" width="95px" alt="War SCARS" />
    <div class="ml-2">
      <h2 class="text-h2">
        <amount :amount="balancewSCARS" decimals="0" formatted tooltip />
      </h2>
      <div class="mt-1 font-weight-bold">Your War SCARS</div>
    </div>
  </div>
</template>
<script>
import WalletController from "@/controller/WalletController";

export default {
  computed: {
    account() {
      return this.$store.getters["user/account"];
    },
  },
  methods: {
    async getBalancewSCARS(account) {
      const controller = new WalletController();
      const wallet = await controller.wallets(account);

      if (!wallet.balances["wSCARS"]) {
        return 0;
      }

      return wallet.balances["wSCARS"];
    },
  },
};
</script>

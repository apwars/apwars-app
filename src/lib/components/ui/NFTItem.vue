<template>
  <v-card class="mx-auto" width="250" elevation="0">
    <v-card-text class="text-center">
      <v-img width="200" :src="collectible.image"></v-img>
      <wButton class="my-3" size="x-small" @click="goToBuy(collectible.id)">
        <div class="d-flex justify-center">
          <img
            src="/images/buttons/btn-icon-buy.svg"
            class="mx-1  align-self-center"
            height="12"
          />
          <div class="align-self-center">Create Buy Order</div>
        </div>
      </wButton>
    </v-card-text>
  </v-card>
</template>

<script>
import GameText from "@/lib/components/ui/Utils/GameText";
import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";
import wButton from "@/lib/components/ui/Utils/wButton";

export default {
  props: ["collectible", "myCollection"],

  components: {
    GameText,
    wButton,
  },

  data() {
    return {
      remaining: 0,
      supply: 0,
      isLoading: false,
      isApproved: false,
      waitingMetamask: false,
      isSending: false,
      transactionSent: false,
      showInfo: false,
      userAmount: 0,
    };
  },

  computed: {
    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
  },

  watch: {
    currentBlockNumber() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    clearState() {
      this.waitingMetamask = false;
      this.receipt = null;
      this.transactionHash = null;
      this.transactionSent = false;
    },
    goToBuy(id) {
      return this.$router.push(`/game-items/${id}/buy-orders/new`);
    },
    openNewTab(obj) {
      window.open(obj);
    },

    async loadData() {
      try {
        this.isLoading = true;
        const collectibles = new Collectibles(this.collectible.contractAddress);
        const wgold = new wGOLD(this.addresses.wGOLD);

        this.isApproved = await wgold.hasAllowance(
          this.account,
          this.collectible.contractAddress
        );

        if (!this.collectible.isGift) {
          this.supply = await collectibles.getMaxSupply(this.collectible.id);
          this.remaining = await collectibles.getRemaining(this.collectible.id);
        }

        this.userAmount = await collectibles.balanceOf(
          this.account,
          this.collectible.id
        );
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },

    closeWaitingMetamask() {
      this.waitingMetamask = false;
    },

    closeSending() {
      this.isSending = false;
    },

    closeTransactionSent() {
      this.transactionSent = false;
    },

    closeInfo() {
      this.showInfo = false;
    },

    openInfo() {
      this.showInfo = true;
    },
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: transparent !important;
}

.remaining {
  color: #f6ff00;
}

.btn {
  cursor: pointer;
}
</style>

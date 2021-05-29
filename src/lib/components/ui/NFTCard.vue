<template>
  <v-card class="mx-auto" width="250" elevation="0">
    <v-card-text class="text-center">
      <v-img
        width="230"
        class="cursor-pointer"
        @click="openInfo()"
        :src="collectible.image"
        :gradient="
          remaining === 0 && !myCollection
            ? `to top right, rgba(100,115,201,.10), rgba(25,32,72,.7)`
            : ''
        "
      ></v-img>
      <game-text>{{ collectible.title }}</game-text>
      <item-price
        v-if="!collectible.isGift"
        :price="collectible.parameters.price"
      />
      <div v-if="myCollection" class="d-block">
        <small class="remaining">Your Amount: {{ userAmount }}</small>
        <div>
          <wButton
            class="mx-2"
            size="x-small"
            @click="goToSell(collectible.id)"
          >
            Create Sell Order
          </wButton>
        </div>
      </div>
      <div v-else-if="!collectible.isGift">
        <small class="remaining"
          >Remaining: {{ remaining }} of {{ supply }}</small
        >
        <div
          class="d-flex justify-center align-center mt-1"
          v-if="remaining > 0"
        >
          <v-img
            v-if="isApproved"
            class="btn center"
            @click="buy"
            max-width="160"
            src="/images/buttons/btn-buy.png"
          ></v-img>
          <v-img
            v-else
            class="btn center"
            @click="approve"
            max-width="160"
            src="/images/buttons/btn-approve.png"
          ></v-img>
        </div>
      </div>
    </v-card-text>

    <game-modal
      :open="waitingMetamask"
      title="Approve the transaction"
      :hideOk="true"
      @close="closeWaitingMetamask()"
    >
      <v-progress-circular
        :size="24"
        color="#765E55"
        indeterminate
      ></v-progress-circular>
      You need to approve the transaction in you wallet.
    </game-modal>

    <game-modal
      :open="isSending"
      title="Transaction has been sent"
      :hideOk="true"
      @close="closeSending()"
    >
      <v-progress-circular
        v-if="isSending"
        :size="24"
        color="#765E55"
        indeterminate
      ></v-progress-circular>
      The transaction has been sent to the blockchain. Waiting for the first
      confirmation!
    </game-modal>

    <game-modal
      :open="transactionSent"
      title="Transaction confirmed!"
      @close="closeTransactionSent()"
    >
      The transaction has been confirmed!
    </game-modal>

    <game-modal
      :open="showInfo"
      :title="collectible.title"
      @close="closeInfo()"
    >
      <span v-html="collectible.description" />
    </game-modal>
  </v-card>
</template>

<script>
import GameText from "@/lib/components/ui/Utils/GameText";
import Amount from "@/lib/components/ui/Utils/Amount";
import GameModal from "@/lib/components/ui/Modals/GameModal";
import ItemPrice from "@/lib/components/ui/Utils/ItemPrice";
import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";
import wButton from "@/lib/components/ui/Utils/wButton";

export default {
  props: ["collectible", "myCollection"],

  components: {
    GameText,
    ItemPrice,
    GameModal,
    Amount,
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
    goToSell(id) {
      return this.$router.push(`/game-items/${id}/sell-orders/new`);
    },
    async buy() {
      try {
        const collectibles = new Collectibles(this.collectible.contractAddress);

        this.clearState();

        this.waitingMetamask = true;
        const res = collectibles.claim(
          this.account,
          this.collectible.tokenAddress,
          this.collectible.parameters.id,
          this.collectible.parameters.price,
          this.collectible.signatures[this.networkInfo.id]
        );

        res.on("error", () => {
          this.clearState();
        });
        res.on("transactionHash", (hash) => {
          this.waitingMetamask = false;
          this.isSending = true;
          this.transactionHash = hash;
        });
        res.on("receipt", (receipt) => {
          this.waitingMetamask = false;
          this.isSending = false;
          this.transactionSent = true;
          this.receipt = receipt;
        });

        this.messageModalOpened = true;
      } catch (e) {
        this.clearState();
        console.log(e);
      }
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

    async approve() {
      try {
        const wgold = new wGOLD(this.addresses.wGOLD);
        const res = await wgold.approve(
          this.account,
          this.collectible.contractAddress
        );
        console.log({ res });
        this.isApproved = await wgold.hasAllowance(
          this.account,
          this.collectible.contractAddress
        );
      } catch (e) {
        console.log(e);
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

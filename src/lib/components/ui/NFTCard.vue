<template>
  <v-card class="mx-auto" width="250" elevation="0">
    <v-card-text class="text-center d-flex flex-column justify-center">
      <v-img
        width="230"
        height="356"
        class="cursor-pointer"
        @click="openInfo()"
        :src="collectible.image"
        :gradient="
          remaining === 0 && !myCollection
            ? `to top right, rgba(100,115,201,.10), rgba(25,32,72,.7)`
            : ''
        "
      ></v-img>
      <div style="height: 37px">
        <game-text>{{ collectible.title }}</game-text>
      </div>
      <div v-if="myCollection" class="d-block">
        <small class="remaining">Your Amount: {{ userAmount }}</small>
        <div class="mt-1">
          <wButton width="170px" class="mx-1" @click="goToSell(collectible.id)">
            <div class="d-flex justify-center">
              <img
                src="/images/buttons/btn-icon-sell.svg"
                class="mx-1  align-self-center"
                height="12"
              />
              <small class="align-self-center">Create Sell Order</small>
            </div>
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
            v-if="isApprovedwGOLD"
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
      @confirm="openSendItem()"
      :imageUrl="collectible.image"
      :gameItemTitle="collectible.title"
      :isLoading="isLoadingShowInfo"
    >
      <span v-html="collectible.description" />
    </game-modal>

    <game-item-wood-modal
      :open="showSendItem"
      @close="
        showSendItem = false;
        showInfo = true;
      "
      @confirm="sendItem()"
      :disabledConfirm="!qty && qty"
      :imageUrl="collectible.image"
      :gameItemTitle="collectible.title"
      :isLoading="isLoadingShowSendItem"
      :waitingStage="waitingStageShowSendItem"
      title="Are you sure you want to send this item?"
      :amount="userAmount"
    >
      <div class="mt-2">
        <v-text-field
          outlined
          class="input"
          label="Address"
          dense
          v-model="address"
        ></v-text-field>
        <v-currency-field
          dense
          outlined
          v-bind="currencyConfig"
          label="Quantity"
          v-model="qty"
        >
        </v-currency-field>
      </div>
    </game-item-wood-modal>

    <lilith-modal
      :open="lilith"
      @confirm="approveContract()"
      @close="
        lilith = false;
        showInfo = true;
      "
      :isLoading="isLoadingLilith"
      :text="textLilithModal"
      textClose="Back"
    ></lilith-modal>
  </v-card>
</template>

<script>
import GameText from "@/lib/components/ui/Utils/GameText";
import Amount from "@/lib/components/ui/Utils/Amount";
import GameModal from "@/lib/components/ui/Modals/GameModal";
import GameItemWoodModal from "@/lib/components/ui/Modals/GameItemWoodModal";
import LilithModal from "@/lib/components/ui/Modals/LilithModal";
import ItemPrice from "@/lib/components/ui/Utils/ItemPrice";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";
import Transporter from "@/lib/eth/Transporter";

const LILITH_APPROVE_ITEM =
  "To ship your item, I need the authorization to transport it!";
const LILITH_APPROVE_WGOLD =
  "To transport your items I need to receive your approval. Using my services, you don't have to worry about the bureaucratic processes, but I charge a small fee.";
const LILITH_WAITING_WALLET_APPROVAL =
  "I am waiting for the approval in your precious wallet...";
const LILITH_WAITING_FIRST_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation...";

export default {
  props: ["collectible", "myCollection"],

  components: {
    GameText,
    ItemPrice,
    GameModal,
    GameItemWoodModal,
    LilithModal,
    Amount,
    wButton,
  },

  data() {
    return {
      remaining: 0,
      supply: 0,
      isLoading: false,
      isApprovedWGOLD: false,
      isApprovedCollectibles: false,
      waitingMetamask: false,
      isSending: false,
      isLoadingShowSendItem: false,
      waitingStageShowSendItem: 0,
      transactionSent: false,
      showInfo: false,
      isLoadingShowInfo: false,
      showSendItem: false,
      userAmount: 0,
      address: "",
      qty: 0,
      lilith: false,
      isLoadingLilith: false,
      textLilithModal: "",
      stepLilith: "wGOLD",
      wGOLDContract: {},
      collectiblesContract: {},
      currencyConfig: {
        locale: "en-US",
        prefix: "",
        suffix: "",
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: false,
      },
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

    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
  },

  watch: {
    currentBlockNumber() {
      this.loadData();
    },
    isConnected() {
      this.initData();
      this.loadData();
    },
    account() {
      this.loadData();
    },
  },

  mounted() {
    this.initData();
    this.loadData();
  },

  methods: {
    initData() {
      if (!this.isConnected) {
        return;
      }
      this.wGOLDContract = new wGOLD(this.addresses.wGOLD);
      this.collectiblesContract = new Collectibles(
        this.collectible.contractAddress
      );
    },

    async loadData() {
      try {
        if (!this.isConnected) {
          return;
        }
        this.isLoading = true;

        if (!this.collectible.isGift) {
          this.supply = await this.collectiblesContract.getMaxSupply(
            this.collectible.id
          );
          this.remaining = await this.collectiblesContract.getRemaining(
            this.collectible.id
          );
        }

        this.userAmount = await this.collectiblesContract.balanceOf(
          this.account,
          this.collectible.id
        );
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },

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
        this.clearState();

        this.waitingMetamask = true;
        const res = thi.collectiblesContract.claim(
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

    async approve() {
      try {
        const res = await wgold.approve(
          this.account,
          this.collectible.contractAddress
        );
        console.log({ res });
        this.isApprovedwGOLD = await this.wGOLDContract.hasAllowance(
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
      this.isLoadingShowInfo = false;
      this.showInfo = true;
    },

    initStateSendItemwGOLD() {
      this.lilith = true;
      this.textLilithModal = LILITH_APPROVE_WGOLD;
      this.stepLilith = "wGOLD";
    },

    initStateSendItemCollectibles() {
      this.lilith = true;
      this.textLilithModal = LILITH_APPROVE_ITEM;
      this.stepLilith = "Collectibles";
    },

    initStateShowSendItem() {
      this.showSendItem = true;
      this.qty = 0;
      this.address = '';
    },

    async openSendItem() {
      try {
        this.isLoadingShowInfo = true;

        this.isApprovedwGOLD = await this.wGOLDContract.hasAllowance(
          this.account,
          this.addresses.transporter
        );

        this.isApprovedCollectibles = await this.collectiblesContract.isApprovedForAll(
          this.account,
          this.addresses.transporter
        );

        this.showInfo = false;
        this.isLoadingShowInfo = false;

        if (!this.isApprovedwGOLD) {
          this.initStateSendItemwGOLD();
        } else if (!this.isApprovedCollectibles) {
          this.initStateSendItemCollectibles();
        } else {
          this.initStateShowSendItem();
        }
      } catch (error) {
        return ToastSnackbar.error(error.toString());
      }
    },

    closeSendItem() {
      this.showSendItem = false;
    },

    setInitialStateSendItem() {
      this.isLoadingShowSendItem = false;
      this.waitingStageShowSendItem = 0;
    },

    sendItem() {
      try {
        if (!web3.utils.isAddress(this.address)) {
          return ToastSnackbar.warning("Address is invalid");
        }

        this.isLoadingShowSendItem = true;
        this.waitingStageShowSendItem = 1;
        const tranporterContract = new Transporter(this.addresses.transporter);
        const confirmTransaction = tranporterContract.sendNFT(
          this.addresses.collectibles,
          this.address,
          this.collectible.id,
          this.qty,
          this.account
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateSendItem();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while sending the item Lilith - The Transporter"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.waitingStageShowSendItem = 2;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateSendItem();
          this.showSendItem = false;
          ToastSnackbar.success(
            "I transported your item successfully! Feel free to contact me again when you need my service. Lilith - The Transporter"
          );
        });
      } catch (error) {
        this.setInitialStateSendItem();
        return ToastSnackbar.error(error.toString());
      }
    },

    approveContract() {
      if (this.stepLilith === "wGOLD") {
        this.approvewGOLD();
      } else if (this.stepLilith === "Collectibles") {
        this.approveCollectibles();
      }
    },

    setInitialStateApproveCollectibles() {
      this.isLoadingLilith = false;
      this.textLilithModal = LILITH_APPROVE_ITEM;
    },

    approveCollectibles() {
      try {
        this.isLoadingLilith = true;
        this.textLilithModal = LILITH_WAITING_WALLET_APPROVAL;
        const confirmTransaction = this.collectiblesContract.setApprovalForAll(
          this.addresses.transporter,
          this.account
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveCollectibles();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while granting access to Lilith - The Transporter"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textLilithModal = LILITH_WAITING_FIRST_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateApproveCollectibles();
          this.lilith = false;
          this.showSendItem = true;
          ToastSnackbar.success(
            "You have granted access to Lilith - The Transporter"
          );
        });
      } catch (error) {
        this.setInitialStateApproveCollectibles();
        return ToastSnackbar.error(error.toString());
      }
    },

    setInitialStateApprovewGOLD() {
      this.isLoadingLilith = false;
      this.textLilithModal = LILITH_APPROVE_WGOLD;
    },

    approvewGOLD() {
      try {
        this.isLoadingLilith = true;
        this.textLilithModal = LILITH_WAITING_WALLET_APPROVAL;
        const confirmTransaction = this.wGOLDContract.approve(
          this.account,
          this.addresses.transporter
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApprovewGOLD();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while granting access to Lilith - The Transporter"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textLilithModal = LILITH_WAITING_FIRST_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateApprovewGOLD();
          ToastSnackbar.success(
            "You have granted access to Lilith - The Transporter"
          );
          if (this.isApprovedCollectibles) {
            this.lilith = false;
          } else {
            this.initStateSendItemCollectibles();
          }
        });
      } catch (error) {
        this.setInitialStateApprovewGOLD();
        return ToastSnackbar.error(error.toString());
      }
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

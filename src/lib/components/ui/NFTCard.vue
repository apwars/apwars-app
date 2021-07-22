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
        <small class="remaining">
          Remaining: {{ remaining }} of {{ supply }}
        </small>
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
      textConfirm="Send Item"
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
      :disabledConfirm="disabledConfirmSendItem"
      :imageUrl="collectible.image"
      :gameItemTitle="`${collectible.title}`"
      :isLoading="isLoadingShowSendItem"
      :waitingStage="waitingStageShowSendItem"
      title="Are you sure you want to send this item?"
      :amount="userAmount"
      width="710px"
      height="300px"
      textClose="Back"
    >
      <div class="mt-6">
        <v-row>
          <v-col class="py-0" cols="12" md="6">
            <number-field
              dense
              label="Quantity"
              v-model="qty"
              :max="userAmountItem"
            ></number-field>
          </v-col>
          <v-col class="py-0" cols="12">
            <v-text-field
              outlined
              class="input"
              label="Address"
              dense
              v-model="addressSendNFT"
            ></v-text-field>
            <p class="ma-0 pa-0 mt-n1">
              Transportation fee of:
              <amount
                class="mr-1"
                :amount="transportationFee"
                decimals="2"
                symbol="wGOLD"
                icon
              />
            </p>

            <p
              v-if="itemTransport.title && isBalanceFee"
              class="ma-0 pa-0 mt-1"
            >
              Game Item to be spent:
              {{ itemTransport.title }}
            </p>

            <div v-if="isBalanceFee">
              <p class="mt-1">
                Your balance:
                <amount
                  class="mr-1"
                  :amount="userBalance"
                  decimals="2"
                  symbol="wGOLD"
                  icon
                />
              </p>
            </div>
            <div v-else>
              <p class="mt-1">
                <v-alert outlined type="warning" border="left" dense>
                  Your balance
                  <amount
                    class="mr-1"
                    :amount="userBalance"
                    decimals="2"
                    symbol="wGOLD"
                    icon
                  />
                  is less than the fee.
                </v-alert>
              </p>
            </div>
          </v-col>
        </v-row>
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
import Convert from "@/lib/helpers/Convert";
import NumberField from "@/lib/components/ui/Utils/NumberField";

import { getCollectibles } from "@/data/Collectibles";

import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";
import Transporter from "@/lib/eth/Transporter";

const LILITH_APPROVE_SECOND_PAGE_CONTRACT =
  "The first page has been successfully signed. <br /> I am waiting for the approval in your precious wallet, for signing the second page of the contract...";
const LILITH_APPROVE_FIRST_PAGE_CONTRACT =
  "To transport your items, you have to sign the transportation contract, it's only 2 pages for you to sign. Using my services, you don't have to worry about bureaucratic processes, but I charge a small fee.";
const LILITH_WAITING_WALLET_APPROVAL =
  "I am waiting for the approval in your precious wallet, for signing the first page of the contract...";
const LILITH_WAITING_FIRST_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation, so you can sign the second page of the contract...";
const LILITH_WAITING_SECOND_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation, so you can start transporting your items safely...";

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
    NumberField,
  },

  data() {
    return {
      remaining: 0,
      supply: 0,
      isLoading: false,
      isApprovedwGOLD: false,
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
      addressSendNFT: "",
      qty: 0,
      userBalance: 0,
      transportationFee: 0,
      lilith: false,
      isLoadingLilith: false,
      textLilithModal: "",
      stepLilith: "wGOLD",
      wGOLDContract: {},
      collectiblesContract: {},
      listItemsTransport: [27],
      itemTransport: {},
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

    disabledConfirmSendItem() {
      return (
        this.addressSendNFT === "" ||
        !this.qty ||
        (this.qty && this.qty > this.userAmount) ||
        Convert.fromWei(this.transportationFee, true) >
          Convert.fromWei(this.userBalance, true)
      );
    },

    isBalanceFee() {
      return (
        Convert.fromWei(this.userBalance, true) >=
        Convert.fromWei(this.transportationFee, true)
      );
    },

    userAmountItem() {
      if (this.listItemsTransport.indexOf(this.collectible.id) >= 0) {
        return this.userAmount - 1;
      }
      return this.userAmount;
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

        this.userBalance = await this.wGOLDContract.balanceOf(this.account);
      } catch (error) {
        return ToastSnackbar.error(error.toString());
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

    initStateFirstPageContract() {
      this.lilith = true;
      this.textLilithModal = LILITH_APPROVE_FIRST_PAGE_CONTRACT;
      this.stepLilith = "fistPage";
    },

    initStateSecoundPageContract() {
      this.lilith = true;
      this.textLilithModal = LILITH_APPROVE_SECOND_PAGE_CONTRACT;
      this.stepLilith = "secoundPage";
    },

    initStateShowSendItem() {
      this.showSendItem = true;
      this.qty = 0;
      this.addressSendNFT = "";
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

        const tranporterContract = await new Transporter(
          this.addresses.transporter
        );

        const getTransportationFee = await tranporterContract.getFeeAmount(
          this.account
        );
        getTransportationFee.nftId = parseInt(getTransportationFee.nftId);

        if (getTransportationFee.nftId) {
          this.itemTransport = getCollectibles().find(
            (collectible) => collectible.id === getTransportationFee.nftId
          );
        }

        this.transportationFee = getTransportationFee.currentFeeAmount;

        this.showInfo = false;
        this.isLoadingShowInfo = false;

        if (!this.isApprovedwGOLD) {
          this.initStateFirstPageContract();
        } else if (!this.isApprovedCollectibles) {
          this.initStateSecoundPageContract();
        } else {
          this.initStateShowSendItem();
        }
      } catch (error) {
        this.isLoadingShowInfo = false;
        return ToastSnackbar.error(error.toString());
      }
    },

    closeSendItem() {
      this.showSendItem = false;
    },

    setInitialStateSendItem() {
      this.isLoadingShowSendItem = false;
      this.waitingStageShowSendItem = 0;
      this.addressSendNFT = "";
      this.qty = 0;
    },

    sendItem() {
      try {
        if (!web3.utils.isAddress(this.addressSendNFT)) {
          return ToastSnackbar.warning("Address is invalid");
        }

        this.isLoadingShowSendItem = true;
        this.waitingStageShowSendItem = 1;
        const tranporterContract = new Transporter(this.addresses.transporter);
        const confirmTransaction = tranporterContract.sendNFT(
          this.addresses.collectibles,
          this.addressSendNFT,
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
      if (this.stepLilith === "fistPage") {
        this.approveFirstPageContract();
      } else if (this.stepLilith === "secoundPage") {
        this.approveSecoundPageContract();
      }
    },

    setInitialStateApproveSecoundPageContract() {
      this.isLoadingLilith = false;
      this.textLilithModal = LILITH_APPROVE_SECOND_PAGE_CONTRACT;
    },

    approveSecoundPageContract() {
      try {
        this.isLoadingLilith = true;
        this.textLilithModal = LILITH_APPROVE_SECOND_PAGE_CONTRACT;
        const confirmTransaction = this.collectiblesContract.setApprovalForAll(
          this.addresses.transporter,
          this.account
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveSecoundPageContract();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Lilith - The Transporter"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textLilithModal = LILITH_WAITING_SECOND_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateApproveSecoundPageContract();
          this.lilith = false;
          this.showSendItem = true;
          ToastSnackbar.success(
            "Contract successfully signed to Lilith - The Transporter"
          );
        });
      } catch (error) {
        this.setInitialStateApproveSecoundPageContract();
        return ToastSnackbar.error(error.toString());
      }
    },

    setInitialStateApproveFirstPageContract() {
      this.isLoadingLilith = false;
      this.textLilithModal = LILITH_APPROVE_FIRST_PAGE_CONTRACT;
    },

    approveFirstPageContract() {
      try {
        this.isLoadingLilith = true;
        this.textLilithModal = LILITH_WAITING_WALLET_APPROVAL;
        const confirmTransaction = this.wGOLDContract.approve(
          this.account,
          this.addresses.transporter
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveFirstPageContract();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Lilith - The Transporter"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textLilithModal = LILITH_WAITING_FIRST_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          if (this.isApprovedCollectibles) {
            this.setInitialStateApproveFirstPageContract();
            this.lilith = false;
          } else {
            this.approveSecoundPageContract();
          }
        });
      } catch (error) {
        this.setInitialStateApproveFirstPageContract();
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

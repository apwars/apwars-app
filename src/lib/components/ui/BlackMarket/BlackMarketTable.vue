<template>
  <div>
    <v-card width="100%" class="card-table-black-market elevation-0">
      <v-card-title>
        <h4 class="text-h4" v-if="!isBuy">Items for sale</h4>
        <h4 class="text-h4" v-else>Wanted items</h4>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-data-table
          class="table-black-market elevation-0"
          :headers="headers"
          :items="listMarket"
          :items-per-page="itemsPerPage"
          :loading="isLoading"
          :loading-text="loadingText"
          :server-items-length="totalItems"
          @update:page="loadData"
        >
          <template v-slot:[`item.sender`]="{ item }">
            <v-address :address="item.sender" link tooltip></v-address>
          </template>
          <template v-slot:[`item.nft.title`]="{ item }">
            <div class="d-flex">
              <img
                :src="item.nft.image"
                class="align-self-center my-1"
                width="30px"
                :alt="item.nft.title"
              />
              <span class="ml-1 align-self-center">
                {{ item.nft.title }}
              </span>
            </div>
          </template>
          <template v-slot:[`item.nft.quantity`]="{ item }">
            <div class="d-flex">
              <span class="ml-1 align-self-center">
                <!-- {{ item.nft.quantity }} -->
              </span>
            </div>
          </template>
          <template v-slot:[`item.amountFormatted`]="{ item }">
            <div class="d-flex">
              <amount
                :amount="item.amountFormatted"
                decimals="2"
                formatted
                tooltip
                symbol="wGOLD"
                icon
              />
            </div>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <div class="d-flex justify-end my-2">
              <wButton
                v-if="item.sender.toLowerCase() == account.toLowerCase()"
                @click="openModalCancelOrder(item)"
              >
                <div class="d-flex justify-center">
                  <v-icon color="red darken-2">
                    mdi-close-circle-outline
                  </v-icon>
                  <div class="ml-1 align-self-center">cancel</div>
                </div>
              </wButton>
              <wButton class="ml-2" @click="openModal(item)">
                <div class="d-flex justify-center px-2">
                  <img
                    :src="
                      `/images/buttons/btn-icon-${item.orderTypeDesc.toLowerCase()}.svg`
                    "
                    class="mx-1 align-self-center"
                    :height="getSizeIcon(item.orderTypeDesc)"
                  />
                  <div class="align-self-center">{{ item.orderTypeDesc }}</div>
                </div>
              </wButton>
            </div>
          </template>
        </v-data-table>
        <game-item-wood-modal
          :open="isConfirmOrderModalOpen"
          :imageUrl="nftCollectible.nft.image"
          :gameItemTitle="nftCollectible.nft.title"
          :isLoading="isLoadingConfirm"
          @confirm="executeOrder"
          @close="isConfirmOrderModalOpen = false"
          :waitingStage="confirmOrderWaitingStage"
          :title="confirmOrderModalTitle"
          :disabledBuy="!hasQuantity"
        >
          <h4 class="mt-3">
            <span v-if="isBuy">You will pay</span>
            <span v-else>You will receive</span>
            <amount
              :amount="nftCollectible.amountOrder"
              decimals="2"
              tooltip
              title="wGOLD"
              symbol="wGOLD"
              icon
            />
            for this item.
          </h4>
          <v-alert
            class="mt-3"
            outlined
            v-if="!hasQuantity"
            type="warning"
            border="left"
            dense
          >
            Your balance is less than your offer.
          </v-alert>
        </game-item-wood-modal>

        <raskel-modal
          :open="openCancelOrderGameItem"
          :isLoading="isLoadingCancel"
          :text="raskelCancelText"
          @confirm="cancelOrder"
          @close="openCancelOrderGameItem = false"
        ></raskel-modal>

        <raskel-modal
          :open="isRaskelApprovalModalOpen"
          :isLoading="isLoadingApproveRaskel"
          :text="raskelApproveText"
          @confirm="approve(nftCollectible.orderTypeDesc)"
          @close="isRaskelApprovalModalOpen = false"
        ></raskel-modal>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import wButton from "@/lib/components/ui/Buttons/wButton";
import GameItemWoodModal from "@/lib/components/ui/Modals/GameItemWoodModal";
import RaskelModal from "@/lib/components/ui/Modals/RaskelModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import Convert from "@/lib/helpers/Convert";

import { getCollectibles } from "@/data/Collectibles";

import MarketNFTS from "@/lib/eth/MarketNFTS.js";
import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";

const RASKEL_DEFAULT_APPROVE_TEXT =
  "To work for you and execute this order, I need to receive approval to trade your items. You can trust me, my fellow!";
const RASKEL_DEFAULT_CANCEL_TEXT =
  "If you cancel this offer I will not receive any fee! Are you sure about that? I am working for nothing!";
const RASKEL_WAITING_WALLET_APPROVAL =
  "I am waiting for the approval in your precious wallet...";
const RASKEL_CANCEL_WAITING_FIRST_CONFIRMATION =
  "Next time, think more about using my service and not waste my time with unnecessary orders! I am waiting for the first blockchain confirmation...";
const RASKEL_WAITING_FIRST_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation...";

export default {
  props: ["type"],
  components: {
    VAddress,
    Amount,
    wButton,
    GameItemWoodModal,
    RaskelModal,
  },

  data() {
    return {
      amountwGOLD: 0,
      balanceItem: 0,
      isRaskelApprovalModalOpen: false,
      isLoadingApproveRaskel: false,
      nftCollectible: {
        nft: {},
      },
      isConfirmOrderModalOpen: false,
      openCancelOrderGameItem: false,
      isLoadingConfirm: false,
      isLoadingCancel: false,
      marketNFTS: {},
      itemsPerPage: 2,
      totalItems: 0,
      quantity: 1,
      isLoading: true,
      loadingText: "Loading... Please wait",
      dataMarket: [],
      headers: [
        {
          text: "Player",
          value: "sender",
          width: "15%",
          sortable: false,
        },
        {
          text: "Game Item",
          value: "nft.title",
          width: "25%",
          sortable: false,
        },
        { text: "Type", value: "nft.typeDesc", width: "15%", sortable: false },
        // {
        //   text: "Quantity",
        //   value: "nft.quantity",
        //   width: "10%",
        //   sortable: false,
        // },
        {
          text: "Price/Unit",
          value: "amountFormatted",
          width: "15%",
          sortable: false,
        },
        { text: "", value: "action", width: "20%", sortable: false },
      ],

      raskelCancelText: RASKEL_DEFAULT_CANCEL_TEXT,
      raskelApproveText: RASKEL_DEFAULT_APPROVE_TEXT,

      confirmOrderWaitingStage: 0,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

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

    confirmOrderModalTitle() {
      return !this.isBuy
        ? "Are you sure you want to buy this item?"
        : "Are you sure you want to sell this item?";
    },

    hasQuantity() {
      if (this.nftCollectible.amountOrder === undefined) {
        return false;
      }

      if (!this.isBuy) {
        const amountOrder = parseFloat(
          Convert.fromWei(this.nftCollectible.amountOrder)
        );
        return amountOrder > this.amountwGOLD ? false : true;
      } else {
        return this.balanceItem > 0 ? true : false;
      }
    },

    listMarket() {
      if (this.dataMarket === undefined || this.dataMarket.length === 0) {
        return [];
      }

      return this.dataMarket.filter((item) => {
        item.openModal = false;
        if (item.orderType === this.typeEnum) {
          item.orderTypeDesc = this.typeEnum === "1" ? "buy" : "sell";
          item.amountOrder =
            this.typeEnum === "0" ? item.amount : item.totalAmount;
          item.amountFormatted = Convert.fromWei(item.amountOrder);
          item.nft = getCollectibles().find(
            (collectible) =>
              collectible.id.toString() === item.tokenId.toString()
          );
          return item;
        }
      });
    },

    isBuy() {
      return this.type === "buy";
    },

    typeEnum() {
      return this.type === "buy" ? "0" : "1";
    },

    playerColumnTitle() {
      return this.type === "sell" ? "Seller" : "Buyer";
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
    initData() {
      if (!this.isConnected) {
        return;
      }

      this.headers[0].text = this.playerColumnTitle;
      this.collectibleContract = new Collectibles(this.addresses.collectibles);
      this.wGOLDContract = new wGOLD(this.addresses.wGOLD);
      this.marketNFTS = new MarketNFTS(this.addresses.marketNFTS);
    },

    async loadData(page) {
      if (!this.isConnected) {
        return;
      }

      this.initData();

      this.amountwGOLD = Convert.fromWei(
        await this.wGOLDContract.balanceOf(this.account)
      );

      try {
        page = page || 1;

        const market = await this.marketNFTS.getMarket(
          this.typeEnum,
          this.itemsPerPage,
          page
        );
        this.dataMarket = market.data;
        this.totalItems = parseInt(market.total);
      } catch (error) {
        console.log(error);
        this.loadingText = "Sorry, an error occurred";
      } finally {
        this.isLoading = false;
      }
    },

    getSizeIcon(icon) {
      return icon === "swap" ? 16 : 12;
    },

    async openModal(item) {
      this.nftCollectible = item;
      const isApproved = await this.isApprovedContract(
        this.nftCollectible.orderTypeDesc
      );

      if (!isApproved) {
        this.isRaskelApprovalModalOpen = true;
        this.isLoadingApproveRaskel = false;
        this.raskelApproveText = RASKEL_DEFAULT_APPROVE_TEXT;
      } else {
        this.balanceItem = await this.collectibleContract.balanceOf(
          this.account,
          this.nftCollectible.tokenId
        );

        this.isLoadingConfirm = false;
        this.isConfirmOrderModalOpen = true;
      }
    },

    setInitialStateConfirmOrder() {
      this.isConfirmOrderModalOpen = false;
      this.isLoadingConfirm = false;
      this.confirmOrderWaitingStage = 0;
    },

    executeOrder() {
      try {
        this.isLoadingConfirm = true;
        this.confirmOrderWaitingStage = 1;

        const confirmTransaction = this.marketNFTS.executeOrder(
          this.nftCollectible.orderId,
          this.quantity,
          this.account
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateConfirmOrder();

          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred, please try again!"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.confirmOrderWaitingStage = 2;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateConfirmOrder();

          ToastSnackbar.success(`The order has been executed successful!`);
        });
      } catch (e) {
        this.setInitialStateConfirmOrder();
      }
    },

    async isApprovedContract(type) {
      const listApproved = {
        sell: async () => {
          return await this.collectibleContract.isApprovedForAll(
            this.account,
            this.addresses.marketNFTS
          );
        },
        buy: async () => {
          return await this.wGOLDContract.hasAllowance(
            this.account,
            this.addresses.marketNFTS
          );
        },
      };
      return listApproved[type]();
    },

    approve(type) {
      const listApproved = {
        sell: () => {
          return this.collectibleContract.setApprovalForAll(
            this.addresses.marketNFTS,
            this.account
          );
        },
        buy: () => {
          return this.wGOLDContract.approve(
            this.account,
            this.addresses.marketNFTS
          );
        },
      };

      const confirmTransaction = listApproved[type]();
      this.isLoadingApproveRaskel = true;
      this.raskelApproveText = RASKEL_WAITING_WALLET_APPROVAL;

      confirmTransaction.on("error", (error) => {
        this.isLoadingApproveRaskel = false;

        this.raskelApproveText = RASKEL_DEFAULT_APPROVE_TEXT;

        if (error.message) {
          return ToastSnackbar.error(error.message);
        }

        return ToastSnackbar.error("An error has occurred");
      });

      confirmTransaction.on("transactionHash", async () => {
        this.raskelApproveText = RASKEL_WAITING_FIRST_CONFIRMATION;
      });

      confirmTransaction.on("receipt", async () => {
        this.openModal(this.nftCollectible);
        this.isLoadingApproveRaskel = false;
        this.raskelApproveText = RASKEL_DEFAULT_APPROVE_TEXT;
        this.isRaskelApprovalModalOpen = false;
      });

      return;
    },

    openModalCancelOrder(item) {
      this.nftCollectible = item;
      this.isLoadingConfirm = false;
      this.openCancelOrderGameItem = true;
    },

    setInitialStateCancelOrder() {
      this.isLoadingCancel = false;
      this.raskelCancelText = RASKEL_DEFAULT_CANCEL_TEXT;
      this.openCancelOrderGameItem = false;
    },

    cancelOrder() {
      try {
        this.isLoadingCancel = true;
        this.raskelCancelText = RASKEL_WAITING_WALLET_APPROVAL;

        const confirmTransaction = this.marketNFTS.cancelOrder(
          this.nftCollectible.orderId,
          this.account
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateCancelOrder();

          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "Raskel - The traveler, an error has occurred, please try again!"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.raskelCancelText = RASKEL_CANCEL_WAITING_FIRST_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateCancelOrder();

          ToastSnackbar.success(`Order canceled!`);

          this.loadData();
        });
      } catch (e) {
        this.setInitialStateCancelOrder();
      }
    },
  },
};
</script>

<style scoped>
.card-table-black-market,
.table-black-market {
  background: transparent;
}

.table-black-market >>> .v-data-table__wrapper > table > tbody > tr > td,
.table-black-market >>> .v-data-table__wrapper > table > thead > tr > td,
.table-black-market >>> .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 1rem;
}

.table-black-market >>> .v-data-table__wrapper > table > tbody > tr > th,
.table-black-market >>> .v-data-table__wrapper > table > thead > tr > th,
.table-black-market >>> .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 1rem;
  color: #ffb800;
}

.table-black-market
  >>> .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: thin solid #ffffff;
}

.table-black-market
  >>> .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #ffffff;
}

.table-black-market
  >>> .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:last-child,
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:last-child {
  border-bottom: thin solid #ffffff;
}

.table-black-market >>> .v-data-footer {
  border-top: thin solid #ffffff;
}
</style>

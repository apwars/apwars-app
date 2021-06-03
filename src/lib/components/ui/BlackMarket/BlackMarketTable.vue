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
                {{ item.nft.quantity }}
              </span>
            </div>
          </template>
          <template v-slot:[`item.amountFormatted`]="{ item }">
            <div class="d-flex">
              <amount
                class="align-self-center"
                :amount="item.amountFormatted"
                decimals="2"
                formatted
                tooltip
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
        <confirm-order-game-item
          :open="openConfirmOrderGameItem"
          :nftCollectible="nftCollectible"
          :type="nftCollectible.orderTypeDesc"
          :isLoading="isLoadingConfirm"
          @confirm="executeOrder"
          @close="openConfirmOrderGameItem = false"
        >
        </confirm-order-game-item>

        <raskel-modal
          :open="openCancelOrderGameItem"
          :isLoading="isLoadingCancel"
          text="If you cancel this offer I will not receive any fee! Are you sure about that? I am working for nothing!"
          @confirm="cancelOrder"
          @close="openCancelOrderGameItem = false"
        ></raskel-modal>

        <raskel-modal
          :open="approveRaskel"
          :isLoading="isLoadingApproveRaskel"
          text="To work for you and create this order, I need to receive approval to trade your items. You can trust me, my fellow!"
          @confirm="approve(nftCollectible.orderTypeDesc)"
          @close="approveRaskel = false"
        ></raskel-modal>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ConfirmOrderGameItem from "@/lib/components/ui/Modals/ConfirmOrderGameItem";
import RaskelModal from "@/lib/components/ui/Modals/RaskelModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import Convert from "@/lib/helpers/Convert";

import { getCollectibles } from "@/data/Collectibles";

import MarketNFTS from "@/lib/eth/MarketNFTS.js";
import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  props: ["type"],
  components: {
    VAddress,
    Amount,
    wButton,
    ConfirmOrderGameItem,
    RaskelModal,
  },

  data() {
    return {
      approveRaskel: false,
      isLoadingApproveRaskel: false,
      nftCollectible: {},
      openConfirmOrderGameItem: false,
      openCancelOrderGameItem: false,
      isLoadingConfirm: false,
      isLoadingCancel: false,
      marketNFTS: {},
      itemsPerPage: 10,
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
        },
        { text: "Game Item", value: "nft.title", width: "25%" },
        { text: "Type", value: "nft.typeDesc", width: "15%" },
        // { text: "Unit", value: "nft.quantity", width: "10%" },
        { text: "Price/Unit", value: "amountFormatted", width: "15%" },
        { text: "", value: "action", sortable: false, width: "20%" },
      ],
      btnActionWidth: "100%",
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
    this.initData();
    this.loadData();
  },

  methods: {
    initData() {
      this.headers[0].text = this.playerColumnTitle;
      this.collectibleContract = new Collectibles(this.addresses.collectibles);
      this.wGOLDContract = new wGOLD(this.addresses.wGOLD);
      this.marketNFTS = new MarketNFTS(this.addresses.marketNFTS);
    },
    
    async loadData(page) {
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
        this.$nextTick(() => {
          if (document.querySelector(".v-data-table__mobile-row") !== null) {
            this.btnActionWidth = `${document.querySelector(
              ".v-data-table__mobile-row"
            ).offsetWidth - 50}px`;
          }
        });
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
        this.approveRaskel = true;
        this.isLoadingApproveRaskel = false;
      } else {
        this.isLoadingConfirm = false;
        this.openConfirmOrderGameItem = true;
      }
    },
    
    executeOrder() {
      this.isLoadingConfirm = true;
      const textType =
        this.nftCollectible.orderType === "1" ? "purchase" : "sale";
      const confirmTransaction = this.marketNFTS.executeOrder(
        this.nftCollectible.orderId,
        this.quantity,
        this.account
      );

      confirmTransaction.on("error", (error) => {
        this.isLoadingConfirm = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred, please try again!"
        );
      });
      
      confirmTransaction.on("transactionHash", () => {
        this.openConfirmOrderGameItem = false;
        this.isLoadingConfirm = false;
        ToastSnackbar.info(`Executing your order!`);
      });
      
      confirmTransaction.on("receipt", () => {
        ToastSnackbar.success(`The order has been executed successful!`);
      });
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

      confirmTransaction.on("error", (error) => {
        this.isLoadingApproveRaskel = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "Raskel - The traveler, there was a problem with your access"
        );
      });
      confirmTransaction.on("receipt", async () => {
        this.isLoadingApproveRaskel = false;
        this.openModal(this.nftCollectible);
        ToastSnackbar.success("Raskel - The traveler, approved your access");
      });

      return;
    },

    openModalCancelOrder(item) {
      this.nftCollectible = item;
      this.isLoadingConfirm = false;
      this.openCancelOrderGameItem = true;
    },
    cancelOrder() {
      this.isLoadingCancel = true;
      const confirmTransaction = this.marketNFTS.cancelOrder(
        this.nftCollectible.orderId,
        this.account
      );

      confirmTransaction.on("error", (error) => {
        this.isLoadingCancel = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "Raskel - The traveler, an error has occurred, please try again!"
        );
      });
      confirmTransaction.on("transactionHash", () => {
        ToastSnackbar.info(`Waiting confirmation!`);
      });
      confirmTransaction.on("receipt", () => {
        this.isLoadingCancel = false;
        this.openCancelOrderGameItem = false;
        ToastSnackbar.success(`Order canceled!`);

        this.loadData();
      });
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

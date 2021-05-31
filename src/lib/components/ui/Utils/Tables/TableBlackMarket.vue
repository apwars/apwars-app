<template>
  <v-card width="100%">
    <v-card-title>
      <h4 class="text-h4">{{ titleTable }}</h4>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        :loading="isLoading"
        :loading-text="loadingText"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      class="table-black-market"
      :headers="headers"
      :items="listMarket"
      :search="search"
      :items-per-page="itemsPerPage"
      :server-items-length="totalItems"
      @update:page="loadData"
    >
      <template v-slot:[`item.sender`]="{ item }">
        <v-address :address="item.sender" link tooltip></v-address>
      </template>
      <template v-slot:[`item.nft`]="{ item }">
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
      <template v-slot:[`item.amount`]="{ item }">
        <div class="d-flex">
          <img
            src="/images/wgold.png"
            class="align-self-center"
            width="30px"
            alt="wGOLD"
          />
          <amount
            class="align-self-center"
            :amount="item.amountOrder"
            decimals="2"
            tooltip
          />
        </div>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <wButton
          :style="`width: ${btnActionWidth}`"
          class="mx-auto my-2"
          size="small"
          @click="openModal(item)"
        >
          <div class="d-flex justify-center">
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
      :open="approveRaskel"
      @confirm="approve(nftCollectible.orderTypeDesc)"
      @close="approveRaskel = false"
      :isLoading="isLoadingApproveRaskel"
    ></raskel-modal>
  </v-card>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import wButton from "@/lib/components/ui/Utils/wButton";
import ConfirmOrderGameItem from "@/lib/components/ui/Modals/ConfirmOrderGameItem";
import RaskelModal from "@/lib/components/ui/Modals/RaskelModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";

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
      isLoadingConfirm: false,
      marketNFTS: {},
      itemsPerPage: 10,
      totalItems: 0,
      quantity: 1,
      isLoading: true,
      loadingText: "Loading... Please wait",
      search: "",
      dataMarket: [],
      headers: [
        {
          text: "Player",
          value: "sender",
        },
        { text: "Game Item", value: "nft" },
        { text: "Type", value: "nft.typeDesc" },
        { text: "Price/Unit", value: "amount" },
        { text: "", value: "action" },
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
          item.nft = getCollectibles().find(
            (collectible) =>
              collectible.id.toString() === item.tokenId.toString()
          );
          return item;
        }
      });
    },
    typeEnum() {
      return this.type === "buy" ? "0" : "1";
    },
    titleTable() {
      return this.type === "sell" ? "Items for sale" : "Wanted Items";
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
          this.btnActionWidth = `${document.querySelector(
            ".v-data-table__mobile-row"
          ).offsetWidth - 50}px`;
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
      this.marketNFTS
        .executeOrder(this.nftCollectible.orderId, this.quantity, this.account)
        .on("error", (error) => {
          this.isLoadingConfirm = false;
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "Raskel - The traveler, an error has occurred, please try again!"
          );
        })
        .on("transactionHash", async () => {
          this.openConfirmOrderGameItem = false;
          this.isLoadingConfirm = false;
          ToastSnackbar.info(
            `Raskel - The traveler, checking your ${textType}`
          );
        })
        .on("receipt", async () => {
          ToastSnackbar.success(
            `Raskel - The traveler, successful ${textType}`
          );
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
  },
};
</script>

<style scoped>
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

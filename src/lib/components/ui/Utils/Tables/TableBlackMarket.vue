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
            :amount="item.amount"
            decimals="2"
            approximate
            tooltip
          />
        </div>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <wButton class="mx-auto" size="small">
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
  </v-card>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import wButton from "@/lib/components/ui/Utils/wButton";

import { getCollectibles } from "@/data/Collectibles";

import MarketNFTS from "@/lib/eth/MarketNFTS.js";

export default {
  props: ["type"],
  components: {
    VAddress,
    Amount,
    wButton,
  },

  data() {
    return {
      marketNFTS: {},
      itemsPerPage: 10,
      totalItems: 0,
      isLoading: true,
      loadingText: "Loading... Please wait",
      search: "",
      dataMarket: [],
      dataMarketTest: [
        {
          address: "0x157F9d18d48052eD1877eC700fC304b7B6cDd766",
          nft: 26,
          price: "1000000000000000000000",
          orderType: "Buy",
          typeMarket: "buy",
        },
        {
          address: "0x157F9d18d48052eD1877eC700fC304b7B6cDd766",
          nft: 25,
          price: "1500000000000000000000",
          orderType: "Swap",
          typeMarket: "buy",
        },
        {
          address: "0x157F9d18d48052eD1877eC700fC304b7B6cDd766",
          nft: 25,
          price: "1500000000000000000000",
          orderType: "Swap",
          typeMarket: "sell",
        },
        {
          address: "0x157F9d18d48052eD1877eC700fC304b7B6cDd766",
          nft: 13,
          price: "1200000000000000000000",
          orderType: "Sell",
          typeMarket: "sell",
        },
      ],
      headers: [
        {
          text: "Player",
          value: "sender",
        },
        { text: "NFT", value: "nft" },
        { text: "Type", value: "nft.typeDesc" },
        { text: "Price/Unit", value: "amount" },
        { text: "", value: "action" },
      ],
    };
  },

  computed: {
    addresses() {
      return this.$store.getters["user/addresses"];
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
    listMarket() {
      if (this.dataMarket === undefined || this.dataMarket.length === 0) {
        return [];
      }

      return this.dataMarket.filter((item) => {
        if (item.orderType === this.typeEnum) {
          item.orderTypeDesc = this.typeEnum === "0" ? "buy" : "sell";
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
      return this.type === "buy" ? "Items for sale" : "Wanted Items";
    },
  },
  async mounted() {
    this.loadData();
  },

  methods: {
    async loadData(page) {
      try {
        this.marketNFTS = new MarketNFTS(this.addresses.marketNFTS);
        const totalNFTS = await this.marketNFTS.getOrdersLength();
        console.log(totalNFTS);
        page = page || 1;
        this.totalItems = parseInt(totalNFTS);

        this.dataMarket = await this.marketNFTS.getMarket(
          this.typeEnum,
          this.itemsPerPage,
          page
        );

        console.log(this.dataMarket);
        var g= 'teste';
      } catch (error) {
        console.log(error);
        this.loadingText = "Sorry, an error occurred";
      } finally {
        this.isLoading = false;
      }
    },
    getSizeIcon(icon) {
      return icon === "Swap" ? 16 : 12;
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

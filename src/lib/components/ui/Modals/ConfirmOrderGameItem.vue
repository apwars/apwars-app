<template>
  <modal-wood
    v-if="open"
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading || !isBalanceItem"
    :disabledClose="isLoading"
    :title="titleOrder"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
  >
    <v-row dense>
      <v-col dense cols="3">
        <div class="text-center">
          <v-img
            class="d-flex"
            width="100%"
            :src="nftCollectible.nft.image"
          ></v-img>
        </div>
      </v-col>

      <v-col dense cols="9">
        <div>
          <game-text-h2>{{ nftCollectible.nft.title }}</game-text-h2>
          <h4 class="mt-3">
            {{ descriptionOrder }}
            <amount
              class="align-self-center"
              :amount="nftCollectible.amountOrder"
              decimals="2"
              tooltip
            />
            wGold for this Game Item.
          </h4>
        </div>
        <v-alert
          v-if="!isBalanceItem"
          class="my-2"
          outlined
          type="warning"
          border="left"
          dense
        >
          You do not have balance to execute this order
        </v-alert>
      </v-col>
    </v-row>
  </modal-wood>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Utils/wButton";
import GameTextH2 from "@/lib/components/ui/Utils/GameTextH2";
import ModalWood from "@/lib/components/ui/Modals/Templates/Wood";

import Convert from "@/lib/helpers/Convert";

import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  props: ["open", "nftCollectible", "type", "isLoading"],

  components: {
    wButton,
    GameTextH2,
    Amount,
    ModalWood,
  },

  data() {
    return {
      dialog: false,
      collectibleContract: {},
      balanceItem: 0,
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
    isBalanceItem() {
      if (this.type === "buy") {
        const amountOrder = parseFloat(
          Convert.fromWei(this.nftCollectible.amountOrder)
        );
        const balanceItem = parseFloat(Convert.fromWei(this.balanceItem));
        return this.balanceItem === "0" || amountOrder > balanceItem
          ? false
          : true;
      }

      return Convert.fromWei(this.balanceItem) >= 1;
    },
    titleOrder() {
      return this.type === "buy"
        ? "Confirm your purchase"
        : "Confirm your sale";
    },
    descriptionOrder() {
      return this.type === "buy" ? "You will pay" : "You will receive";
    },
  },

  watch: {
    open() {
      if (this.open) {
        this.initData();
        this.loadData();
      }
    },
    account() {
      if (this.open) {
        this.initData();
        this.loadData();
      }
    },
  },

  mounted() {
    if (this.open) {
      this.initData();
      this.loadData();
    }
  },

  methods: {
    initData() {
      if (this.open) {
        this.collectibleContract = new Collectibles(
          this.nftCollectible.nft.contractAddress
        );
        this.wGOLDContract = new wGOLD(this.addresses.wGOLD);
      }
    },
    async loadData() {
      this.balanceItem = await this.balaceItem(this.type);
    },
    close() {
      this.$emit("close");
    },
    async balaceItem(type) {
      const listBalance = {
        sell: async () => {
          const balance = await this.collectibleContract.balanceOf(
            this.account,
            this.nftCollectible.tokenId
          );
          return Convert.toWei(balance);
        },
        buy: async () => {
          return await this.wGOLDContract.balanceOf(this.account);
        },
      };
      return listBalance[type]();
    },
  },
};
</script>

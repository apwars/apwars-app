<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <Button
          text="Go back to Home"
          icon="arrow-back"
          type="wtertiary"
          no-padding
          :handleClick="backToHome"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters>
          <v-col> <Title class="mt-1" text="Loyalty Shop" /> </v-col
        ></v-row>
        <v-row no-gutters>
          <v-col>
              <div class="wallet-info mt-3">
            <div class="default-text bold mr-2">You have:</div> <img src="/images/wscars.png" alt="WarPoints" /> <div class="default-text bold ml-1">750.000 WarPoints</div>
            </div>
            <div class="default-text">{{ truncate(account) }}</div>
          </v-col></v-row
        >
      </v-col>
      <v-col class="d-flex justify-end">
        <img src="/images/icons/tent.png" alt="Loyalty Shop"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <div class="section-title">
          <div class="text">Rewards Game Items</div>
          <div class="underline"></div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
          <template v-if="isLoading">
          <v-skeleton-loader type="image" height="200px" />
          <v-skeleton-loader class="mt-2" type="image" height="200px" />
        </template>
        <div class="default-text" v-if="!items.length">We ran out of stock because everything was sold out, check back later.</div>
        <ShopCard
          v-for="item in items"
          :key="item.id"
          :packageName="item.package"
          :gameItem="item.content[0].symbol"
          :priceValue="item.price.amount"
          :token="item.price.symbol"
          :remainingAmount="item.remainingAmount"
          :totalAmount="item.content[0].amount"
          :handleBuy="handleBuy"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import PacksController from "@/controller/PacksController";

import walletTruncate from "@/helpers/walletTruncate";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";

import ShopCard from "./ShopCard";

export default {
  components: { Title, Button, ShopCard },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
  },
  data() {
    return {
      isLoadingBuy: null,
      isLoading: false,
      items: [],
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToHome() {
      this.$router.push("/");
    },
    handleBuy(packageName) {
      this.buyPack(packageName)
    },
    truncate(text) {
      return walletTruncate(text);
    },
    async fetchItems() {
      if (!this.isConnected) {
        return
      }
      try {
        this.isLoading = true;
        const controller = new PacksController();
        const packageType = 'LOYALT_SHOP'
        let items = await controller.getByType(packageType);
        this.items = items;
      } catch (error) {
        console.error(
          "There was an error trying to get available items, try again later.",
          error
        );
      } finally {
        this.isLoading = false;
      }
    },
    async buyPack(packageName) {
      try {
        this.isLoadingBuy = packageName;
        const controller = new PacksController();
        await controller.buyPack(this.account, packageName);
        this.fetchItems();
        ToastSnackbar.success("The pack was purchased successfully!");
      } catch (error) {
        const mappedErrors = {
          INVALID_AMOUNT: `We don't have any more from this pack to sell.`,
          INVALID_BALANCE: `You don't have balance to buy this pack.`,
        };
        ToastSnackbar.error(mappedErrors[error.code] || error.message);
        console.error(
          "Something went wrong while trying to buy this pack",
          error
        );
      } finally {
        this.isLoadingBuy = null;
      }
    },
  },
  created() {
    this.setHeader(false);
    if (this.isConnected) {
      this.fetchItems();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
  watch: {
    account() {
      this.fetchItems();
    },
  },
};
</script>
<style lang="scss" scoped>
.section-title {
  display: inline-block;
  .text {
    font-size: 42px;
    line-height: 1.4;
    font-weight: bold;
    color: #ffb800;
  }
  .underline {
    width: 75%;
    height: 5px;
    background-color: white;
    border-radius: 5px;
  }
}
.wallet-info {
    display: flex;
    align-items: center;
}

.default-text {
  font-size: 24px;
  line-height: 1.4;
  color: #ffffff;
  &.bold {
    font-weight: bold;
  }
}
</style>

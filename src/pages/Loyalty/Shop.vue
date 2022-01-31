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
            <div class="default-text bold mr-2">You have:</div> <img src="/images/loyalty.png" alt="WarPoints" /> <div class="default-text bold ml-1">750.000 WarPoints</div>
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
        <template v-if="isLoading">
          <v-skeleton-loader type="image" height="280px" />
          <v-skeleton-loader class="mt-2" type="image" height="280px" />
        </template>
        <div class="section-title">
          <div class="text">Rewards Game Items</div>
          <div class="underline"></div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <ShopCard
          v-for="(item, index) in items"
          :key="index"
          :gameItem="item.id"
          :priceAmount="item.priceAmount"
          :remainingAmount="item.remainingAmount"
          :totalAmount="20"
          :handleBuy="handleBuy"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

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
      items: [
        {
          id: "GameItem39",
          remainingAmount: 20,
          totalAmount: 100,
          priceValue: 200000,
        },
        {
          id: "GameItem33",
          remainingAmount: 20,
          totalAmount: 100,
          priceValue: 5656,
        },
        {
          id: "GameItem22",
          remainingAmount: 0,
          totalAmount: 100,
          priceValue: 35430,
        },
        {
          id: "GameItem39",
          remainingAmount: 20,
          totalAmount: 100,
          priceValue: 200000,
        },
        {
          id: "GameItem33",
          remainingAmount: 20,
          totalAmount: 100,
          priceValue: 5656,
        },
        {
          id: "GameItem22",
          remainingAmount: 0,
          totalAmount: 100,
          priceValue: 35430,
        },
        {
          id: "GameItem39",
          remainingAmount: 20,
          totalAmount: 100,
          priceValue: 200000,
        },
        {
          id: "GameItem33",
          remainingAmount: 20,
          totalAmount: 100,
          priceValue: 5656,
        },
        {
          id: "GameItem22",
          remainingAmount: 0,
          totalAmount: 100,
          priceValue: 35430,
        },
      ],
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToHome() {
      this.$router.push("/");
    },
    handleBuy(gameItem) {
      console.log(gameItem);
    },
    truncate(text) {
      return walletTruncate(text);
    },
  },
  created() {
    this.setHeader(false);
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
  watch: {
    isConnected() {},
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

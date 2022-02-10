<template>
  <div class="page-background">
    <v-container>
      <v-row no-gutters>
        <v-col>
          <Button
            text="Go back to Loyalty Program"
            icon="arrow-back"
            type="wtertiary"
            no-padding
            :handleClick="backToLoyalty"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <Title class="mt-1" text="Loyalty Shop" />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="d-flex flex-column align-center align-sm-end"
        >
          <div
            class="wallet-info d-flex flex-column flex-sm-row align-center justify-center"
          >
            <Button
              class="mr-sm-2 mt-2 mt-sm-0"
              type="wsecondary"
              text="Back to Loyalty Program"
              :handleClick="backToLoyalty"
            />
            <div class="d-flex mt-2 mt-sm-0">
              <img src="/images/wscars.png" width="95" alt="War SCARS" />
              <div class="info-data ml-2">
                <v-skeleton-loader
                  type="image"
                  height="50px"
                  v-if="isLoadingBalance"
                />
                <h2 class="scars text-h2" v-else>
                  <Amount :amount="balance" formatted tooltip />
                </h2>
                <div class="mt-1">Your War SCARS</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <template v-if="isLoading">
            <v-skeleton-loader type="image" height="200px" />
            <v-skeleton-loader class="mt-2" type="image" height="200px" />
          </template>
          <div class="default-text" v-if="!items.length">
            We ran out of stock because everything was sold out. How about
            checking again later?
          </div>
          <ShopCard
            v-for="item in items"
            :key="item.id"
            :packageName="item.package"
            :amount="item.content[0].amount"
            :balanceGameItem="allBalances[item.content[0].symbol]"
            :gameItem="item.content[0].symbol"
            :priceValue="item.price.amount"
            token="War SCARS"
            :remainingAmount="item.remainingAmount"
            :totalAmount="item.amount"
            :handleBuy="handleBuy"
            :isCelebration="item.isCelebration"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import WalletController from "@/controller/WalletController";
import PacksController from "@/controller/PacksController";

import walletTruncate from "@/helpers/walletTruncate";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import Amount from "@/lib/components/ui/Utils/Amount";

import ShopCard from "./ShopCard";

export default {
  components: { Title, Button, ShopCard, Amount },
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
      isLoading: true,
      items: [],
      isLoadingBalance: false,
      balance: 0,
      allBalances: {},
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToLoyalty() {
      this.$router.push("/loyalty-program");
    },
    handleBuy(packageName) {
      this.buyPack(packageName);
    },
    truncate(text) {
      return walletTruncate(text);
    },
    async fetchItems() {
      if (!this.isConnected) {
        return;
      }
      try {
        this.isLoading = true;
        const controller = new PacksController();
        const packageType = "LOYALTY_SHOP";
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
        await this.fetchBalance();
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
    async fetchBalance() {
      try {
        this.isLoadingBalance = true;
        const controller = new WalletController();
        const balance = await controller.wallets(this.account);
        this.balance = balance.balances.wSCARS || 0;
        this.allBalances = balance.balances;
      } catch (error) {
        console.error("Something went wrong while trying to get your balance.");
      } finally {
        this.isLoadingBalance = false;
      }
    },
  },

  created() {
    this.setHeader(false);
    if (this.isConnected) {
      this.fetchBalance();
      this.fetchItems();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
  watch: {
    async account() {
      this.fetchBalance();
      this.fetchItems();
    },
  },
};
</script>
<style lang="scss" scoped>
.page-background {
  background-image: url("/images/background/blue-mountains.png");
  background-size: cover;
  background-position: top;
}
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

.scars {
  text-align: right;
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

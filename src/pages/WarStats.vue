<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="my-n3 my-md-0">
          <v-img
            class="mx-auto"
            width="550"
            src="/images/treasury/title-fed-treasury.png"
          />
        </v-col>
      </v-row>

      <v-row class="mt-n3">
        <v-col cols="12">
          <v-img
            class="mx-auto"
            width="550"
            src="/images/treasury/fed-treasury.png"
          />
        </v-col>
      </v-row>

      <v-row class="amount-fed">
        <v-col cols="12">
          <wGOLD-button
            v-if="isConnected"
            class="mx-auto"
            :amount="balanceFED"
          ></wGOLD-button>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="isConnected && !isLoading">
      <v-row>
        <v-col cols="12" md="12" lg="6" class="d-none d-md-none d-lg-flex">
          <div class="d-flex justify-start">
            <wButton
              class="mr-3 align-self-center"
              @click="selectTroops = 'myTroops'"
              :actived="selectTroops === 'myTroops'"
              >My Troops</wButton
            >
            <wButton
              class="align-self-center"
              @click="selectTroops = 'globalTroops'"
              :actived="selectTroops === 'globalTroops'"
              >Global Troops</wButton
            >
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <div class="d-flex justify-center justify-md-end my-n3 my-md-0">
            <v-img
              class="btn mr-3 align-self-center"
              src="/images/wgold.png"
              max-width="80"
              max-height="80"
            />
            <div class="align-self-center text-center">
              <span class="label-current">
                Current Price:
              </span>
              <div class="price-WGOLD" v-if="isConnected">
                <amount :amount="priceWGOLD" decimals="3" /> <span class="suffix">BUSD</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="2"
          class="d-flex justify-center justify-md-end"
        >
          <v-img
            @click="goToSwap()"
            class="btn cursor-pointer align-self-center"
            width="237"
            src="/images/buttons/btn-buy-wgold.png"
          />
        </v-col>
      </v-row>

      <v-row class="d-flex d-lg-none">
        <v-col cols="12" md="6" class="d-flex justify-center mt-n3 mt-md-0">
          <wButton
            @click="selectTroops = 'myTroops'"
            :actived="selectTroops === 'myTroops'"
            >My Troops</wButton
          >
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-center mt-n3 mt-md-0">
          <wButton
            @click="selectTroops = 'globalTroops'"
            :actived="selectTroops === 'globalTroops'"
            >Global Troops</wButton
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="isConnected && !isLoading">
      <v-row>
        <v-col cols="12" lg="6">
          <v-img
            class="mb-3 mt-n3 mt-md-0"
            width="318"
            src="/images/corp.png"
          />
          <v-row>
            <v-col
              cols="12"
              lg="6"
              md="4"
              v-for="topper in troopsHumans"
              v-bind:key="topper.name"
            >
              <trooper :info="topper" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="6">
          <v-img
            class="mb-3 mt-n3 mt-md-0"
            width="318"
            src="/images/degen.png"
          />
          <v-row>
            <v-col
              cols="12"
              lg="6"
              md="4"
              v-for="topper in troopsOrcs"
              v-bind:key="topper.name"
            >
              <trooper :info="topper" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="isLoading">
      <v-row>
        <v-col cols="12" class="text-center ma-6 ma-sm-0">
          <h3 class="text-h3">Loading...</h3>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Utils/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import Trooper from "@/lib/components/ui/Utils/Trooper";

import { getTroops } from "@/data/Troops";
import Troops from "@/lib/eth/Troops";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    Trooper,
  },

  data() {
    return {
      balance: 0,
      balanceFED: 0,
      priceWGOLD: 0,
      collectibles: [],
      balances: [],
      itemsCount: 0,
      totalItems: 0,
      isLoading: true,
      selectTroops: "myTroops",
      myTroops: [],
      gobalTroops: [],
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

    formattedAmount() {
      const num = parseInt(this.balance);

      if (this.balance < 1) {
        return "~0";
      } else if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + "K";
      } else if (num > 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      } else if (num < 900) {
        return num;
      }
    },

    troopsHumans() {
      return this.selectTroops === "myTroops"
        ? this.myTroops.filter((trooper) => trooper.team === 1)
        : this.gobalTroops.filter((trooper) => trooper.team === 1);
    },

    troopsOrcs() {
      return this.selectTroops === "myTroops"
        ? this.myTroops.filter((trooper) => trooper.team === 2)
        : this.gobalTroops.filter((trooper) => trooper.team === 2);
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },

    currentBlockNumber() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    goToSwap() {
      window.location = "https://exchange.apwars.farm/#/swap";
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        const wgold = new wGOLD(this.addresses.wGOLD);
        this.balance = web3.utils.fromWei(await wgold.balanceOf(this.account));
        this.balanceFED = await wgold.balanceOf(this.addresses.FED);
        this.priceWGOLD = await wgold.priceWGOLD();

        const troops = getTroops();

        this.gobalTroops = await Promise.all(
          troops.map((trooper) => {
            return new Promise(async (resolve) => {
              try {
                if (trooper.contractAddress === "") {
                  resolve({
                    name: trooper.name,
                    team: trooper.team,
                    tier: trooper.tier,
                    qtyAccount: "0",
                    qtyGlobal: "0",
                    priceWGOLD: "0",
                    disabled: true,
                  });
                }
                const getTropper = new Troops(trooper.contractAddress);
                const qtyAccount = await getTropper.balanceOf(this.account);
                const qtyGlobal = await getTropper.totalSupply();
                const priceWGOLD = await getTropper.priceWGOLD(
                  trooper.lpAddresses
                );
                resolve({
                  name: trooper.name,
                  team: trooper.team,
                  tier: trooper.tier,
                  qtyAccount: qtyAccount,
                  qtyGlobal: qtyGlobal,
                  priceWGOLD: priceWGOLD,
                  disabled: false,
                });
              } catch (error) {
                console.log(error);
              }
            });
          })
        );

        this.myTroops = this.gobalTroops
          .map((trooper) => {
            return { ...trooper, ...{ qty: trooper.qtyAccount } };
          });

        this.gobalTroops = this.gobalTroops.map((trooper) => {
          return { ...trooper, ...{ qty: trooper.qtyGlobal } };
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.amount-fed {
  margin-top: -85px !important;
}
.suffix {
  background: -webkit-linear-gradient(#f6ff00, #ffb800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.label-current {
  font-weight: bold;
  font-size: 14px;
}
.price-WGOLD {
  font-weight: bold;
  font-size: 32px;
}

@media only screen and (max-width: 375px) {
  .price-WGOLD {
    font-size: 18px;
  }
  .amount-fed {
    margin-top: -65px !important;
  }
}
</style>

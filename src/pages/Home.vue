<template>
  <div class="bg-home">
    <div v-if="isLoading">
      <game-text header="h2" class="text-center d-block py-9"
        >Loading...</game-text
      >
    </div>
    <div v-else>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4" class="pr-0 pl-1">
            <game-text header="h3" class="text-center">
              Next War
            </game-text>
            <div class="card-body-home d-flex justify-center align-center">
              <countdown class="mt-3" :time="nextWar" hideEnd />
            </div>
            <div class="d-flex justify-center mt-1">
              <wButton @click="$router.push('/wars')" class="mt-1" disabled="true">
                <span class="text-none text-center">Go to War</span>
              </wButton>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <game-text header="h3" class="text-center">
              Loyalt Program
            </game-text>
            <div class="card-body-home d-flex justify-center align-center">
              <img
                src="/images/icons/coins/wSCARS.png"
                width="95px"
                alt="War SCARS"
              />
              <div class="ml-2">
                <h2 class="text-h2">
                  <amount
                    :amount="balancewSCARS"
                    decimals="0"
                    formatted
                    tooltip
                  />
                </h2>
                <div class="mt-1 font-weight-bold">Your War SCARS</div>
              </div>
            </div>
            <div class="d-flex justify-center mt-1">
              <wButton @click="$router.push('/loyalty-program')" class="mt-1">
                <span class="text-none text-center">Go to Loyalt Program</span>
              </wButton>
              <wButton
                @click="$router.push('/loyalty-program/shop')"
                class="ml-2 mt-1"
              >
                <span class="text-none text-center">Go to Shop</span>
              </wButton>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <game-text header="h3" class="text-center">
              Buy wLAND
            </game-text>
            <div class="card-body-home d-flex justify-center align-center">
              <v-img
                class="mx-auto my-3"
                max-width="200"
                src="/images/wLANDS.png"
              />
            </div>
            <div class="d-flex justify-center mt-1">
              <wButton @click="buywLAND()" class="mt-1">
                <span class="text-none text-center">
                  Buy wLAND
                </span>
              </wButton>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="4">
            <div class="d-flex justify-center">
              <img
                src="/images/tmj.png"
                height="90px"
                class="mt-5 mb-2"
                alt="the monstrous journey"
              />
            </div>
            <div class="d-flex justify-center mt-1">
              <wButton
                @click="$router.push('/the-monstrous-journey')"
                class="mt-1"
              >
                <span class="text-none text-center">
                  Play Now
                </span>
              </wButton>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="d-flex justify-center">
              <img
                src="/images/arcadia-expansion.png"
                height="90px"
                class="mt-5 mb-2"
                alt="arcadia-expansion"
              />
            </div>
            <div class="d-flex justify-center mt-1">
              <wButton @click="$router.push('/arcadia')" class="mt-1">
                <span class="text-none text-center">
                  Play Now
                </span>
              </wButton>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <tasks />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Countdown from "@/lib/components/ui/Utils/Countdown";
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import GameText from "@/lib/components/ui/Utils/GameText";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";
import Tasks from "@/lib/components/ui/Home/Tasks";
import Amount from "@/lib/components/ui/Utils/Amount.vue";

import WalletController from "@/controller/WalletController";

export default {
  components: {
    Countdown,
    wGOLDButton,
    wButton,
    GameText,
    CountdownBlock,
    Tasks,
    Amount,
  },

  data() {
    return {
      isLoading: true,
      balanceFED: 0,
      wars: [],
      lastWar: {},
      warStats: {},
      listTasks: [],
      catapults: [
        { image: "/images/weapons/catapult-humans.png" },
        { image: "/images/weapons/catapult-orcs.png" },
        { image: "/images/weapons/catapult-undead.png" },
        { image: "/images/weapons/catapult-elves.png" },
      ],
      nextWar: 0,
      dateNextWar: 1644235200000,
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

    imgWinnerLastWar() {
      if (this.warStats.winner == "2") {
        return "the-degenerate-win.png";
      }
      return "the-corporation-win.png";
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      if (!this.isConnected) {
        return;
      }
      const dateNow = new Date().getTime();
      this.nextWar = 0;
      if (this.dateNextWar > dateNow) {
        this.nextWar = this.dateNextWar - dateNow;
      }
      this.balancewSCARS = await this.getBalancewSCARS(this.account);
      this.isLoading = false;
    },

    async getBalancewSCARS(account) {
      const controller = new WalletController();
      const wallet = await controller.wallets(account);

      if (!wallet.balances["wSCARS"]) {
        return 0;
      }

      return wallet.balances["wSCARS"];
    },

    buywLAND() {
      window.location.href =
        "https://pancakeswap.finance/swap?outputCurrency=0x2c6107c27a15d2c7f397d88d76257ea42c12f89f&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
    },
  },
};
</script>

<style scoped>
.bg-home {
  background-image: url("/images/bg-home.jpg");
  background-size: cover;
  min-height: 100%;
  background-position: center;
}
.card-body-home {
  height: 150px;
}
</style>

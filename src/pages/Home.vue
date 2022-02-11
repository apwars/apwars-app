<template>
  <div class="d-flex justify-center align-center bg-home">
    <div v-if="isLoading">
      <game-text header="h2" class="text-center d-block py-9"
        >Loading...</game-text
      >
    </div>
    <v-container class="d-flex" v-else fluid>
      <v-row justify="center" align="center" align-content="center">
        <v-col cols="12" md="4" class="pr-0 pl-1">
          <div class="mt-1"></div>
          <game-text header="h4" class="text-center mt-2">
            War is coming soon...
          </game-text>
          <div class="card-body-home d-flex justify-center align-center">
            <countdown class="mt-0" :time="nextWar" hideEnd />
          </div>
          <div class="d-flex justify-center mt-1">
            <wButton @click="$router.push('/war/intro')" class="mt-1">
              <span class="text-none text-center">Go to War</span>
            </wButton>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <game-text header="h3" class="text-center">
            Loyalty Program
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
              <span class="text-none text-center">Go to Loyalty Program</span>
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
            Buy Resources
          </game-text>
          <div class="d-flex flex-column justify-center align-center">
            <div class="d-flex justify-space-between align-center">
              <img class="ml-1  mr-2" width="78px" src="/images/wGOLD.png" />
              <wButton @click="$router.push('/buy-wgold')" class="mt-1">
                <span class="text-none text-center text-buy">
                  Buy wGOLD
                </span>
              </wButton>
            </div>
            <div class="d-flex justify-space-between align-center">
              <img class="mr-2" width="80px" src="/images/wCOURAGE.png" />
              <wButton @click="$router.push('/buy-wcourage')" class="mt-1">
                <span class="text-none text-center text-buy">
                  Buy wCOURAGE
                </span>
              </wButton>
            </div>
            <div class="d-flex justify-space-between align-center">
              <img class="mr-2" width="80px" src="/images/wLAND.png" />
              <wButton @click="$router.push('/buy-wland')" class="mt-1">
                <span class="text-none text-center text-buy">
                  Buy wLAND
                </span>
              </wButton>
            </div>
          </div>
        </v-col>
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
      dateNextWar: 1644840000000,
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
.text-buy {
  width: 150px;
}
</style>

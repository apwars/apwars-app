<template>
  <div class="bg-home">
    <div v-if="isLoading">
      <game-text header="h2" class="text-center d-block py-9">Loading...</game-text>
    </div>
    <div v-else>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4">
            <countdown :time="nextWarCountdown" title="Next War"></countdown>
          </v-col>
          <v-col cols="12" md="4">
            <v-img
              class="mx-auto"
              max-width="300"
              src="/images/treasury/fed-treasury.png"
            />
            <wGOLD-button
              v-if="isConnected"
              class="mx-auto mt-n2"
              :amount="balanceFED"
              size="small"
            ></wGOLD-button>
          </v-col>
          <v-col cols="12" md="4">
            <game-text header="h3" class="text-center"
              >Last war winner</game-text
            >
            <v-img
              class="mx-auto my-3"
              max-width="400"
              :src="`/images/battle/${imgWinnerLastWar}`"
            />
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

import { getWars } from "@/data/Wars";

import WarMachine from "@/lib/eth/WarMachine";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  components: {
    Countdown,
    wGOLDButton,
    wButton,
    GameText,
  },

  data() {
    return {
      isLoading: true,
      nextWar: 1631491200000,
      balanceFED: 0,
      wars: [],
      warStats: {},
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

    nextWarCountdown() {
      return this.nextWar - new Date().getTime();
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
      const contractwGOLD = new wGOLD(this.addresses.wGOLD);
      this.balanceFED = await contractwGOLD.balanceOf(this.addresses.FED);

      this.wars = getWars(this.networkInfo.id !== "56");
      this.wars = this.wars.reverse();

      let warMachine = new WarMachine(
        this.wars[0].contractAddress[this.networkInfo.id],
        this.networkInfo.id
      );
      const warStage = parseInt(await warMachine.warStage());
      if (!warStage) {
        warMachine = new WarMachine(
          this.wars[1].contractAddress[this.networkInfo.id],
          this.networkInfo.id
        );
      }

      this.warStats = await warMachine.warStats();
      this.isLoading = false;
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
</style>

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
          <!-- <v-col cols="12" md="4" class="pr-0 pl-1">
            <countdown
              v-if="nextWarPhase"
              :time="nextWarPhase.endAt"
              :title="nextWarPhase.title"
              @end="getNextWarPhase"
              hideEnd
            />
            <div
              class="d-flex justify-center mt-1"
              v-if="nextWarPhase.redirect"
            >
              <wButton @click="$router.push(nextWarPhase.redirect)">
                {{ nextWarPhase.button_label }}
              </wButton>
            </div>
          </v-col> -->
          <v-col cols="12" md="4" class="mt-3">
            <v-img class="mx-auto" max-width="300" src="/images/wLANDS.png" />
            <div class="d-flex justify-center mt-1">
              <wButton
                @click="buywLAND()"
                class="mt-1"
              >
                <span class="text-none text-center">
                  Buy wLAND
                </span>
              </wButton>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-img class="mx-auto" max-width="300" src="/images/cards.png" />
            <div class="d-flex justify-center mt-1">
              <wButton @click="$router.push('/arcadia-expansion')" class="mt-1">
                <span class="text-none text-center">
                  Buy Arcadia Foundations</span>
              </wButton>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-img
              class="mx-auto my-4"
              max-width="170"
              src="/images/bridge.png"
            />
            <div class="d-flex justify-center">
              <wButton @click="$router.push('/bridge')">
                <span class="text-none">Go to Bridge</span>
              </wButton>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row dense>
          <!-- <v-col cols="12" md="7">
            <game-text header="h3">
              New Technologies - Coming soon
            </game-text>

            <v-slide-group class="mt-3" show-arrows>
              <v-slide-item
                v-for="(item, index) in catapults"
                :key="index"
                v-slot="{ toggle }"
              >
                <div class="d-flex align-center" @click="toggle">
                  <div>
                    <v-img class="mx-2" max-width="150px" :src="item.image" />
                  </div>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-col> -->
          <tasks />
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

import { getWars } from "@/data/Wars";

import WarMachine from "@/lib/eth/WarMachine";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  components: {
    Countdown,
    wGOLDButton,
    wButton,
    GameText,
    CountdownBlock,
    Tasks,
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
      nextWar: {},
      nextWarPhase: null,
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
      const contractwGOLD = new wGOLD(this.addresses.wGOLD);
      this.balanceFED = await contractwGOLD.balanceOf(this.addresses.FED);

      this.wars = getWars(this.networkInfo.id !== "56");
      this.wars = this.wars.reverse();

      this.nextWar = { ...this.wars[0] };
      this.getNextWarPhase();

      let warMachine = new WarMachine(
        this.wars[0].contractAddress[this.networkInfo.id],
        this.networkInfo.id
      );
      this.lastWar = this.wars[0];
      const warStage = parseInt(await warMachine.warStage());
      if (!warStage) {
        this.lastWar = this.wars[1];
        warMachine = new WarMachine(
          this.wars[1].contractAddress[this.networkInfo.id],
          this.networkInfo.id
        );
      }

      this.warStats = await warMachine.warStats();
      this.isLoading = false;
    },

    getNextWarPhase() {
      const nW = this.wars[0];
      const currentTime = new Date().getTime();
      let currentPhase = nW.phases.find((p) => p.endAt - currentTime > 0);

      if (currentPhase) {
        currentPhase = {
          ...currentPhase,
          endAt: currentPhase.endAt - currentTime,
        };
        this.nextWarPhase = currentPhase;
        return;
      }

      this.nextWarPhase = nW.phases[nW.phases.length - 1];
    },

    buywLAND() {
      window.location.href =
                    'https://pancakeswap.finance/swap?outputCurrency=0x2c6107c27a15d2c7f397d88d76257ea42c12f89f&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
    }
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
<template>
  <div>
    <v-alert v-if="isWar.test" type="warning">Danger, it's a test war</v-alert>
    <div v-if="isConnected && !isLoading && warStage > 0">
      <div class="bg-fed">
        <v-container>
          <v-row class="mt-1">
            <v-col cols="12">
              <h2 class="text-h2 text-wGOLD text-center ma-n2 ma-sm-0">
                The Battle for Supremacy
              </h2>
            </v-col>
          </v-row>

          <v-row class="d-none d-sm-none d-md-flex">
            <v-col cols="12" md="4">
              <v-img
                class="mx-auto"
                max-width="400"
                :src="`/images/battle/${teamAimagem}`"
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-center">
              <div class="align-self-center">
                <div class="d-flex justify-center">
                  <div class="align-self-center mx-3">
                    <v-img
                      max-width="40"
                      width="40"
                      src="/images/battle/battle-icon.png"
                    />
                  </div>

                  <h3 class="text-h3 text-wGOLD text-center">
                    Round 1
                  </h3>
                </div>
                <div class="text-justify">
                  After a bloody battle, <b>{{ winner }}</b> took the victory,
                  and now they will compete against the Forces of Extreme
                  Darkness, seeking to amass as many wGOLD as possible, good
                  luck {{ winner }}, the FED is merciless.
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                class="mx-auto"
                max-width="400"
                :src="`/images/battle/${teamBimagem}`"
              />
            </v-col>
          </v-row>

          <v-row class="d-flex d-sm-flex d-md-none">
            <v-col cols="12">
              <v-img
                class="mx-auto"
                max-width="600"
                src="/images/battle/battle-round-1.png"
              />
              <div>
                After a bloody battle, <b>{{ winner }}</b> took the victory, and
                now they will compete against the Forces of Extreme Darkness,
                seeking to amass as many wGOLD as possible, good luck
                {{ winner }}, the FED is merciless.
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div class="gradient"></div>
      </div>

      <v-container>
        <v-row class="mt-n7 mt-sm-n13">
          <v-col
            v-if="isCountdown && warStage === 1"
            cols="12"
            class="d-flex justify-center"
          >
            <countdown
              :time="countdownTime"
              title="This round ends in"
              @end="loadData"
            ></countdown>
          </v-col>
          <v-col v-else cols="12" class="d-flex justify-center">
            <v-img
              class="mx-auto cursor-pointer"
              max-width="346"
              src="/images/battle/go-to-round.png"
              @click="$router.push(`/wars/${contractWar}/round-2`)"
            />
          </v-col>
        </v-row>
      </v-container>

      <list-units
        class="my-3"
        v-if="isConnected && !isLoading"
        type="report-trooper"
        :contract-war="contractWar"
      ></list-units>
    </div>
    <div v-else-if="isConnected && !isLoading">
      <div class="bg-fed">
        <v-container>
          <v-row class="my-9">
            <v-col cols="12" class="d-flex justify-center my-9">
              <h3 class="text-h3 text-wGOLD text-center">Waiting result...</h3>
            </v-col>
          </v-row>
        </v-container>
        <div class="gradient"></div>
      </div>
    </div>
    <div v-else>
      <div class="bg-fed">
        <v-container>
          <v-row class="my-9">
            <v-col cols="12" class="d-flex justify-center my-9">
              <h3 class="text-h3 text-wGOLD text-center">Loading...</h3>
            </v-col>
          </v-row>
        </v-container>
        <div class="gradient"></div>
      </div>
    </div>
  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ReportTrooper from "@/lib/components/ui/Utils/ReportTrooper";
import WarMachine from "@/lib/eth/WarMachine";
import Countdown from "@/lib/components/ui/Utils/Countdown";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";

export default {
  components: {
    wGOLDButton,
    wButton,
    ReportTrooper,
    Countdown,
    ListUnits,
  },

  data() {
    return {
      isLoading: true,
      gobalTroops: [],
      warMachine: {},
      warStats: {},
      warStage: "0",
      isWar: { test: false },
      contractWar: this.$route.params.contractWar,
      countdownTime: 0,
      isCountdown: false,
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

    teamA() {
      return this.gobalTroops.filter((trooper) => trooper.team === 1);
    },

    teamB() {
      return this.gobalTroops.filter((trooper) => trooper.team === 2);
    },
    teamAimagem() {
      if (!this.warStats.winner) return "the-corporation.png";
      if (this.warStats.winner == "1") {
        return "the-corporation-win.png";
      }
      return "the-corporation-loser.png";
    },
    teamBimagem() {
      if (!this.warStats.winner) return "the-degenerate.png";
      if (this.warStats.winner == "2") {
        return "the-degenerate-win.png";
      }
      return "the-degenerate-loser.png";
    },
    winner() {
      if (!this.warStats.winner) return "";
      if (this.warStats.winner == "1") {
        return "The Corporations";
      } else if (this.warStats.winner == "2") {
        return "The Degenerates";
      }
    },
  },

  watch: {
    isConnected() {
      this.initData();
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
    if (!this.isConnected) {
      return;
    }
    this.initData();
    this.loadData();
  },

  methods: {
    goToSwap() {
      this.$router.push("/exchange");
    },

    initData() {
      try {
        this.warMachine = new WarMachine(this.contractWar, this.networkInfo.id);
        this.isWar = getWars(this.networkInfo.id !== "56").find(
          (war) => war.contractAddress[this.networkInfo.id] === this.contractWar
        );
        if (!this.isWar) {
          this.router.push("/wars");
        }
        this.isCountdown = this.isWar.countdown.round2 > new Date().getTime();
        if (this.isCountdown) {
          this.countdownTime =
            this.isWar.countdown.round2 - new Date().getTime();
        }
        this.gobalTroops = getTroops();
      } catch (error) {}
    },

    async loadData() {
      try {
        this.warStats = await this.warMachine.warStats();
        this.warStage = parseInt(await this.warMachine.warStage());
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.bg-fed {
  background-image: url("/images/battle/fed-background.png");
  background-size: cover;
}
.gradient {
  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

.dividing-line {
  background-image: url("/images/battle/line.png");
  background-position: right;
}

.isLoading {
  opacity: 0;
}
.loading {
  display: none;
}

@media only screen and (max-width: 600px) {
  .gradient {
    display: none;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>

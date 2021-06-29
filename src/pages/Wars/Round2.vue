<template>
  <div>
    <div v-if="isConnected && !isLoading && warStage > 1">
      <v-alert v-if="isWar.test" type="warning"
        >Danger, it's a test war</v-alert
      >
      <div class="bg-fed">
        <v-container>
          <v-row class="mt-1">
            <v-col cols="12">
              <h2 class="text-h2 text-wGOLD text-center ma-n2 ma-sm-0">
                The Battle against the FED
              </h2>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4" class="align-self-center">
              <v-img
                v-if="winner === 'The Corporation'"
                class="mx-auto"
                max-width="400"
                src="/images/battle/the-corporation.png"
              />
              <v-img
                v-else
                class="mx-auto"
                max-width="400"
                src="/images/battle/the-degenerate-round-2.png"
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

                  <h3 class="text-h3 text-wGOLD align-self-center">
                    Round 2
                  </h3>
                </div>
                <div v-if="isConnected && !isLoading" class="text-justify">
                  The battle came to an end, and {{ winner }} fought bravely,
                  congratulations on the sweaty combat. Now go and enjoy your
                  rewards!
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                class="mx-auto"
                width="370"
                src="/images/battle/fed-round-2.png"
              />
              <wGOLD-button
                v-if="isConnected && !isLoading"
                class="mx-auto mt-n8"
                :amount="isWar.totalPrize"
                size="small"
              ></wGOLD-button>
            </v-col>
          </v-row>
        </v-container>
        <div class="gradient"></div>
      </div>

      <v-container fluid>
        <v-row class="mt-n7 mt-sm-n15">
          <v-col cols="12">
            <h1 class="text-h3 text-md-h1 text-center text-wGOLD">
              wGOLD won for {{ winner }}
            </h1>
            <div class="subtext-wGOLD my-3">
              The war is over! The forces won the FED, all the wGOLD won is
              being distributed!
            </div>
          </v-col>
        </v-row>

        <v-row v-if="isConnected && !isLoading" class="bg-burned">
          <v-col cols="12" md="6">
            <div class="d-flex justify-end mx-0 mx-md-6">
              <v-img
                class="btn mr-1 align-self-center"
                src="/images/wgold.png"
                max-width="120"
                width="120"
                height="120"
              />
              <div class="price-wGOLD align-self-center">
                <div class="subtitle-won">ENTIRE PRIZE:</div>
                <amount :amount="prize.won" decimals="2" compact approximate />
                <span class="suffix">wGOLD</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex justify-start mx-0 mx-md-6">
              <v-img
                class="btn mr-1 align-self-center"
                src="/images/battle/burned.png"
                max-width="120"
                width="120"
              />
              <div class="price-wGOLD align-self-center">
                <div class="subtitle-won">BURNED:</div>
                <amount
                  :amount="prize.burned"
                  decimals="2"
                  compact
                  approximate
                />
                <span class="suffix">wGOLD</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-img
              class="mx-auto cursor-pointer"
              max-width="346"
              src="/images/battle/go-to-war-report.png"
              @click="$router.push(`/wars/${contractWar}/report`)"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row v-if="isConnected && !isLoading">
          <v-col
            cols="12"
            lg="6"
            class="d-flex justify-center"
            v-for="trooper in teamWinner"
            v-bind:key="trooper.name"
          >
            <report-trooper :trooper="trooper" :contract-war="contractWar" />
          </v-col>
        </v-row>
      </v-container>
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
import Amount from "@/lib/components/ui/Utils/Amount";
import ReportTrooper from "@/lib/components/ui/Utils/ReportTrooper";
import WarMachine from "@/lib/eth/WarMachine";

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    ReportTrooper,
  },

  data() {
    return {
      prize: {},
      isLoading: true,
      myTroops: [],
      priceWGOLD: 0,
      balance: 0,
      globalTroops: [],
      warMachine: {},
      warStats: {},
      contractWar: this.$route.params.contractWar,
      warStage: 0,
      isWar: { test: false },
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

    teamWinner() {
      return this.globalTroops.filter(
        (trooper) => trooper.team === parseInt(this.warStats.winner)
      );
    },

    winner() {
      if (!this.warStats.winner) return "";
      if (this.warStats.winner == "1") {
        return "The Corporation";
      } else if (this.warStats.winner == "2") {
        return "The Degenerate";
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
      window.location = "https://exchange.apwars.farm/#/swap";
    },

    initData() {
      this.warMachine = new WarMachine(this.contractWar, this.networkInfo.id);
      this.isWar = getWars(this.networkInfo.id !== "56").find(
        (war) => war.contractAddress[this.networkInfo.id] === this.contractWar
      );
      if (!this.isWar) {
        this.router.push("/wars");
      }
      this.globalTroops = getTroops();
    },

    async loadData() {
      try {
        this.warStage = await this.warMachine.warStage();
        this.warStage = parseInt(this.warStage);
        this.warStats = await this.warMachine.warStats();
        this.prize = await this.warMachine.getWarReportwGOLD();
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

.flip-image {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.subtext-wGOLD {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  color: #c4c4c4;
  width: 600px;
  margin: 0 auto;
}
.subtitle-won {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  color: #c4c4c4;
}
.price-wGOLD {
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 52px;
  color: #ffffff;
}

.price-wGOLD .suffix {
  background: linear-gradient(
    180deg,
    #f6ff00 0%,
    #ffb800 53.65%,
    #ffb800 77.08%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media only screen and (max-width: 600px) {
  .gradient {
    display: none;
  }
  .subtext-wGOLD {
    font-size: 20px;
    line-height: 29px;
    width: 100%;
  }
}
</style>

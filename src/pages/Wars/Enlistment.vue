<template>
  <div>
    <div v-if="!isCountdown">
      <div class="bg-fed">
        <v-alert v-if="isWar.showTest" type="warning">
          Danger, it's a test war
        </v-alert>
        <v-container>
          <v-row class="d-none d-sm-none d-md-flex my-0 my-md-3">
            <v-col cols="12" md="4">
              <v-img
                class="mx-auto"
                max-width="400"
                src="/images/battle/the-corporation.png"
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
                    Enlistment
                  </h3>
                </div>
                <div>
                  Prepare for the battle! Choose a side and send your troops to
                  the war!
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                class="mx-auto"
                max-width="400"
                src="/images/battle/the-degenerate.png"
              />
            </v-col>
          </v-row>

          <v-row class="d-flex d-sm-flex d-md-none mt-n3">
            <v-col cols="12">
              <v-img
                class="mx-auto"
                max-width="600"
                src="/images/battle/battle-start-mobile.png"
              />
              <div>
                Prepare for the battle! Choose a side and send your troops to
                the war!
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div class="gradient"></div>
      </div>

      <v-container>
        <v-row class="mt-n6 mt-md-n16">
          <v-col cols="12">
            <countdown
              :time="countdownTimeEnd"
              title="The enlistment ends in"
              @end="loadData"
            ></countdown>
            <h2 class="text-h2 text-wGOLD text-center mt-2">Units</h2>
          </v-col>
        </v-row>
      </v-container>

      <list-units
        class="my-3"
        v-if="isConnected && !isLoading && isEnlistment"
        type="enlistment"
        :contract-war="contractWar"
      ></list-units>

      <v-container v-else-if="!isLoading && !isEnlistment">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <h3 class="text-h4 text-md-h3 ma-0 ma-md-6">
              Enlistment period ended
            </h3>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-else>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <h3 class="text-h3">Loading...</h3>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="!isLoading && !isEnlistment">
        <v-row class="mt-3">
          <v-col cols="12" class="d-flex justify-center">
            <v-img
              @click="goToSwap()"
              class="mx-auto cursor-pointer"
              max-width="300"
              src="/images/buttons/btn-buy-more-troops.png"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <div class="bg-fed">
        <v-container>
          <v-row class="my-6">
            <v-col cols="12">
              <countdown
                :time="countdownTime"
                title="Countdown"
                @end="loadData"
              ></countdown>
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
import Countdown from "@/lib/components/ui/Utils/Countdown";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";

import WarMachine from "@/lib/eth/WarMachine";

export default {
  components: {
    wGOLDButton,
    wButton,
    Countdown,
    ListUnits,
  },

  data() {
    return {
      isLoading: true,
      contractWar: this.$route.params.contractWar,
      globalTroops: [],
      isEnlistment: false,
      warMachine: {
        isLoading: true,
      },
      isWar: { test: false },
      isCountdown: false,
      countdownTime: 0,
      countdownTimeEnd: 0,
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
      return this.globalTroops.filter((trooper) => trooper.team === 1);
    },

    teamB() {
      return this.globalTroops.filter((trooper) => trooper.team === 2);
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

        this.isCountdown =
          this.isWar.countdown.enlistment > new Date().getTime();
        if (this.isCountdown) {
          this.countdownTime =
            this.isWar.countdown.enlistment - new Date().getTime();
        } else {
          this.countdownTimeEnd =
            this.isWar.countdown.round1 - new Date().getTime();
        }
        if (!this.isWar) {
          this.router.push("/wars");
        }

        this.globalTroops = getTroops();
      } catch (e) {
        console.log(e);
      }
    },

    async loadData() {
      try {
        if (this.warMachine.isLoading) {
          return;
        }
        this.isEnlistment = await this.warMachine.activeEnlistment();
        if (!this.isEnlistment) {
          setTimeout(() => {
            this.$router.push(`/wars/${this.contractWar}/round-1`);
          }, 3000);
          return "";
        }
        this.isEnlistment = false;
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

.isLoading {
  opacity: 0;
}
.loading {
  display: none;
}

.stats {
  font-weight: bold;
  font-size: 28px;
}
.qty {
  color: #ffb800;
  font-weight: bold;
  font-size: 16px;
}

.disabled {
  opacity: 0.5;
  filter: grayscale(100%);
}

@media only screen and (max-width: 1920px) {
  .qty {
    font-size: 14px;
  }
}

@media only screen and (max-width: 600px) {
  .gradient {
    display: none;
  }
}
</style>

<template>
  <div>
    <div v-if="!isCountdown">
      <div class="bg-fed">
        <v-alert v-if="isWar.test" type="warning"
          >Danger, it's a test war</v-alert
        >
        <v-container>
          <v-row class="d-none d-sm-none d-md-flex my-3">
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

          <v-row class="d-flex d-sm-flex d-md-none">
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
        <v-row class="mt-n16">
          <v-col cols="12">
            <h2 class="text-h2 text-wGOLD text-center">Troops</h2>
          </v-col>
        </v-row>

        <v-row v-if="isConnected && !isLoading && isEnlistment">
          <v-col cols="12" lg="6" class="dividing-line">
            <v-row>
              <v-col
                cols="12"
                class="d-flex justify-center"
                v-for="trooper in teamA"
                v-bind:key="trooper.name"
              >
                <stake-trooper :trooper="trooper" :contract-war="contractWar" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6">
            <v-row>
              <v-col
                cols="12"
                class="d-flex justify-center"
                v-for="trooper in teamB"
                v-bind:key="trooper.name"
              >
                <stake-trooper :trooper="trooper" :contract-war="contractWar" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-else-if="!isLoading && !isEnlistment">
          <v-col cols="12" class="d-flex justify-center">
            <h3 class="text-h3 ma-6">Enlistment period ended</h3>
          </v-col>
        </v-row>

        <v-row v-else>
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
              <countdown :time="countdownTime" @end="loadData"></countdown>
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
import wButton from "@/lib/components/ui/Utils/wButton";
import StakeTrooper from "@/lib/components/ui/Utils/StakeTrooper";
import WarMachine from "@/lib/eth/WarMachine";
import Countdown from "@/lib/components/ui/Utils/Countdown";

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";
import Troops from "@/lib/eth/Troops";

export default {
  components: {
    wGOLDButton,
    wButton,
    StakeTrooper,
    Countdown,
  },

  data() {
    return {
      isLoading: true,
      contractWar: this.$route.params.contractWar,
      gobalTroops: [],
      isEnlistment: false,
      warMachine: {},
      isWar: { test: false },
      isCountdown: false,
      countdownTime: 0,
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
      this.$router.push("/exchange");
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.isWar = getWars().find(
        (war) => war.contractAddress[this.networkInfo.id] === this.contractWar
      );

      this.isCountdown = this.isWar.countdown.enlistment > new Date().getTime();
      if (this.isCountdown) {
        this.countdownTime =
          this.isWar.countdown.enlistment - new Date().getTime();
      }
      if (!this.isWar) {
        this.router.push("/wars");
      }

      try {
        this.warMachine = new WarMachine(this.contractWar, this.networkInfo.id);
        this.isEnlistment = await this.warMachine.activeEnlistment();

        if (!this.isEnlistment) {
          setTimeout(() => {
            this.$router.push(`/wars/${this.contractWar}/round-1`);
          }, 3000);
          return "";
        }

        let troops = getTroops();

        this.gobalTroops = await Promise.all(
          troops.map((trooper) => {
            return new Promise(async (resolve) => {
              try {
                if (trooper.contractAddress === "") {
                  resolve(trooper);
                }
                const getTropper = new Troops(
                  trooper.contractAddress[this.networkInfo.id]
                );
                trooper.myTroops = await getTropper.balanceOf(this.account);
                trooper.globalTroops = await getTropper.balanceOf(
                  this.contractWar
                );

                trooper.staked = await this.warMachine.getPlayerInfo(
                  trooper.contractAddress[this.networkInfo.id],
                  this.account
                );

                resolve(trooper);
              } catch (error) {
                console.log(error);
              }
            });
          })
        );
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

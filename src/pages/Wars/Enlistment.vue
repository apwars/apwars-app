<template>
  <div class="background">
    <v-container>
      <v-row v-if="1 == 1 || isConnected && !isLoading && isEnlistment">
        <v-col sm="12">
          <Button
            type="wtertiary"
            text="Back to war page"
            :handleClick="backToWar"
          />
          <div class="d-flex justify-space-between mt-3">
            <Title>Report</Title>
          </div>
          <div class="d-flex justify-center">
            <v-img class="swordIcon" max-width="56.57" src="/images/icons/swords.png" />
          </div>
        </v-col>

        <!-- <v-tabs
          show-arrows
          centered
          background-color="transparent"
          dark
          color="transparent"
          v-model="tab"
          class="mx-auto"
        > -->
          <v-col v-for="option in options()" :key="option.id" sm="6" md="3">
            <div class="d-flex flex-column align-center justify-center">
              <div class="option-title mb-2">{{ option.name }}</div>
              <div class="option d-flex flex-column align-center justify-center">
                <!-- :class="[isDisabled(option.name) ? 'disabled' : 'invert-image']" -->
                <img
                  :class="[invertImage(option.name) ? 'invert-image' : '']"
                  
                  :src="option.image"
                  :alt="option.name"
                />
                <div class="button-container d-flex justify-center">
                  <Button
                    class="mt-3"
                    type="wprimary"
                    :text="
                      isDisabled(option.name)
                        ? 'Coming Soon'
                        : `Enlist ${option.name} Now`
                    "
                    :disabled="isDisabled(option.name)"
                    :handleClick="() => goToEnlistment(option.id)"
                    isBlock
                  />
                </div>
              </div>
            </div>
          </v-col>
        <!-- </v-tabs> -->
      </v-row>

      <v-row v-else-if="!isLoading && !isEnlistment">
        <v-col cols="12" class="d-flex justify-center">
          <h3 class="text-h4 text-md-h3 ma-0 ma-md-6">
            Enlistment period ended
          </h3>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12" class="d-flex justify-center">
          <h3 class="text-h3">Loading...</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import Title from "@/lib/components/ui/Title";
import Button from "@/lib/components/ui/Buttons/Button";
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Countdown from "@/lib/components/ui/Utils/Countdown";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";
import { ENLISTMENT_OPTIONS } from "@/data/Races";

import WarMachine from "@/lib/eth/WarMachine";

export default {
  name: 'Enlistment',
  components: {
    Title,
    Button,
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
      tab: 0,
    };
  },

  mounted() {
    if (!this.isConnected) {
      return;
    }
    this.setHeader(false);
    this.initData();
    this.loadData();
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

  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },

  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
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
            //this.$router.push(`/wars/${this.contractWar}/round-1`);
          }, 3000);
          return "";
        }
        // this.isEnlistment = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    isDisabled(name) {
      const enabled = ['Humans'];

      return !enabled.includes(name);
    },

    invertImage(name) {

      return name === 'Orcs' || name === 'Undeads';
    },

    backToWar() {
      this.$router.push({
        path: `/wars/${this.$route.params.contractWar}`,
      });
    },
    
    goToEnlistment(raceId) {
      this.$router.push({
        path: `/wars/${this.$route.params.contractWar}/enlistment/${raceId}`,
      });
    },

    options() {
      const races = ENLISTMENT_OPTIONS
      const invertedRaces = []

      invertedRaces.push(races[3], races[0], races[1], races[2])
      return invertedRaces
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: url("/images/background/enlistment.png");
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
  filter: grayscale(100%);
}

.enlistment-options {
  width: 100%;
}

.option-title {
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: #ffffff;
}

.button-container {
  width: 80%;
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

.invert-image {
  transform: scaleX(-1);
}

.swordIcon {
  position: relative;
  top: 17rem;
}
</style>

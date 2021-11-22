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

        <v-col v-for="option in options()" :key="option.id" sm="6" md="3">
          <div class="d-flex flex-column align-center justify-center">
            <div class="option-title mb-2">{{ option.name }}</div>
            <div class="option d-flex flex-column align-center justify-center">
              <v-hover v-slot="{ hover }">
                <div
                  class="raceImage"
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <div :class="[isDisabled(option.name) ? 'disabled' : '']">
                    <img
                    :class="[invertImage(option.name) ? 'invert-image' : '']"
                    :src="option.image"
                    :alt="option.name"
                      @click="selectRace(option.name)"
                  />
                  </div>
                </div>
              </v-hover>
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

        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="8">
              <v-row>
                <v-col
                  v-for="unit in listTroops()"
                  :key="unit.name"
                  cols="12"
                  sm="6"
                  md="6"
                  class="d-flex px-0">
                  <div class="text-center">
                    <v-img width="180" :src="unit.img" :lazy-src="unit.imgLazy">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular
                            indeterminate
                            color="#ffeebc lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <span class="unit-name">{{ unit.ticker }}</span>
                  </div>

                  <div class="ml-1">
                    <span class="text-h6 d-block" style="color: #FFB800;">Report</span>
                    <span class="d-block mt-1">Units enlisted: 105k</span>
                    <span class="d-block">Deads units: 80k</span>
                    <span class="d-block mb-2">Survivors: 25k</span>
                    <span class="d-block" style="color: #FFB800;">Global Dead Units: 80k</span>
                    <span class="d-block" style="color: #FFB800;">Global Survivors: 25k</span>
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col v-for="weapon in weapons" :key="weapon.name" cols="6" md="3" class="px-0">
                  <div class="d-flex">
                    <img width="70" height="70" :src="`/images/weapons/${weapon.icon}.png`"/>
                    <div>
                      <span class="d-block">{{ weapon.title }}</span>
                      <span class="d-block">Global: 1,5M</span>
                      <span class="d-block">My troops: 10,4K</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              class="monster-position pa-0"
              cols="12"
              md="4"
              style="position: relative;">
              <img
                width="370"
                :src="require('../../../public/images/troops/units/humans/monster.png')"
              />
              <div class="treasure-progress mb-3">
                <Progress class="progress" :value="4" :maxScale="10" />
                <div class="treasure">
                  <img src="/images/battle/treasure.png" />
                </div>
              </div>
              <v-btn
                color="#3A2720"
                tile
                style="padding: 22px; border: 2px solid #FFEEBC;">
                <span class="text-h5">Go to Monster Battle</span>
              </v-btn>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col xs="12" sm="10" md="6" class="px-0">
              <v-btn
                block
                color="#3A2720"
                tile
                class="d-flex"
                style="padding: 30px 0px; border: 2px solid #FFEEBC;">
                <v-img :max-width="$vuetify.breakpoint.xs ? '36' : '48.74'" src="/images/icons/swords.png" />
                <span
                  class="ml-2"
                  :class="$vuetify.breakpoint.xs ? 'text-h6' : 'text-h5'"
                >
                    Bring survivors and claim prizes
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col class="pa-0">
          <v-row>
            <v-col>
              <h1 class="text-center">Players</h1>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <table-war-report
                v-if="isWar.reportVersion === '1'"
                :war="isWar"
              ></table-war-report>
              <table-war-report-v2
                v-if="isWar.reportVersion === '2'"
                :war="isWar"
              ></table-war-report-v2>
            </v-col>
          </v-row>
        </v-col>
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
import TableWarReport from "@/lib/components/ui/Utils/Tables/TableWarReport"
import TableWarReportV2 from "@/lib/components/ui/Utils/Tables/TableWarReportV2";
import Progress from "@/lib/components/ui/Progress";

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";
import { ENLISTMENT_OPTIONS } from "@/data/Races";
import { getUnitsEnlistment } from '@/data/UnitsEnlistment'
import { getWeapons } from '@/data/Collectibles/Weapons'

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
    TableWarReport,
    TableWarReportV2,
    Progress,
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
      troops: [],
      weapons: [],
    };
  },

  mounted() {
    if (!this.isConnected) {
      return;
    }
    this.setHeader(false);
    this.initData();
    this.loadData();
    this.listTroops();
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

    async initData() {
      try {
        this.warMachine = new WarMachine(this.contractWar, this.networkInfo.id);

        this.isWar = await getWars(this.networkInfo.id !== "56").find(
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
      const troops = await getUnitsEnlistment()
      this.troops = troops

      const weapons = await getWeapons()
      this.weapons = weapons

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

      invertedRaces.push(races[3], races[0], races[1], races[2]);
      return invertedRaces
    },

    selectRace(raceName) {
      if (raceName === 'Elves') this.listTroops(1);
      else if (raceName === 'Humans') this.listTroops(0);
      else if (raceName === 'Orcs') this.listTroops(2);
      else if (raceName === "Undeads") this.listTroops(3);
    },

    listTroops(racePosition) {
      if (racePosition === undefined) {
        return this.troops[0]
      } else {
        return this.troops[racePosition]
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.background {
  height: 40%;
  width: 100%;
  background-image: url("/images/bg-home.jpg");
  background-size: cover;
  background-position: center;
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

.raceImage{
  transition: opacity .4s ease-in-out;
}

.raceImage:not(.on-hover) {
  opacity: 0.6;
}

.unit-name {
  font-size: 13px;
  font-weight: 700;
}

.monster-position {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.treasure-progress {
  position: relative;
  bottom: 0;
  width: 80%;
  height: 32px;
}

.progress {
  z-index: 2;
  width: 100%;
}

.treasure {
  position: absolute;
  right: -40px;
  bottom: -34px;
  z-index: 3;
  @media screen and (max-width: 500px) {
    right: -26px;
  }
  > img {
      width: 90px
  }
  @media screen and (min-width: 1441px) {
     > img {
      width: 150px
  } 
  }
}
</style>

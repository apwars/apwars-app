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
              <!-- :class="[isDisabled(option.name) ? 'disabled' : 'invert-image']" -->
              <v-hover v-slot="{ hover }">
                <div
                  class="raceImage"
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <img
                    :class="[invertImage(option.name) ? 'invert-image' : '']"
                    :src="option.image"
                    :alt="option.name"
                      @click="selectRace(option.name)"
                  />
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
                    <v-img width="55" :src="`/images/weapons/${weapon.icon}.png`"/>
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
              md="4">
              <img
                width="370"
                :src="require('../../../public/images/troops/units/humans/monster.png')"
              />
              <v-btn
                color="#3A2720"
                tile
                style="padding: 22px; border: 2px solid #FFEEBC;">
                <span class="text-h5">Go to Monster Battle</span>
              </v-btn>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col cols="8" sm="6" md="5" class="px-0">
              <v-btn
                block
                color="#3A2720"
                tile
                class="d-flex"
                style="padding: 30px 0px; border: 2px solid #FFEEBC;">
                <v-img max-width="48.74" src="/images/icons/swords.png" />
                <span class="text-h5 ml-2">Bring survivors and claim prizes</span>
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
        console.log(this.troops[racePosition])
        return this.troops[racePosition]
      };
    }
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
  /* position: relative;
  top: 5rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<template>
  <div class="color-bg">
    <div class="background">
      <v-container v-if="1 == 1 || (isConnected && !isLoading && isEnlistment)">
        <v-row dense no-gutters>
          <v-col>
            <Button
              icon="arrow-back"
              type="wtertiary"
              text="Back to war page"
              :handleClick="backToWar"
              noPadding
            />
          </v-col>
        </v-row>
        <v-row dense no-gutters>
          <v-col>
            <Title text="WAR IV" subtitle="Report" />
          </v-col>
        </v-row>

        <div ref="raceSelect" class="race-select">
          <div
            class="race-container"
            :class="[selectedRace === 1 ? 'is-selected' : '']"
          >
            <h2 class="text-center mb-1">
              Humans
            </h2>
            <v-img
              class="race-image"
              src="/images/troops/wwizard-portrait.png"
              alt="Humans"
              @click="selectedRace = 1"
            >
            </v-img>
          </div>

          <div
            class="race-container"
            :class="[selectedRace === 4 ? 'is-selected' : '']"
          >
            <h2 class="text-center mb-1">
              Elves
            </h2>
            <v-img
              class="race-image"
              src="/images/troops/wferal-spirit-portrait.png"
              alt="Elves"
              @click="selectedRace = 4"
            >
            </v-img>
          </div>

          <img width="46" src="/images/icons/swords.png" />

          <div
            class="race-container "
            :class="[selectedRace === 2 ? 'is-selected' : '']"
          >
            <h2 class="text-center mb-1">
              Orcs
            </h2>
            <v-img
              class="race-image invert-image"
              src="/images/troops/wshaman-portrait.png"
              alt="Orcs"
              @click="selectedRace = 2"
            >
            </v-img>
          </div>

          <div
            ref="raceSelect"
            class="race-container"
            :class="[selectedRace === 3 ? 'is-selected' : '']"
          >
            <h2 class="text-center mb-1">
              Undead
            </h2>
            <v-img
              class="race-image invert-image"
              src="/images/troops/wwitch-portrait.png"
              alt="Undead"
              @click="selectedRace = 3"
            >
            </v-img>
          </div>
        </div>

        <v-row>
          <v-col cols="12" md="8">
            <v-row>
              <v-col
                v-for="unit in troopList"
                :key="unit.name"
                cols="12"
                sm="6"
                md="6"
                class="d-flex px-0"
              >
                <div class="image-container">
                  <img :src="`/images/troops/${unit.name.toLowerCase()}-portrait.png`" :alt="unit.name" />
                </div>

                <div class="ml-1">
                  <span
                    class="d-block unit-name"
                    >{{ unit.displayName }}</span
                  >
                  <span class="d-block mt-1">Enlisted units: 105k</span>
                  <span class="d-block">Deads units: 80k</span>
                  <span class="d-block mb-2">Survivors: 25k</span>
                  <span class="d-block" style="color: #FFB800;"
                    >Global Dead Units: 80k</span
                  >
                  <span class="d-block" style="color: #FFB800;"
                    >Global Survivors: 25k</span
                  >
                </div>
              </v-col>
            </v-row>

            <v-row class="pl-3">
              <v-col
                v-for="weapon in weapons"
                :key="weapon.name"
                cols="6"
                md="3"
                class="px-0"
              >
                <div class="d-flex">
                  <img
                    :width="$vuetify.breakpoint.xs ? '50' : '60'"
                    :height="$vuetify.breakpoint.xs ? '50' : '60'"
                    :src="`/images/weapons/${weapon.icon}.png`"
                  />
                  <div style="font-size: 14px">
                    <span class="d-block bold">{{ weapon.title }}</span>
                    <span class="d-block">Global: 1,5M</span>
                    <span class="d-block">My Qty: 10,4K</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="d-flex flex-column align-center"
            cols="12"
            md="4"
          >
            <div class="monster-viewport">
            <v-img
              :src="`/images/monsters/${monsterData.id}.webp`"
              :lazy-src="`/images/monsters/${monsterData.id}.webp`"
              :alt="monsterData.name"
              :class="[monsterData.id === 4 ? 'invert-image' : '']"
            />
            </div>
            <div class="monster-name text-center mb-2">
                {{ monsterData.name }}
            </div>
            <div class="treasure-progress mb-3">
              <Progress class="progress" :value="4" :maxScale="10" />
              <div class="treasure">
                <v-img src="/images/battle/treasure.png" />
              </div>
            </div>
            <Button type="wprimary" text="Go to the Monster Battle" :handleClick="goToMonsterBattle" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-row>
              <v-col class="d-flex justify-center">
                <Button
                  type="wprimary"
                  icon="swords"
                  text="Claim prizes and restore survivors"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="rewards-title">Rewarded spots</div>
            <div class="rewards-container mt-2">
              <div class="spot-info">
              <div class="unit-name">0,5</div>
              <Reward :rewardId="39" :amount="25" />
              <Reward :rewardId="49" :amount="1000" />
              </div>
            </div>
            <div class="rewards-container mt-2">
              <div class="spot-info">
              <div class="unit-name">3,8</div>
              <Reward :rewardId="39" :amount="12" />
              <Reward :rewardId="49" :amount="500" />
              </div>
            </div>
            <div class="rewards-container mt-2">
              <div class="spot-info">
              <div class="unit-name">4,16</div>
              <Reward :rewardId="36" :amount="8" />
              <Reward :rewardId="50" :amount="755" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

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
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import Title from "@/lib/components/ui/Title";
import Button from "@/lib/components/ui/Buttons/Button";
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Countdown from "@/lib/components/ui/Utils/Countdown";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";
import TableWarReport from "@/lib/components/ui/Utils/Tables/TableWarReport";
import TableWarReportV2 from "@/lib/components/ui/Utils/Tables/TableWarReportV2";
import Progress from "@/lib/components/ui/Progress";
import Reward from "@/lib/components/ui/Reward";

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";
import { ENLISTMENT_OPTIONS } from "@/data/Races";
import { MONSTERS } from "@/data/Monsters";
import { getWeapons } from "@/data/Collectibles/Weapons";

import WarMachine from "@/lib/eth/WarMachine";

export default {
  name: "Enlistment",
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
    Reward
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
      weapons: [],
      monsterToView: [{ id: "" }, { name: "" }],
      selectedRace: 1,
    };
  },

  created() {
    this.setHeader(false);
  },

  mounted() {
    if (!this.isConnected) {
      return;
    }
    this.$refs.raceSelect.scrollLeft = (this.$refs.raceSelect.scrollWidth/2) - 125;
    this.initData();
    this.loadData();
  },

  computed: {
    ...mapGetters({
      getAllFromRace: "enlistment/byRace",
    }),
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
    troopList() {
      return this.getAllFromRace(this.selectedRace);
    },
    enlistmentOptions() {
      return ENLISTMENT_OPTIONS.find(
        (eo) => eo.id === Number(this.selectedRace)
      );
    },
    monsterData() {
      if (!this.enlistmentOptions) {
        return null;
      }
      return MONSTERS.find((m) => m.id === this.enlistmentOptions.monsterId);
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
      try {
        const weapons = await getWeapons();
        this.weapons = weapons;

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

    goToMonsterBattle() {
      this.$router.push({
        path: `/wars/${this.$route.params.contractWar}/enlistment/${this.selectedRace}/battle`,
      });
    },

    isEnabled(name) {
      this.selectedRace = name;
    },
  },
};
</script>

<style lang="scss" scoped>
.color-bg {
  height: 100%;
  width: 100%;
  background-color: #000000;
}
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

.race-image {
  cursor: pointer;
}

.race-container {
  filter: grayscale(70%);
  transition: transform 0.3s;
  transition: opacity 0.4s ease-in-out;
  opacity: 0.6;
  &:hover,&.is-selected {
    filter: grayscale(0%);
    opacity: 1;
  }
  &.is-selected {
    color: #ffb800;
  }
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
  bottom: -25px;
  z-index: 3;
  @media screen and (max-width: 500px) {
    right: -26px;
  }
  > img {
    width: 70px;
  }
  @media screen and (min-width: 1441px) {
    > img {
      width: 130px;
    }
  }
}

.text-button {
  text-transform: none !important;
  @media screen and (max-width: 345px) {
    font-size: 13px !important;
  }
}

.race-select {
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  .race-container {
    display: inline-block;
  }
}
.monster-viewport {
  width: 90%;
}
.monster-name {
  font-weight: bold;
  font-size: 24px;
  line-height: 1.2;
}
.image-container {
  height: 190px;
  width: 180px;
  > img {
    width: 100%;
    height: 100%;
  }
}
.unit-name {
  color: #FFB800;
  font-size: 18px;
  font-weight: bold;
}
.rewards-title {
  font-size: 32px;
  font-weight: bold;
}
.bold {
  font-weight: bold;
  font-size: 16px;
}
</style>

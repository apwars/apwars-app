<template>
  <div class="background">
    <v-container class="main" v-if="account">
      <v-row dense no-gutters>
        <v-col>
          <Button
            icon="arrow-back"
            type="wtertiary"
            text="Back to enlistment page"
            :handleClick="backToEnlistment"
            noPadding
          />
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col>
          <div class="name-container d-flex justify-start">
            <Title :text="war ? war.name : 'WAR'" subtitle="Monster Battle" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" offset-sm="1" sm="8">
          <v-row
            class="board-viewport d-flex justify-center justify-sm-end  align-sm-end"
          >
            <v-col>
              <div class="monster-name">
                <span v-if="isEnlistedWithAnotherRace">
                  {{ raceName }} Strategic Board
                </span>
                <span v-else-if="userEnlistedRace">
                  Your slot is indicated with yellow arrow
                </span>
                <span v-else>
                  Choose your slot to enlist the troops
                </span>
              </div>
              <Board
                :board="board"
                :rows="5"
                :cols="20"
                rotate="40deg"
                :unitImage="
                  `/images/troops/${troopList[0].name.toLowerCase()}.webp`
                "
                @selectedSlot="handleSlotSelection"
                :currentUserAddress="account.toLowerCase()"
              />
              <div class="small-text">
                Remaining slots {{ totalAvailable }}/{{ totalSlots }}
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="d-flex justify-center">
              <Button
                v-if="!userEnlistedRace || phase === 'not-started'"
                type="wprimary"
                :handleClick="handleEnlistment"
                :disabled="
                  !formation ||
                    isLoadingEnlistment ||
                    phase === 'not-started' ||
                    !selectedSlot
                "
              >
                Enlist
                <v-progress-circular
                  class="ml-1"
                  indeterminate
                  size="16"
                  width="2"
                  v-if="isLoadingEnlistment"
                />
              </Button>
              <Button
                v-else
                type="wsecondary"
                text="Go to full report"
                :handleClick="goToReport"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="slot-info-container">
                <template v-if="selectedSlot">
                  <div class="monster-name">
                    <span v-if="slotData">
                      Enlistment at Slot {{ selectedSlot.y }},
                      {{ selectedSlot.x }}
                      <div class="troop-status mr-2">
                        <div class="status-icon">
                          <img
                            src="/images/icons/attack.png"
                            alt="Attack points"
                          />
                        </div>
                        <div class="force-text">
                          <Amount
                            :amount="slotData.power.strength"
                            compact
                            formatted
                          />
                        </div>
                      </div>
                      <div class="troop-status mr-2">
                        <div class="status-icon">
                          <img
                            src="/images/icons/defense.png"
                            alt="Attack points"
                          />
                        </div>
                        <div class="force-text">
                          <Amount
                            :amount="slotData.power.defense"
                            compact
                            formatted
                          />
                        </div>
                      </div>
                    </span>
                    <span v-else>Free Slot</span>
                  </div>
                  <div class="info-text mt-1" v-if="slotData">
                    Address: {{ slotData.account }}
                    <span v-if="isOwner" class="text-yellow">(YOU)</span>
                  </div>
                  <div class="info-text mt-1" v-else>
                    This slot is available!
                  </div>
                </template>
                <div
                  v-else-if="!isEnlistedWithAnotherRace && formation"
                  class="monster-name"
                >
                  Your current troops and equipments
                </div>

                <div v-else-if="!isEnlisted && !formation && !isWarOver" class="monster-name">
                  Go to enlistment screen to select a formation
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="enlistment-resume" v-if="troopList.length">
            <v-col
              cols="12"
              sm="6"
              lg="4"
              class="troop-container d-flex justify-start align-center"
              v-for="unit in troopList"
              :key="unit.id"
            >
              <img
                :src="`/images/troops/${unit.name.toLowerCase()}.webp`"
                width="64"
                class="mr-1"
              />
              <div class="troop-info">
                <div class="info-text mb-1">
                  {{ unit.displayName }}
                </div>
                <template>
                  <div class="info-text">
                    <span v-if="isOwner || !slotData">My </span> Units
                    <Amount
                      :amount="getUnitAmount(unit.name)"
                      compact
                      formatted
                    />
                  </div>
                </template>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-3">
            <v-col
              v-for="weapon in weapons"
              :key="weapon.id"
              cols="12"
              sm="6"
              lg="3"
              class="d-flex justify-start align-center mt-2"
            >
              <img
                :src="`/images/icons/${weapon.icon}.png`"
                width="52"
                class="mr-1"
              />
              <div class="troop-info">
                <div class="info-text mb-1">
                  {{ weapon.title }}
                </div>
                <template>
                  <div class="info-text">
                    <span v-if="isOwner || !slotData">My </span> Qty:
                    <Amount
                      :amount="getGameItemAmount(weapon.id)"
                      compact
                      formatted
                    />
                  </div>
                </template>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col cols="12" class="d-flex justify-start align-center mt-2">
              <div class="d-flex" v-if="slotData">
                <span>Total force: {{ slotData.power.total }} Power Units</span>
                <span class="ml-2"
                  >Race share:
                  {{ getPercentage(slotData.percentagePowerRace) }}%</span
                >
                <span class="ml-2"
                  >Faction share:
                  {{
                    getPercentage(slotData.percentagePowerFaction)
                  }}%</span
                >  
              </div>
            </v-col>
          </v-row>
          <v-row v-if="slotData && slotData.rewards.length > 0">
            <v-col cols="12">
              <div class="monster-name mb-2">
                This slot was rewarded with:
              </div>
              <div class="rewards-container">
                <Reward
                  class="reward-container"
                  v-for="reward in slotData.rewards"
                  :key="reward.prize"
                  :prize="reward.prize"
                  :type="reward.type"
                  :amount="reward.amount"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="3">
          <div class="monster-container">
            <v-img
              :src="`/images/monsters/${monsterData.id}.webp`"
              :alt="monsterData.name"
              :class="[monsterData.id === 4 ? 'invert' : '']"
            />
            <div class="monster-name text-center mb-2">
              {{ monsterData.name }}
            </div>
            <div class="d-flex align-items-center justify-center">
              <div class="reward-description text-center pr-2">
                Monster Prize Pool
              </div>
              <div class="treasure-progress">
                <div class="text">
                  <Amount :amount="monsterPrizeValue" compact formatted />
                </div>
                <div class="treasure">
                  <v-img src="/images/battle/treasure.png" />
                </div>
              </div>
            </div>
            <div
              class="text-small text-yellow"
              v-if="playerEnlistment && !isEnlistedWithAnotherRace"
            >
              Your <span v-if="!isWarOver">Current</span> prize ~<Amount
                :amount="playerCurrentMonsterPrize"
                symbol="wGOLD"
                formatted
                compact
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";

import { RACE_DESCRIPTION } from "@/data/Races";
import { ENLISTMENT_OPTIONS } from "@/data/Enlistment";
import { MONSTERS } from "@/data/Monsters";
import { TIER_WEAPONS } from "@/data/Collectibles/Weapons";

import Title from "@/lib/components/ui/Title";
import Button from "@/lib/components/ui/Buttons/Button";
import Progress from "@/lib/components/ui/Progress";
import Board from "@/lib/components/ui/War/Board";
import Reward from "@/lib/components/ui/Reward";
import Amount from "@/lib/components/ui/Utils/Amount";
import ToastSnackbar from "@/plugins/ToastSnackbar";

export default {
  components: { Title, Button, Progress, Board, Reward, Amount },
  data() {
    return {
      selectedSlot: null,
      isLoadingEnlistment: false,
      slotData: null,
    };
  },
  computed: {
    ...mapState({
      war: (state) => state.war.war,
      weapons: (state) => state.enlistment.weapons,
      formation: (state) => state.enlistment.formation,
      phase: (state) => state.war.phase,
      isPlaying: (state) => state.isPlaying,
    }),
    ...mapGetters({
      getAllFromRace: "enlistment/byRace",
      getBoardByRace: "war/getBoardByRace",
      getRaceData: "war/getRaceData",
      userEnlistedRace: "war/userEnlistedRace",
      getRaceEnlisted: "war/getRaceEnlisted",
      totalStakedWeapon: "enlistment/totalStakedWeapon",
      playerEnlistment: "war/playerEnlistment",
      playerCurrentMonsterPrize: "war/playerCurrentMonsterPrize",
      isWarOver: "war/isWarOver",
      getRaceMonsterPrizeValue: "war/getRaceMonsterPrizeValue",
    }),
    account() {
      return this.$store.getters["user/account"];
    },
    enlistmentOptions() {
      return ENLISTMENT_OPTIONS.find(
        (eo) => eo.id === Number(this.$route.params.raceId)
      );
    },
    monsterData() {
      if (!this.enlistmentOptions) {
        return null;
      }
      return MONSTERS.find((m) => m.id === this.enlistmentOptions.monsterId);
    },
    troopList() {
      return this.getAllFromRace(this.$route.params.raceId);
    },
    board() {
      return this.getBoardByRace(Number(this.$route.params.raceId));
    },
    raceData() {
      return this.getRaceData(Number(this.$route.params.raceId));
    },
    percentageRewardConquered() {
      return this.raceData?.data?.percentageRewardConquered || 0;
    },
    totalAvailable() {
      return this.raceData?.data?.totalAvailable || 0;
    },
    totalEnlistment() {
      return this.raceData?.data?.totalEnlistment || 0;
    },
    totalSlots() {
      return this.raceData?.data?.totalSlots || 0;
    },
    isOwner() {
      return (
        this.account && this.account.toLowerCase() === this.slotData?.account
      );
    },
    raceName() {
      return RACE_DESCRIPTION[Number(this.$route.params.raceId)];
    },
    isEnlisted() {
      return this.getRaceEnlisted;
    },
    isEnlistedWithAnotherRace() {
      return (
        this.getRaceEnlisted &&
        this.getRaceEnlisted !==
          RACE_DESCRIPTION[Number(this.$route.params.raceId)]
      );
    },
    monsterPrizeValue() {
      return this.getRaceMonsterPrizeValue(
        RACE_DESCRIPTION[Number(this.$route.params.raceId)]
      );
    },
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    ...mapActions({
      enlist: "enlistment/enlist",
      getWar: "war/getWar",
      startMusic: "music/startMusic",
      stopMusic: "music/stopMusic",
    }),
    backToEnlistment() {
      this.$router.push(
        `/wars/${this.$route.params.contractWar}/enlistment/${this.$route.params.raceId}`
      );
    },
    async handleSlotSelection(key) {
      const [y, x] = key.split("-");
      this.selectedSlot = { x, y };
      const slotData =
        this.board[y].find(
          (e) => e && e.slot.x === Number(x) && e.slot.y === Number(y)
        ) || null;
      this.slotData = slotData;
    },
    async handleEnlistment() {
      try {
        this.isLoadingEnlistment = true;
        const faction =
          Number(this.$route.params.raceId) === 1 ||
          Number(this.$route.params.raceId) === 4
            ? "The Corporation"
            : "The Degenerate";
        const raceName = RACE_DESCRIPTION[Number(this.$route.params.raceId)];
        const warId = this.$route.params.contractWar;
        await this.enlist({
          warId: this.$route.params.contractWar,
          faction,
          race: raceName,
          slot: this.selectedSlot,
        });
        await this.getWar(warId);
        this.handleSlotSelection(
          `${this.selectedSlot.y}-${this.selectedSlot.x}`
        );
        ToastSnackbar.success("Successfully enlisted at war!");
      } catch (error) {
        let msg =
          error.message ||
          "Something went wrong while trying to enlist, try again later.";
        if (error.code === 4001) {
          msg = "Player denied the signature";
        }
        ToastSnackbar.error(msg);
        console.error(error);
      } finally {
        this.isLoadingEnlistment = false;
      }
    },
    goToReport() {
      this.$router.push(`/wars/${this.$route.params.contractWar}/report`);
    },
    getUnitAmount(troopName) {
      if (!this.slotData) {
        return this.troopList.find((t) => t.name === troopName).amount;
      } else if (this.slotData) {
        return this.slotData.formation.soldiers[troopName].amount;
      } else {
        return 0;
      }
    },
    getGameItemAmount(gameItemId) {
      if (!this.slotData) {
        const weaponTier = Number(
          Object.keys(TIER_WEAPONS).find((k) => TIER_WEAPONS[k] === gameItemId)
        );
        return this.totalStakedWeapon(weaponTier);
      } else {
        return (
          this.slotData?.gameItems?.find((g) => g.id === gameItemId)?.amount ||
          0
        );
      }
    },
    async fetchData() {
      if (this.account && !this.war && !this.isLoadingWar) {
        await this.getWar(this.$route.params.contractWar);
      }
    },
    getPercentage(value) {
      return Math.floor(value * 100);
    }
  },
  watch: {
    account() {
      this.fetchData();
      if (!this.isPlaying) {
        this.startMusic({ musicKey: "WAR", isLoop: true });
      }
    },
    playerEnlistment(value) {
      this.handleSlotSelection(
        `${this.playerEnlistment.slot.y}-${this.playerEnlistment.slot.x}`
      );
    },
  },
  async mounted() {
    this.setHeader(false);
    this.fetchData();
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    if (!to.path.includes("/wars")) {
      this.stopMusic();
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100vw;
  background-size: cover;
  background-position: fixed;
  background-image: url("/images/background/battle-zoomed.png");
}
.main {
  @media screen and (min-width: 768px) {
    height: 100%;
  }
}
.board-viewport {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  flex: 1;
}

.monster-container {
  width: 100%;
  position: relative;
  @media screen and (min-width: 1024px) {
    margin-top: -160px;
  }
}

.progress {
  z-index: 2;
  width: 100%;
}
.treasure-info {
  position: absolute;
  bottom: 0px;
  left: 50%;
  padding: 8px 4px;
  transform: translateX(-50%);
  background-color: #3a2720;
  border: 1px solid #ffeebc;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 12px;
  line-height: 1.2;
}
.info-text {
  font-weight: bold;
  font-size: 14px;
  line-height: 1.3;
  white-space: nowrap;
}
.small-text {
  @extend .info-text;
  font-size: 12px;
}
.enlistment-resume {
  width: 100%;
}
.invert {
  transform: scaleX(-1);
}
.monster-name {
  font-weight: bold;
  font-size: 24px;
  line-height: 1.2;
}
.treasure-progress {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > .text {
    z-index: 1;
    font-weight: bold;
    font-size: 24px;
    text-shadow: 1px 1px 2px #000;
  }
  > .treasure {
    position: absolute;
    z-index: 0;
    top: -21px;
    width: 48px;
  }
}
.rewards-container {
  display: flex;
  padding-top: 8px;
}
.text-yellow {
  color: #ffb800;
}
.slot-info-container {
  min-height: 56px;
}
.troop-status {
  display: inline-flex;
  align-items: center;
  .status-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 21px;
    width: 21px;
    margin-right: 4px;
    background-image: url("/images/icons/slot.png");
    background-size: contain;
    > img {
      height: 60%;
    }
  }
  .force-text {
    font-size: 12px;
  }
}
.text-small {
  font-size: 12px;
  text-align: center;
}
</style>

<template>
  <div class="background">
    <v-container class="main" v-if="isConnected">
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
            <Title text="WAR IV" subtitle="Monster Battle" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" offset-sm="1" sm="8">
          <v-row
            class="board-viewport d-flex justify-center justify-sm-end  align-sm-end"
          >
            <v-col>
              <div class="monster-name mt-6">
                Choose your slot to enlist the troops
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
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <template v-if="selectedSlot">
              <div class="monster-name" >
                Enlistment at Slot {{ selectedSlot.y }},
                {{ selectedSlot.x }}
              </div>
              <div class="info-text mt-1" v-if="slotData">Address: {{ slotData.account }} <span v-if="isOwner" class="text-yellow">(YOU)</span></div>
              <div class="info-text mt-1" v-else>This slot is available!</div>
              </template>
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
                <v-skeleton-loader
                  v-if="isLoadingEnlistment"
                  width="100%"
                  type="text, text"
                />
                <template v-else>
                  <div class="info-text">
                    <span v-if="isOwner">My </span> Units <Amount :amount="getUnitAmount(unit.name)" compact formatted/>
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
                <v-skeleton-loader
                  v-if="isLoadingEnlistment"
                  width="100%"
                  type="text, text"
                />
                <template v-else>
                  <div class="info-text">
                    <span v-if="isOwner">My </span> Qty: <Amount :amount="getGameItemAmount(weapon.id)" compact formatted/>
                  </div>
                </template>
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
                  :key="reward.id"
                  :rewardId="reward.id"
                  :amount="reward.amount"
                />
              </div>
            </v-col>
          </v-row>
          <v-row
            ><v-col>
              <Button
                type="wsecondary"
                text="Go to full report"
                :handleClick="goToReport"/></v-col
          ></v-row>
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
            <div class="treasure-progress">
              <Progress class="progress" :value="percentageRewardConquered" :maxScale="100" />
              <div class="treasure">
                <v-img src="/images/battle/treasure.png" />
              </div>
            </div>
            <div class="reward-description mt-1 text-center">
              Total reward conquered
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="4">
          <div class="d-flex flex-column justify-center align-center">
            <Progress class="progress" :value="totalEnlistment" :maxScale="totalSlots" noText />
            <div class="info-text mt-1">Remaining slots {{ totalAvailable}}/{{ totalSlots }}</div>
          </div>
        </v-col>
        <v-col offset-sm="4" sm="4">
          <Button type="wprimary" text="Enlist" isBlock :handleClick="handleEnlistment" :disabled="!formation" />
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
      weapons: (state) => state.enlistment.weapons,
      formation: (state) => state.enlistment.formation.value,
    }),
    ...mapGetters({
      getAllFromRace: "enlistment/byRace",
      getBoardByRace: "war/getBoardByRace",
      getRaceData: "war/getRaceData"
    }),
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
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
      return this.account && this.account.toLowerCase() === this.slotData?.account;
    }
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    ...mapActions({
      enlist: "enlistment/enlist",
      getWar: "war/getWar",
    }),
    backToEnlistment() {
      this.$router.push(
        `/wars/${this.$route.params.contractWar}/enlistment/${this.$route.params.raceId}`
      );
    },
    async handleSlotSelection(key) {
      const [y, x] = key.split("-");
      this.selectedSlot = { x, y };
      const slotData = this.board[y].find(e => e && (e.slot.x === Number(x) && e.slot.y === Number(y)));
      this.slotData = slotData;
    },
    async handleEnlistment() {
      try {
        const faction = (Number(this.$route.params.raceId) === 1 || Number(this.$route.params.raceId) === 4 ) ? "The Corporation" : "The Degenerate";
        const raceName = RACE_DESCRIPTION[this.$route.params.raceId];
        const warId = this.$route.params.contractWar;
        await this.enlist({ warId: this.$route.params.contractWar, faction, race: raceName, slot: this.selectedSlot});
        await this.getWar(warId);
        ToastSnackbar.success("Successfully enlisted at war!");
      } catch (error) {
        ToastSnackbar.error(error.code);
        console.error(error)
      }
    },
    goToReport() {
      this.$router.push(`/wars/${this.$route.params.contractWar}/report`);
    },
    getUnitAmount(troopName) {
      if (!this.slotData) {
        return 0;
      } else {
        return this.slotData.formation.soldiers[troopName].amount;
      }
    },
    getGameItemAmount(gameItemId) {
      if (!this.slotData) {
        return 0;
      } else {
        return this.slotData?.gameItems?.find(g => g.id === gameItemId)?.amount || 0;
      }
    }
  },
  watch: {
    isConnected() {
      const warId = this.$route.params.contractWar;
      this.getWar(warId);
    },
    account() {
      const warId = this.$route.params.contractWar;
      this.getWar(warId);
    }
  },
  async mounted() {
    this.setHeader(false);
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
};
</script>
<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background-size: cover;
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
}

.progress {
  z-index: 2;
  width: 100%;
}

.treasure {
  position: absolute;
  display: inline-block;
  top: -21px;
  right: -18px;
  z-index: 3;
  width: 48px;
  @media screen and (min-width: 1441px) {
    width: 64px;
  }
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
}
.rewards-container {
  display: flex;
}
.text-yellow {
  color: yellow;
}
</style>

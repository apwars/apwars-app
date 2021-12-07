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
                :rows="5"
                :cols="20"
                rotate="40deg"
                :unitImage="
                  `/images/troops/${troopList[0].name.toLowerCase()}.webp`
                "
                @selectedSlot="handleSlotSelection"
                currentUserAddress="3-3"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="monster-name" v-if="selectedSlot">
                Enlistment at Spot {{ selectedSlot.row }},
                {{ selectedSlot.col }}
              </div>
              <div class="info-text mt-1">Address: 0xe2ac249f15d838d517Da1641C09608b9E6E0eE38</div>
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
                    My Units: 10.4K
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
                  <div class="info-text d-flex align-items-end">
                    My Qty: 10.4K
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
              <Progress class="progress" :value="4" :maxScale="10" />
              <div class="treasure">
                <v-img src="/images/battle/treasure.png" />
              </div>
            </div>
            <div class="reward-description mt-1">
              Total reward conquered
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="4">
          <div class="d-flex flex-column justify-center align-center">
            <Progress class="progress" :value="54" :maxScale="100" noText />
            <div class="info-text mt-1">Remaining slots 54/100</div>
          </div>
        </v-col>
        <v-col offset-sm="4" sm="4">
          <Button type="wprimary" text="Enlist" isBlock />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from "vuex";

import { ENLISTMENT_OPTIONS } from "@/data/Enlistment";
import { MONSTERS } from "@/data/Monsters";

import Title from "@/lib/components/ui/Title";
import Button from "@/lib/components/ui/Buttons/Button";
import Progress from "@/lib/components/ui/Progress";
import Board from "@/lib/components/ui/War/Board";
import Reward from "@/lib/components/ui/Reward";

export default {
  components: { Title, Button, Progress, Board, Reward },
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
    }),
    ...mapGetters({
      getAllFromRace: "enlistment/byRace",
    }),
    isConnected() {
      return this.$store.getters["user/isConnected"];
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
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToEnlistment() {
      this.$router.push(
        `/wars/${this.$route.params.contractWar}/enlistment/${this.$route.params.raceId}`
      );
    },
    async handleSlotSelection(key) {
      const [row, col] = key.split("-");
      this.selectedSlot = { col, row };
      this.isLoadingEnlistment = true;
      let slotData = await this.loadEnlistment();
      this.slotData = slotData;
      this.isLoadingEnlistment = false;
    },
    loadEnlistment(address) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            troops: [
              {
                id: 0,
                displayName: "Warrior",
                amount: 15000000000000000000,
              },
              {
                id: 1,
                displayName: "Archer",
                amount: 15000000000000000000,
              },
              {
                id: 2,
                displayName: "Armoured Warrior",
                amount: 15000000000000000000,
              },
              {
                id: 3,
                displayName: "Crossbowman",
                amount: 15000000000000000000,
              },
              {
                id: 4,
                displayName: "Wizard",
                amount: 15000000000000000000,
              },
              {
                id: 5,
                displayName: "Horseman",
                amount: 15000000000000000000,
              },
            ],
            weapons: [
              {
                id: 4,
                title: "Simple Bow",
                amount: 10400,
              },
              {
                id: 5,
                title: "Simple Spear",
                amount: 10400,
              },
              {
                id: 6,
                title: "Simple Potion",
                amount: 10400,
              },
              {
                id: 39,
                title: "Simple Shield",
                amount: 10400,
              },
            ],
            rewards: [
              { id: 42, amount: 3 },
              { id: 49, amount: 2 },
            ],
          });
        }, 5000);
      });
    },
    goToReport() {
      this.$router.push(`/wars/${this.$route.params.contractWar}/report`);
    },
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
</style>

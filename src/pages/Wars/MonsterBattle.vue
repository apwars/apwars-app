<template>
  <div class="background">
    <v-container class="main" v-if="isConnected">
      <v-row dense no-gutters>
        <v-col>
          <Button
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
        <v-col cols="12" offset-sm="1" sm="8" order="2" order-sm="1">
          <v-row no-gutters class="enlistment-resume" v-if="troopList.length">
            <v-col
              sm="4"
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
                <div class="info-text">
                  Global: 1,5M
                </div>
                <div class="info-text">
                  My Units: 10.4K
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-3">
            <v-col
              v-for="weapon in weapons"
              :key="weapon.id"
              sm="3"
              class="d-flex justify-start align-center"
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
                <div class="info-text">
                  Global: 1,5M
                </div>
                <div class="info-text">
                  My Units: 10.4K
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row
            class="board-viewport d-flex justify-center justify-sm-end  align-sm-end"
          >
          <v-col>
            <Board
              :rows="5"
              :cols="20"
              rotate="40deg"
              :unitImage="`/images/troops/${troopList[0].name.toLowerCase()}.webp`"
            />
          </v-col>
          </v-row>
          
        </v-col>
        <v-col cols="12" sm="3" order="1" order-sm="2" class="d-flex align-end">
          <div class="monster-container">
            <v-img
              :src="`/images/monsters/${monsterData.id}.webp`"
              :alt="monsterData.name"
              :class="[monsterData.id === 4 ? 'invert' : '']"
            />
            <div class="treasure-progress">
              <Progress class="progress" :value="4" :maxScale="10" />
              <div class="treasure">
                <v-img src="/images/battle/treasure.png" />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="4">
          
              <div class="d-flex flex-column justify-center align-center">
                <Progress class="progress" :value="54" :maxScale="100" />
                <div class="info-text mt-1">Remaining slots</div>
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

export default {
  components: { Title, Button, Progress, Board },
  data() {
    return {
      selected: null,
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

.treasure-progress {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.progress {
  z-index: 2;
  width: 100%;
}

.treasure {
  position: absolute;
  bottom: -26px;
  right: -24px;
  z-index: 3;
  > img {
    width: 120px;
  }
  @media screen and (min-width: 1441px) {
    > img {
      width: 180px;
    }
  }
}
.treasure-info {
  position: absolute;
  bottom: -16px;
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
</style>

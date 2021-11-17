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
            <Title text="Monster Battle" />
            <img
              class="ml-2"
              height="104"
              src="/images/icons/corp.png"
              alt="Corporation standart"
            />
          </div>
        </v-col>
      </v-row>
      <v-row class="limit">
        <v-col
          cols="12"
          sm="9"
          order="2"
          order-sm="1"
          class="board-viewport d-flex justify-center justify-sm-end  align-sm-end"
        >
          <div class="board-container">
            <div
              class="board-row"
              v-for="rowIndex in 5"
              :key="rowIndex"
              :style="`--index: ${rowIndex}`"
            >
              <div
                :class="[
                  'slot',
                  rowIndex + '' + index === selected ? 'selected' : '',
                ]"
                v-for="index in 20"
                :key="index"
                @click="selected = rowIndex + '' + index"
              >
                <img
                  class="unit"
                  height="100%"
                  :src="enlistmentOptions.basicUnit"
                  v-show="rowIndex + '' + index === selected"
                />
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          order="1"
          order-sm="2"
          class="d-flex align-sm-end"
        >
          <div class="monster-container">
            <v-img
              :src="`/images/monsters/${monsterData.id}.webp`"
              :alt="monsterData.name"
            />
            <div class="treasure-progress">
              <Progress class="progress" :value="4" :maxScale="10" />
              <div class="treasure">
                <img src="/images/battle/fed-round-2.png" />
                <div class="treasure-info">
                  10% FED
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import { ENLISTMENT_OPTIONS } from "@/data/Races";
import { MONSTERS } from "@/data/Monsters";

import Title from "@/lib/components/ui/Title";
import Button from "@/lib/components/ui/Buttons/Button";
import Progress from "@/lib/components/ui/Progress";

export default {
  components: { Title, Button, Progress },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
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
  background-image: url("/images/background/battle.png");
}
.main {
  @media screen and (min-width: 768px) {
    height: 100%;
  }
}
.limit {
  @media screen and (min-width: 768px) {
    height: 80%;
  }
}
.board-viewport {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  flex: 1;
}
.board-container {
  width: 100%;
  padding-left: 82px;
}
.board-row {
  width: 680px;
  height: 32px;
  margin-top: 2px;
  margin-left: calc(-1 * (var(--index) * 12px));
}
.slot {
  position: relative;
  height: 32px;
  width: 32px;
  display: inline-block;
  background-image: url('/images/battle/floor.png');
  transform: skewX(-20deg);
  margin-right: 1px;
  &:hover {
    transform-style: preserve-3d;
    cursor: pointer;
    outline: 1px solid #312c26;
    transform: skewX(-20deg) scale(1.1);
    z-index: 2;
  }
  &.selected {
    outline: 1px solid yellow;
  }
  > .unit {
    position: absolute;
    left: 0px;
    top: -8px;
    transform: skewX(20deg);
    animation: unit-enter 0.2s ease-in;
  }

  @keyframes unit-enter {
    0% {
      opacity: 0;
      top: -50px;
      left: 0;
      z-index: -1;
    }
    100% {
      opacity: 1;
      top: 0;
      z-index: 3;
    }
  }
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
  bottom: -16px;
  right: -48px;
  z-index: 3;
  > img {
      width: 120px
  }
  @media screen and (min-width: 1441px) {
     > img {
      width: 180px
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
</style>

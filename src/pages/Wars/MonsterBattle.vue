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
          <Board :rows="5" :cols="20" rotate="40deg" unitImage="/images/troops/wwarrior.webp" />
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

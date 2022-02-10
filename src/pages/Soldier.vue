<template>
  <div class="background">
    <v-container>
      <v-row no-gutters>
        <v-col class="screen-title">
          Choose your Soldier
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="soldier-container">
          <div :class="['soldier-viewport', 'is-locked']">
            <img
              class="soldier"
              src="/images/troops/wwarrior-soldier.webp"
              alt="Humans Soldier"
            />
            <img class="ground" src="/images/game/ground.png" alt="Ground" />
            <img class="flag" src="/images/game/flag.png" alt="Flag" />
            <img
              class="soldier-name"
              src="/images/game/soldier-human.png"
              alt="Grunt"
            />
          </div>
          <div class="d-flex flex-column align-center mt-1">
            <Button type="whot" text="Unlock Human" />
            <div class="price d-flex">
              <img
                src="/images/wgold.png"
                height="24px"
                width="24px"
                alt="wGOLD"
              />
              10.000
            </div>
          </div>
        </v-col>
        <v-col cols="6" class="soldier-container">
          <div :class="['soldier-viewport', 'is-locked']">
            <img
              class="soldier"
              src="/images/troops/wgrunt-soldier.webp"
              alt="Orcs Soldier"
            />
            <img class="ground" src="/images/game/ground.png" alt="Ground" />
            <img class="flag" src="/images/game/flag.png" alt="Flag" />
            <img
              class="soldier-name"
              src="/images/game/soldier-orc.png"
              alt="Grunt"
            />
          </div>
          <div class="d-flex flex-column align-center mt-1">
            <Button type="whot" text="Unlock Orc" />
            <div class="price d-flex">
              <img
                src="/images/wgold.png"
                height="24px"
                width="24px"
                alt="wGOLD"
              />
              10.000
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import Button from "@/lib/components/ui/Buttons/Button";

import errorHandler from "@/helpers/errorHandler";

import ToastSnackbar from "@/plugins/ToastSnackbar";

export default {
  components: { Button },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
  },
  created() {
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
  background-image: url("/images/background/world.png");
  background-size: cover;
  height: 100%;
}
.screen-title {
  color: #ffb800;
  font-size: 36px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.soldier-viewport {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200px;
  animation: 3s ease-in-out floating infinite;
  &.is-locked {
    filter: grayscale(100);
  }
}
.soldier {
  position: absolute;
  z-index: 1;
  top: -10px;
}
.ground {
  width: 100%;
}

.flag {
  position: absolute;
  width: 100%;
}

.soldier-name {
  position: absolute;
  width: 150px;
}

.price {
  font-weight: bold;
  font-size: 18px;
}

@keyframes floating {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(4px);
  }

  75% {
    transform: translateY(-4px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>

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
          <div :class="['soldier-viewport', hasHuman ? '' : 'is-locked']">
            <div class="ground-container">
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
          </div>
          <div class="buy-container d-flex flex-column align-center mt-1">
            <template v-if="!hasHuman">
              <v-skeleton-loader
                v-if="isChecking"
                type="image"
                height="36px"
                width="100%"
              />
              <template v-else>
                <Button type="whot"
                  >Unlock
                  <span class="d-none d-sm-block ml-1"> Human</span></Button
                >
                <div class="price d-flex">
                  <img
                    src="/images/wgold.png"
                    height="24px"
                    width="24px"
                    alt="wGOLD"
                  />
                  10.000
                </div>
              </template>
            </template>
          </div>
        </v-col>
        <v-col cols="6" class="soldier-container">
          <div :class="['soldier-viewport', hasOrc ? '' : 'is-locked']">
            <div class="ground-container">
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
          </div>
          <div class="buy-container d-flex flex-column align-center mt-1">
            <template v-if="!hasOrc">
              <v-skeleton-loader
                v-if="isChecking"
                type="image"
                height="36px"
                width="100%"
              />
              <template v-else>
                <Button type="whot"
                  >Unlock
                  <span class="d-none d-sm-block ml-1"> Orc</span></Button
                >
                <div class="price d-flex">
                  <img
                    src="/images/wgold.png"
                    height="24px"
                    width="24px"
                    alt="wGOLD"
                  />
                  10.000
                </div>
              </template>
            </template>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <div class="d-flex flex-column justify-center align-center mt-1">
            <img
              src="/images/game/the-monstrous-journey.png"
              alt="The Monstrous Journey"
            />
            <Button
              class="mt-1"
              type="wprimary"
              text="Play TMJ"
              :handleClick="goTMJ"
              :disabled="!hasHuman && !hasOrc"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import SoldierController from "@/controller/SoldierController";

import Button from "@/lib/components/ui/Buttons/Button";

import errorHandler from "@/helpers/errorHandler";

import ToastSnackbar from "@/plugins/ToastSnackbar";

export default {
  components: { Button },
  computed: {
    account() {
      return this.$store.getters["user/account"];
    },
  },
  data() {
    return {
      isChecking: true,
      hasHuman: false,
      hasOrc: false,
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    goTMJ() {
      this.$router.push("/the-monstrous-journey");
    },
    async checkSoldiers() {
      if (!this.account) {
        return;
      }
      const constroller = new SoldierController();
      this.isChecking = true;
      try {
        await constroller.getNFTByType(this.account, "HUMAN_SOLDIER");
        this.hasHuman = true;
      } catch (error) {
        console.error(error);
        this.hasHuman = false;
      }
      try {
        await constroller.getNFTByType(this.account, "ORC_SOLDIER");
        this.hasOrc = true;
      } catch (error) {
        console.error(error);
        this.hasOrc = false;
      }
      this.isChecking = false;
    },
  },
  watch: {
    account() {
      this.checkSoldiers();
    },
  },
  created() {
    this.setHeader(false);
    this.checkSoldiers();
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
};
</script>
<style lang="scss" scoped>
.background {
  background-image: url("/images/background/world-dark.png");
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
.soldier-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.soldier-viewport {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200px;
  animation: 3s ease-in-out floating infinite;
  width: 80%;
  &.is-locked {
    filter: grayscale(100);
  }
}
.soldier {
  position: absolute;
  z-index: 1;
  top: -160%;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 283px;
    top: -230px;
  }
}

.ground-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    width: 80%;
  }
}
.ground {
  width: 100%;
}

.flag {
  position: absolute;
  top: 25%;
  width: 100%;
}

.soldier-name {
  position: absolute;
  top: 35%;
  width: 30%;
}

.buy-container {
  width: 80%;
  height: 70px;
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

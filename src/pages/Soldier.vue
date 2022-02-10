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
            <Button type="whot"
              >Unlock <span class="d-none d-sm-block ml-1"> Human</span></Button
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
          </div>
        </v-col>
        <v-col cols="6" class="soldier-container">
          <div :class="['soldier-viewport', 'is-locked']">
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
            <Button type="whot"
              >Unlock <span class="d-none d-sm-block ml-1"> Orc</span></Button
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
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";

import Button from "@/lib/components/ui/Buttons/Button";

import errorHandler from "@/helpers/errorHandler";

import ToastSnackbar from "@/plugins/ToastSnackbar";

export default {
  components: { Button },
  computed: {
    ...mapState({
      isLoadingBalances: (state) => state.user.isLoadingBalances,
      balances: (state) => state.user.balances,
    }),
    account() {
      return this.$store.getters["user/account"];
    },
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    ...mapActions({
      fetchUserWallet: "user/fetchUserWallet",
    }),
    async checkSoldiers() {
      await this.fetchUserWallet();
      console.log(this.balances);
    },
    async fetchSoldier(type) {},
  },
  watch: {
    account() {
      this.fetchWallet();
    },
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
  top: 30%;
  width: 40%;
}

.buy-container {
  width: 80%;
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

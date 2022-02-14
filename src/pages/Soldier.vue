<template>
  <div class="background">
    <v-container>
      <v-row dense no-gutters>
        <v-col>
          <Button
            icon="arrow-back"
            type="wtertiary"
            text="Back to Home"
            :handleClick="backToHome"
            noPadding
          />
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col>
          <Title text="Choose your Soldier" />
        </v-col>
        <v-col cols="12" sm="3" class="d-flex justify-center justify-md-end" v-if="isEnlistment">
          <Button
          text="Back to War"
          type="wsecondary"
          size="small"
          :handleClick="backToWar"
        />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="soldier-container">
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
            <template>
              <v-skeleton-loader
                v-if="isChecking"
                type="image"
                height="36px"
                width="100%"
              />
              <template v-else-if="!hasHuman">
                <Button
                  type="whot"
                  text="Unlock"
                  :isLoading="isLoadingUnlock === 'HUMAN_SOLDIER'"
                  :handleClick="() => unlockSoldier('HUMAN_SOLDIER')"
                  icon="wgold"
                />
                <div class="price d-flex">
                  10.000 wGOLD
                </div>
              </template>
              <template v-else>
                <div class="progress-wcourage">
                  <v-progress-linear
                    color="#4049c0"
                    background-color="#3A2720"
                    :value="soldierHuman.data.courage"
                    height="30"
                  >
                    <span class="font-weight-black">
                      Courage {{ soldierHuman.data.courage }}/100
                    </span>
                  </v-progress-linear>
                </div>
                <div
                  class="d-flex flex-column justify-center"
                  v-if="
                    balancewCOURAGE >=
                      this.wCOURAGERefill(soldierHuman.data.courage)
                  "
                >
                  <Button
                    type="wsecondary"
                    text="100% REFILL"
                    :isLoading="isLoadingRecharge"
                    :handleClick="
                      () => rechargeToken('HUMAN_SOLDIER', 'wCOURAGE')
                    "
                    icon="wcourage"
                  />
                  <div class="price d-flex">
                    {{ this.wCOURAGERefill(soldierHuman.data.courage) }}
                    wCOURAGE
                  </div>
                </div>
                <div class="d-flex justify-center align-center" v-else>
                  <div>
                    You need
                    {{ this.wCOURAGERefill(soldierHuman.data.courage) }}
                    wCOURAGE to refill soldier courage
                  </div>
                </div>
              </template>
            </template>
          </div>
        </v-col>
        <v-col cols="5" offset="2" class="soldier-container">
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
            <template>
              <v-skeleton-loader
                v-if="isChecking"
                type="image"
                height="36px"
                width="100%"
              />
              <template v-else-if="!hasOrc">
                <Button
                  type="whot"
                  text="Unlock"
                  :isLoading="isLoadingUnlock === 'ORC_SOLDIER'"
                  :handleClick="() => unlockSoldier('ORC_SOLDIER')"
                  icon="wgold"
                />
                <div class="price d-flex">
                  10.000 wGOLD
                </div>
              </template>
              <template v-else>
                <div class="progress-wcourage">
                  <v-progress-linear
                    color="#4049c0"
                    background-color="#3A2720"
                    :value="soldierOrc.data.courage"
                    height="30"
                  >
                    <span class="font-weight-black">
                      Courage {{ soldierOrc.data.courage }}/100
                    </span>
                  </v-progress-linear>
                </div>
                <div
                  class="d-flex flex-column justify-center"
                  v-if="
                    balancewCOURAGE >=
                      this.wCOURAGERefill(soldierOrc.data.courage)
                  "
                >
                  <Button
                    type="wsecondary"
                    text="100% REFILL"
                    :isLoading="isLoadingRecharge"
                    :handleClick="
                      () => rechargeToken('ORC_SOLDIER', 'wCOURAGE')
                    "
                    icon="wcourage"
                  />
                  <div class="price d-flex">
                    {{ this.wCOURAGERefill(soldierOrc.data.courage) }}
                    wCOURAGE
                  </div>
                </div>
                <div class="d-flex justify-center align-center" v-else>
                  <div>
                    You need
                    {{ this.wCOURAGERefill(soldierOrc.data.courage) }}
                    wCOURAGE to refill soldier courage
                  </div>
                </div>
              </template>
            </template>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex justify-center btn-tmj">
        <div class="d-flex flex-column justify-center align-center mt-1">
          <img
            src="/images/game/the-monstrous-journey.png"
            alt="The Monstrous Journey"
          />
          <Button
            class="mt-1"
            type="wprimary"
            text="Play Now"
            :handleClick="goTMJ"
            :disabled="!hasHuman && !hasOrc"
          />
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import SoldierController from "@/controller/SoldierController";
import WalletController from "@/controller/WalletController";

import Title from "@/lib/components/ui/Title";
import Button from "@/lib/components/ui/Buttons/Button";

import errorHandler from "@/helpers/errorHandler";

import ToastSnackbar from "@/plugins/ToastSnackbar";

export default {
  components: { Button, Title },
  computed: {
    account() {
      return this.$store.getters["user/account"];
    },
    isEnlistment() {
      return Boolean(this.$route.query.isEnlistment);
    },
  },
  data() {
    return {
      isChecking: true,
      hasHuman: false,
      hasOrc: false,
      isLoadingUnlock: false,
      soldierHuman: false,
      soldierOrc: false,
      isLoadingRecharge: false,
      balancewCOURAGE: 0,
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToHome() {
      this.$router.push("/");
    },
    backToWar() {
      this.$router.push("/war/intro");
    },
    goTMJ() {
      this.$router.push("/the-monstrous-journey");
    },
    async checkSoldiers() {
      if (!this.account) {
        return;
      }
      const walletController = new WalletController();
      const balance = await walletController.wallets(this.account);
      this.balancewCOURAGE = balance.balances["wCOURAGE"] || 0;

      const controller = new SoldierController();
      this.isChecking = true;
      try {
        this.soldierHuman = await controller.getNFTByType(
          this.account,
          "HUMAN_SOLDIER"
        );

        this.hasHuman = true;
      } catch (error) {
        console.error(error);
        this.hasHuman = false;
      }
      try {
        this.soldierOrc = await controller.getNFTByType(
          this.account,
          "ORC_SOLDIER"
        );
        this.hasOrc = true;
      } catch (error) {
        console.error(error);
        this.hasOrc = false;
      }
      this.isChecking = false;
    },
    async unlockSoldier(type) {
      const controller = new SoldierController();
      this.isLoadingUnlock = type;
      try {
        await controller.unlockNFT(this.account, type);
        await this.checkSoldiers();
        ToastSnackbar.success("The soldier was successfully unlocked!");
      } catch (error) {
        console.error(error);
        let msg = errorHandler(error.code);
        if (error.code === 4001) {
          msg = "User denied the signature";
        }
        ToastSnackbar.error(msg);
      } finally {
        this.isLoadingUnlock = false;
      }
    },
    calc(i0, K, p0, t) {
      return (p0 * K) / (p0 + (K - p0) * Math.exp(-i0 * t));
    },
    wCOURAGERefill(wCOURAGEBalance) {
      return (
        Math.round(this.calc(0.00001, 1, 5000, wCOURAGEBalance) / 100) * 100
      );
    },
    async rechargeToken(type, token) {
      try {
        const controller = new SoldierController();
        this.isLoadingRecharge = true;
        await controller.rechargeToken(this.account, type, token);
        await this.checkSoldiers();
        this.isLoadingRecharge = false;
      } catch (error) {
        this.isLoadingRecharge = false;
        ToastSnackbar.error(error.toString());
      }
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
  padding-top: 100px;
  animation: 3s ease-in-out floating infinite;
  width: 80%;
  @media screen and (min-width: 1440px) {
    padding-top: 200px;
  }
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
    width: 196px;
    top: -150px;
  }
  @media screen and (min-width: 1440px) {
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

.progress-wcourage {
  width: 100%;
  margin: 6px;
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

.btn-tmj {
  margin-top: -115px;
  @media screen and (max-width: 768px) {
    margin-top: 30px;
  }
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

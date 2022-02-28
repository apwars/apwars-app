<template>
  <div class="tmj-dashboard">
    <div class="d-flex justify-center">
      <img src="/images/tmj.png" height="64" alt="the monstrous journey" />
    </div>
    <div class="tmj-container mt-2">
      <v-skeleton-loader type="image" height="120px" width="100%" v-if="isLoadingSoldier" />
      <template v-else-if="!soldiers.length">
        <div class="soldier-container">
          <img class="gray" src="/images/troops/wwarrior-nft.png" width="89" />
          <div class="soldier-price">10.000</div>
          <div class="d-flex justify-center align-center">
            <img src="/images/wgold.png" height="14" width="14" />
            <span class="price-token">wGOLD</span>
          </div>
        </div>
        <div class="unlock-info">
          <div class="tmj-title">
            Unlock Soldier
          </div>
          <div class="mt-1 pa-1">It's the first step toward the rewards.</div>
          <div class="d-flex justify-center">
            <Button
              class="mt-2"
              type="wsecondary"
              text="Play TMJ"
              :handleClick="() => $router.push('/the-monstrous-journey')"
            />
          </div>
        </div>
        <div class="soldier-container">
          <img class="gray" src="/images/troops/wgrunt-nft.png" width="89" />
          <div class="soldier-price">10.000</div>
          <div class="d-flex justify-center align-center">
            <img src="/images/wgold.png" height="14" width="14" />
            <span class="price-token">wGOLD</span>
          </div>
        </div>
      </template>
      <template v-else-if="currentSoldier">
        <div class="soldiers">
          <div class="soldier-info">
            <div class="controls" v-if="soldiers.length > 1">
              <div class="prev" @click="() => changeIndex(-1)"></div>
              <div class="next" @click="() => changeIndex(1)"></div>
            </div>
            <div class="basic-data">
              <img
                class="soldier-img"
                :src="
                  currentSoldier.type === 'HUMAN_SOLDIER'
                    ? '/images/troops/wwarrior-nft.png'
                    : '/images/troops/wgrunt-nft.png'
                "
                width="89"
              />
              <div class="level-data">
                Level {{ currentSoldier.data.level }}
              </div>
            </div>
            <div class="state-data ml-2">
              <div>{{ currentSoldier.data.name }}</div>
              <div class="d-flex align-center mt-1">
                <div class="data-label">Courage</div>
                <div class="courage-container">
                <img class="courage-bar" src="/images/courage-bar.png" height="100%" width="100%" />
                <Progress
                    class="courage-progress"
                    :value="currentSoldier.data.courage"
                    :maxScale="100"
                    :label="`${currentSoldier.data.courage}/100`"
                    color1="#FFB800"
                    color2="#FFB800"
                  />
                </div>
              </div>
              <div class="d-flex align-center mt-1">
                <div class="data-label">Energy</div>
                <div class="energy-container">
                  <img class="energy-bar" src="/images/energy-bar.png" height="100%" width="100%" />
                  <Progress
                    class="energy-progress"
                    :value="currentSoldier.data.energy"
                    :maxScale="3"
                    color1="#00A3FF"
                    color2="#00A3FF"
                    :label="`${currentSoldier.data.energy}/3`"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-center">
            <Button
              type="wsecondary"
              text="Play TMJ"
              :handleClick="() => $router.push('/the-monstrous-journey')"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Button from "@/lib/components/ui/Buttons/Button";
import Progress from "@/lib/components/ui/Progress";

export default {
  components: { Button, Progress },
  computed: {
    ...mapState({
      humanSoldier: (state) => state.wallet.humanSoldier,
      orcSoldier: (state) => state.wallet.orcSoldier,
      isLoadingSoldier : (state) => state.wallet.isLoadingSoldier,
    }),
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    hasNoSoldiers() {
      return !this.humanSoldier && !this.orcSoldier;
    },
    soldiers() {
      let s = [];
      if (this.humanSoldier) {
        s = s.concat(this.humanSoldier);
      }
      if (this.orcSoldier) {
        s = s.concat(this.orcSoldier);
      }
      return s;
    },
    currentSoldier() {
      return this.soldiers[this.soldiersIndex];
    },
  },
  data() {
    return {
      soldiersIndex: 0,
    };
  },
  methods: {
    ...mapActions({
      checkSoldiers: "wallet/checkSoldiers",
    }),
    fetchSoldiers() {
      if (!this.isConnected || !this.account) {
        return;
      }
      this.checkSoldiers();
    },
    changeIndex(direction) {
      const nextIndex = this.soldiersIndex + direction;
      const limit = this.soldiers.length - 1;
      if (nextIndex > limit) {
        this.soldiersIndex = 0;
      } else if (nextIndex < 0) {
        this.soldiersIndex = this.soldiers.length - 1;
      } else {
        this.soldiersIndex = nextIndex;
      }
    },
  },
  mounted() {
    this.fetchSoldiers();
  },
  watch: {
    isConnected() {
        this.fetchSoldiers();
      },
    account() {
      this.fetchSoldiers();
    },
  },
};
</script>
<style lang="scss" scoped>
.tmj-container {
  display: flex;
}
.unlock-info {
  text-align: center;
  font-size: 14px;
  line-height: 1;
}
.tmj-title {
  font-weight: bold;
  font-size: 14px;
  line-height: 1.3;
  color: #ffeebc;
}
.soldiers {
  width: 100%;
}
.controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
}
.prev {
  width: 0px;
  height: 0px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 15px solid #ffeebc;
  &:hover {
    cursor: pointer;
  }
}
.next {
  width: 0px;
  height: 0px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid #ffeebc;
  &:hover {
    cursor: pointer;
  }
}
.gray {
  filter: grayscale(1);
}
.soldier-price {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
  text-align: center;
}
.price-token {
  margin-left: 2px;
  font-size: 10px;
  line-height: 1.3;
}
.soldier-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 120px;
  @media screen and (min-width: 1137px) {
    flex-direction: row;
    align-items: initial;
  }
}
.level-data {
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.2;
}
.data-label {
  font-weight: bold;
  font-size: 14px;
  line-height: 1.3;
  width: 60px;
}
.courage-container {
  position: relative;
  width: 140px;
  height: 33px;
}
.courage-bar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.courage-progress {
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 1;
  height: 22px;
  width: 85%;
}
.energy-container {
  position: relative;
  width: 123px;
  height: 28px;
}
.energy-bar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.energy-progress {
  position: absolute;
  top: 2px;
  left: 6px;
  z-index: 1;
  height: 22px;
  width: 91%;
}
</style>

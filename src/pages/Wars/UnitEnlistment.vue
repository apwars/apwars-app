<template>
  <div class="background">
  <v-container v-if="isConnected">
    <v-row v-if="!troop">
      Troop not found!
    </v-row>
    <template v-else>
      <v-row>
        <v-col>
          <Button text="Back to enlistment page" :handleClick="backToWar" />
          <game-title>
            <h2 class="troop-name">{{ troop.name }}</h2>
            <div class="name-decoration"></div>
          </game-title>
          <div class="status-container">
            <div class="troop-status mr-2">
              <div class="status-icon">
                <img
                        src="/images/icons/attack.png"
                        alt="Attack points"
                      />
              </div>
              <div class="status-info">
                {{ troop.strength }}/10
              </div>
            </div>
            <div class="troop-status">
              <div class="status-icon">
                <img
                        src="/images/icons/defense.png"
                        alt="Defense points"
                      />
              </div>
              <div class="status-info">
                {{ troop.defense }}/10
              </div>
            </div>
            
          </div>
        </v-col>
        <v-col>
          <div class="troop-viewport">
            <div class="controls">
              <img  src="/images/icons/chevron.png" @click="goToUnit(currentIndex - 1)" />
              <img class="invert" src="/images/icons/chevron.png" @click="goToUnit(currentIndex + 1)" />
            </div>
                <img
                  class="troop-model"
                  :src="
                    `/images/troops/${troop.name.toLowerCase()}-model.png`
                  "
                  :alt="troop.name"
                />
              </div>
        </v-col>
        <v-col>
          <img src="/images/icons/corp.png" alt="Corporation standart" />
          <div class="troop-list mt-2">
            <div class="troop-status mb-1" v-for="unit in unitsFromRace" :key="unit.name">
              <div class="status-icon">
                <img
                        :src="`/images/icons/${unit.name}.png`"
                        alt="Attack points"
                      />
              </div>
              <div class="unit-name">
                {{ unit.name }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col>
          <div class="agreement-container" v-if="!agreement">
            <div class="message-title">
              <v-img max-width="44" class="mr-2" src="/images/skull.png" />
              <div class="message-text">CAUTION</div>
              <v-img
                max-width="44"
                class="ml-2 skull-flip"
                src="/images/skull.png"
              />
            </div>
            <p class="mb-1">
              What will happen when you send your troops to the War Contract:<br />
              - You'll not be able to withdraw them from the contract until the
              war is over.
              <br />
              - The majority of them will die in the war, even if you win the
              battle! <br />
              - The weapons are spendable and will not return to you after the
              battle. <br />
            </p>
            <wButton class="mx-2" @click="agreement = true">Agree</wButton>
          </div>
        </v-col>
      </v-row> -->
    </template>
  </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Troops from "@/lib/eth/Troops";

import { getCollectibleById } from "@/data/Collectibles";
import { getTroop, getAllFromRace } from "@/data/Troops";
import GameText from "@/lib/components/ui/Utils/GameText";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Button from "@/lib/components/ui/Buttons/Button";
import GameTitle from "@/lib/components/ui/Utils/GameTitle";
export default {
  components: {
    GameTitle,
    wButton,
    GameText,
    Button,
  },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },

    availableWeapons() {
      if (!this.troop.availableWeapons) {
        return [];
      }
      return this.troop.availableWeapons.map((w) => ({
        ...getCollectibleById(w),
        amount: 0,
        amountAvailable: 10,
      }));
    },

    unitsFromRace() {
      return getAllFromRace(this.troop.race);
    },

    currentIndex() {
      return this.unitsFromRace.findIndex((u) => u.name === this.troop.name);
    },

    prevText() {
      return `Go to ${this.getUnitName(this.currentIndex - 1)}`;
    },

    nextText() {
      return `Go to ${this.getUnitName(this.currentIndex + 1)}`;
    },
  },
  data() {
    return {
      isLoading: false,
      troop: null,
      agreement: false,
      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 8,
        autoDecimalMode: true,
        allowNegative: false,
      },
    };
  },
  methods: {
    ...mapMutations({
      setHeader: 'app/setMenuDisplay'
    }),
    backToWar() {
      return this.$router.push(
        `/wars/${this.$route.params.contractWar}/enlistment`
      );
    },
    goToUnit(unitIndex) {
      const unitName = this.getUnitName(unitIndex);
      this.$router.push(
        `/wars/${this.$route.params.contractWar}/enlistment/${unitName}`
      );
    },
    getUnitName(position) {
      if (position >= this.unitsFromRace.length) {
        return this.unitsFromRace[0].name;
      } else if (position <= 0) {
        return this.unitsFromRace[this.unitsFromRace.length - 1].name;
      }
      return this.unitsFromRace[position].name;
    },
    loadUnit() {
      let troop = getTroop(
        this.$route.params.nameOrAddress,
        this.networkInfo.id
      );
      troop.amountAvailable = 0
      troop.amount = 0;
      this.troop = {...troop};
      this.loadUnitData();
    },
    async loadUnitData() {
      this.isLoading = true;
      this.troop.contract = await new Troops(
        this.troop.contractAddress[this.networkInfo.id]
      );
      this.troop.amountAvailable = await troop.contract.balanceOf(this.account);
      this.isLoading = false;
    },
    stakeMax() {
      return null;
    },
  },
  async mounted() {
    this.setHeader(false);
    this.loadUnit();
  },
  beforeRouteLeave() {
    this.setHeader(true);
  }
};
</script>
<style lang="scss" scoped>
.subtitle {
  font-size: 12px;
  font-style: italic;
}
.weapon-container {
  display: flex;
}
.weapon-title {
  font-size: 16px;
  font-weight: 800;
}
.troop-container {
  display: flex;
}
.troop-name {
  font-weight: bold;
  line-height: 1.2;
}
.name-decoration {
  margin-top: 8px;
  width: 30%;
  height: 3px;
  border-radius: 5px;
  background: linear-gradient(180deg, #FAFF00 0%, #FFB800 100%);
}
.troop-viewport {
  z-index: 2;
  position: relative;
  width: 460px;
  display: flex;
  justify-content: center;
}
.troop-model {
  width: 395px;
}
.controls {
  z-index: 5;
  position: absolute;
  top: 50%;
  transition: translateY(-50%);
  display: flex;
  justify-content: space-between;
  > img {
    height: 58px;
    width: 58px;
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
  > .invert {
    transform: rotate(180deg);
    &:hover {
      transform: rotate(180deg) scale(1.2);
    }
  }
}
.status-container {
  margin-top: 64px;
  display: flex;
  margin-bottom: 16px;
}
.troop-status {
  display: flex;
  align-items: center;
  width: 140px;
}
.status-icon {
  height: 60px;
  width: 60px;
  background-image: url('/images/icons/slot.png');
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  > img {
    max-width: 60px;
    max-height: 60px;
  }
}
.status-info {
  font-size: 24px;
  font-weight: 700;
}
.status-image {
  height: 27px;
  width: 27px;
}
.unit-name {
  height: 60px;
  font-size: 14px;
  white-space: nowrap;
  font-weight: 700;
}
.agreement-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}
.message-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.skull-flip {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.buy-message {
  display: flex;
  > .text {
    max-width: 320px;
    padding-right: 32px;
  }
}

.controls {
  width: 100%;
}

.background {
  height: 100%;
  width: 100%;
  background-image: url('/images/background/enlistment-1.png');
  background-size: cover;
}
</style>

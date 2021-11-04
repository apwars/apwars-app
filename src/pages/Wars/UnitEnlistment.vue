<template>
  <div class="background">
    <v-container v-if="isConnected">
      <v-row v-if="!troop">
        Troop not found!
      </v-row>
      <template v-else>
        <v-row>
          <v-col>
            <Button
              type="wtertiary"
              text="Back to enlistment page"
              :handleClick="backToWar"
            />
            <div class="name-container d-flex">
              <game-title class="d-flex flex-column justify-space-between">
                <h2 class="troop-name">{{ troop.displayName }}</h2>
                <div class="name-decoration"></div>
              </game-title>
              <img
                class="ml-2"
                height="104"
                src="/images/icons/corp.png"
                alt="Corporation standart"
              />
            </div>
            <div class="form-container mt-3 mb-2">
              <v-skeleton-loader type="text, button" v-if="isLoading" />
              <div class="" v-else-if="!troop.balance">
                You don`t have available {{ troop.name }} to enlist, you can
                always buy more.
              </div>
              <div class="enlist-form" v-else>
                <div class="enlist-title">
                  {{ troop.displayName }}
                </div>
                <v-currency-field
                  outlined
                  color="#FFF"
                  persistent-hint
                  v-bind="currencyConfig"
                  v-model="stake"
                  :disabled="!troop.balance"
                >
                  <template v-slot:append>
                    <div class="d-flex">
                      <v-btn
                        class="align-self-center"
                        rounded
                        small
                        @click="stakeMax"
                      >
                        MAX
                      </v-btn>
                    </div>
                  </template>
                </v-currency-field>
                <div class="weapon-title">
                  {{ weapon.title }}
                </div>
                <v-currency-field
                  color="#FFF"
                  outlined
                  :hint="`Available: ${weapon.balance}`"
                  persistent-hint
                  v-bind="currencyConfig"
                  v-model="stakedWeapon"
                  :disabled="!weapon.balance"
                >
                  <template v-slot:append>
                    <div class="d-flex">
                      <v-btn
                        class="align-self-center"
                        rounded
                        small
                        @click="stakeMaxWeapon"
                      >
                        MAX
                      </v-btn>
                    </div>
                  </template>
                </v-currency-field>
              </div>
            </div>
            <div class="status-container">
              <div class="troop-status mr-2">
                <div class="status-icon">
                  <img src="/images/icons/attack.png" alt="Attack points" />
                </div>
                <div class="status-info">{{ troop.strength }}/10</div>
              </div>
              <div class="troop-status">
                <div class="status-icon">
                  <img src="/images/icons/defense.png" alt="Defense points" />
                </div>
                <div class="status-info">{{ troop.defense }}/10</div>
              </div>
            </div>
            <div class="price-container">
              <div class="price-amount d-flex align-center">
                <img
                  src="/images/wgold.png"
                  width="48"
                  height="48"
                  alt="wGOLD"
                />
                {{ troop.price }} wGOLD
              </div>
              <div clas="btn-buy">
                <Button type="wprimary" text="Buy Troops" />
              </div>
            </div>
            <div class="amount-container" v-if="troop.balance">
              <div class="amount-title">
                You have units:
              </div>
              <div class="amount">{{ troop.balance }} {{ troop.name }}</div>
            </div>
          </v-col>
          <v-col>
            <div class="troop-viewport">
              <div class="controls">
                <img
                  src="/images/icons/chevron.png"
                  @click="goToUnit(currentIndex - 1)"
                />
                <img
                  class="invert"
                  src="/images/icons/chevron.png"
                  @click="goToUnit(currentIndex + 1)"
                />
              </div>
              <v-img
                :src="`/images/troops/${troop.name.toLowerCase()}.webp`"
                :alt="troop.name"
              />
              <img
                class="aura"
                :src="`/images/troops/humans-aura.png`"
                :alt="troop.name"
              />
              <img
                v-show="weapon.amount"
                class="weapon-image"
                height="150"
                width="150"
                :src="`/images/icons/${weapon.icon}.png`"
                :alt="weapon.title"
              />
            </div>
          </v-col>
          <v-col>
            <div class="enlistment-title d-flex">
              <img
                class="mr-1"
                height="32"
                width="32"
                src="/images/icons/battle-shield.png"
                alt="Enlistment resume"
              />
              Your troops enlistment
            </div>
            <div class="troop-list mt-2">
              <div
                class="troop-status mb-1"
                v-for="(unit, index) in unitsFromRace"
                :key="unit.name"
              >
                <div
                  class="status-icon clickable"
                  @click="() => goToUnit(index)"
                >
                  <img
                    :src="`/images/icons/${unit.name}.png`"
                    alt="Attack points"
                  />
                </div>
                <div class="unit-info">
                  <div class="unit-name">
                    {{ unit.tierDesc }}
                  </div>
                  <div class="amount">
                    {{ unit.amount || "Not staked" }}
                  </div>
                </div>
                <div
                  class="unit-info ml-3"
                  v-if="getWeapon(unit.weaponId).amount"
                >
                  <div class="unit-name">
                    {{ getWeapon(unit.weaponId).title }}
                  </div>
                  <div class="amount">
                    {{ getWeapon(unit.weaponId).amount || "Not staked" }}
                  </div>
                </div>
              </div>
              <Button type="wsecondary" text="Enlist and Battle" isBlock />
            </div>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { TIER_WEAPONS } from "@/data/Collectibles/Weapons";

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
    ...mapGetters({
      getAllFromRace: "enlistment/byRace",
      getByNameOrAddress: "enlistment/getByNameOrAddress",
      getWeapon: "enlistment/getWeapon",
    }),
    troop() {
      return this.getByNameOrAddress(this.$route.params.nameOrAddress);
    },
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

    unitsFromRace() {
      return this.getAllFromRace(this.troop.race);
    },

    currentIndex() {
      return this.unitsFromRace.findIndex((u) => u.name === this.troop.name);
    },

    weapon() {
      if (!this.troop) {
        return null;
      }
      return this.getWeapon(TIER_WEAPONS[this.troop.tier]);
    },

    stake: {
      get() {
        return this.troop.amount;
      },
      set(value) {
        this.stakeTroop({ amount: value, troopId: this.troop.id });
      },
    },

    stakedWeapon: {
      get() {
        return this.weapon.amount;
      },
      set(value) {
        if (!this.weapon) {
          return;
        }
        return this.stakeWeapon({
          weaponId: this.weapon.id,
          amount: value,
        });
      },
    },
  },
  data() {
    return {
      isLoading: false,
      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 0,
        autoDecimalMode: false,
        allowNegative: false,
      },
    };
  },
  methods: {
    ...mapActions({
      updateBalances: "enlistment/updateBalances",
      updatePrices: "enlistment/updatePrices",
      stakeTroop: "enlistment/stakeTroop",
      stakeWeapon: "enlistment/stakeWeapon",
      updateWeaponsBalance: "enlistment/updateWeaponsBalance",
    }),
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToWar() {
      this.$router.push({
        path: `/wars/${this.$route.params.contractWar}/enlistment`,
      });
    },
    goToUnit(unitIndex) {
      const unitName = this.getUnitName(unitIndex);
      if (this.$route.params.nameOrAddress !== unitName) {
        this.$router.push(
          `/wars/${this.$route.params.contractWar}/enlistment/${unitName}`
        );
      }
    },
    getUnitName(position) {
      if (position > this.unitsFromRace.length - 1) {
        return this.unitsFromRace[0].name;
      } else if (position < 0) {
        return this.unitsFromRace[this.unitsFromRace.length - 1].name;
      }
      return this.unitsFromRace[position].name;
    },
    stakeMax() {
      this.stakeTroop({ amount: this.troop.balance, troopId: this.troop.id });
    },
    stakeMaxWeapon() {
      this.stakeWeapon({
        amount: this.weapon.balance,
        weaponId: this.weapon.id,
      });
    },
  },
  watch: {
    isConnected() {
      this.updateBalances();
      this.updatePrices();
      this.updateWeaponsBalance();
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
  font-size: 48px;
  line-height: 1.2;
}
.name-decoration {
  margin-top: 8px;
  width: 90%;
  height: 3px;
  border-radius: 5px;
  background: linear-gradient(180deg, #faff00 0%, #ffb800 100%);
}
.troop-viewport {
  z-index: 2;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    max-width: 380px;
    min-height: 540px;
  }
}
.enlist-title {
  font-size: 24px;
  font-weight: bold;
}
.troop-model {
  width: 100%;
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
  margin-top: 42px;
  display: flex;
}
.troop-status {
  display: flex;
  align-items: center;
  width: 140px;
}
.status-icon {
  height: 60px;
  width: 60px;
  background-image: url("/images/icons/slot.png");
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  > img {
    max-width: 60px;
    max-height: 60px;
  }
  &.clickable {
    &:hover {
      cursor: pointer;
      transform: scale(1.04);
    }
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
.unit-info {
  font-size: 14px;
  white-space: nowrap;
  font-weight: 700;
  min-width: 120px;
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
  background-image: url("/images/background/enlistment-1.png");
  background-size: cover;
}

.form-container {
  @media screen and (min-width: 768px) {
    min-height: 320px;
  }
}

.price-container {
  margin-top: 21px;
  display: flex;
}

.price-amount,
.btn-buy {
  width: 50%;
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
}

.unit-name {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #ffeebc;
}

.amount-container {
  margin-top: 21px;
  .amount-title {
    font-weight: bold;
    line-height: 21px;
    color: #ffeebc;
  }
  .amount {
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
  }
}

.enlistment-title {
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: #ffffff;
}
.weapon-image {
  position: absolute;
  bottom: 0;
  right: 0;
  animation: weapon-fall 0.3s linear forwards;
}

.aura {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: -3;
  animation: aura-flutuation 2.2s linear forwards infinite;
}

@keyframes weapon-fall {
  from {
    opacity: 0;
    transform: translateY(-1200px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes aura-flutuation {
  0% {
    opacity: 0.4;
    transform: translateY(-50%);
  }

  50% {
    opacity: 1;
    transform: translateY(-60%);
  }

  100% {
    opacity: 0.4;
    transform: translateY(-50%);
  }
}
</style>

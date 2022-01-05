<template>
  <div
    class="background"
    :style="`background-image: url(${enlistmentOptions.background})`"
  >
    <v-container v-if="isConnected">
      <v-row dense no-gutters>
        <v-col>
          <Button
            icon="arrow-back"
            type="wtertiary"
            text="Back to war resume"
            :handleClick="backToWar"
            noPadding
          />
        </v-col>
      </v-row>
      <v-row v-if="!troop">
        <v-col class="d-flex justify-center">
          <h3 class="text-h4 text-md-h3 ma-0 ma-md-6">
            This race is not available to enlist.
          </h3>
        </v-col>
      </v-row>
      <template v-else>
        <v-row dense>
          <v-col md="4">
            <div class="name-container d-flex justify-space-between">
              <Title text="WAR IV" subtitle="Enlistment" />
            </div>
            <div class="form-container mt-3 mb-2">
              <v-skeleton-loader type="text, button" v-if="isLoading" />
              <div class="enlist-form" v-else>
                <div class="enlist-title">
                  {{ troop.displayName }}
                </div>
                <v-currency-field
                  outlined
                  color="#FFF"
                  v-bind="currencyConfig"
                  v-model="stakedTroop"
                  :error="stakedTroop > this.troop.balance"
                  disabled
                />
                <div class="enlist-title">
                  {{ weapon.title }}
                </div>
                <v-currency-field
                  color="#FFF"
                  outlined
                  :hint="`Available: ${weapon.balance - totalStakedWeapon}`"
                  persistent-hint
                  v-bind="currencyConfig"
                  v-model="stakedWeapon"
                  :max="this.maxPossibleWeaponStake"
                  :error="totalStakedWeapon > weapon.balance"
                  :disabled="!troop.balance || !weapon.balance"
                >
                  <template v-slot:append>
                    <div class="d-flex align-center">
                      /{{ weapon.war.stakeLimit }}
                      <v-btn
                        class="ml-1"
                        rounded
                        small
                        @click="stakeMaxWeapon"
                        :disabled="!maxPossibleWeaponStake"
                      >
                        MAX
                      </v-btn>
                    </div>
                  </template>
                </v-currency-field>
              </div>
              <div v-if="!troop.balance">
                You don't have the amount of {{ troop.war.stakeMin }}
                {{ troop.name }} to fill the formation. How about acquiring some more?
              </div>
            </div>
            <div class="status-container">
              <div class="troop-status mr-2">
                <div class="status-icon">
                  <img src="/images/icons/attack.png" alt="Attack points" />
                </div>
                <div class="force-text">
                  {{ troop.strength }}
                </div>
              </div>
              <div class="troop-status">
                <div class="status-icon">
                  <img src="/images/icons/defense.png" alt="Defense points" />
                </div>
                <div class="force-text">
                  {{ troop.defense }}
                </div>
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
                <Button
                  type="wprimary"
                  text="Buy Troops"
                  :handleClick="openBuy"
                />
              </div>
            </div>
            <div class="amount-container">
              <div class="amount-title">
                Units you have:
              </div>
              <div class="amount">
                <Amount
                  :amount="troop.balance"
                  :symbol="troop.name"
                  compact
                  formatted
                />
              </div>
            </div>
          </v-col>
          <v-col md="4">
            <div class="troop-viewport">
              <img
                class="aura"
                :src="enlistmentOptions.aura"
                :alt="troop.name"
              />
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
                v-show="troop.weaponAmount"
                class="weapon-image"
                height="150"
                width="150"
                :src="`/images/icons/${weapon.icon}.png`"
                :alt="weapon.title"
              />
            </div>
          </v-col>
          <v-col md="4">
            <div class="enlistment-title d-flex">
              <img
                class="mr-1"
                height="32"
                width="32"
                src="/images/icons/battle-shield.png"
                alt="Enlistment resume"
              />
              Select your formation
            </div>
            <v-select
              :items="formationOptions"
              label="Select"
              single-line
              :value="formation"
              @change="handleFormationChange"
            ></v-select>
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
                  <div class="unit-name mb-1">
                    {{ unit.displayName }}
                  </div>
                  <div class="amount">
                    <span class="d-flex align-end" v-if="unit.amount">
                      <TripleIcon class="mr-1" :name="unit.name" size="16px" />
                      <Amount :amount="unit.amount" decimals="0" formatted />
                    </span>
                    <span v-else>
                      Not staked
                    </span>
                  </div>
                </div>
                <div class="unit-info ml-1" v-if="unit.weaponAmount">
                  <div class="unit-name mb-1">
                    {{ getWeaponByTier(unit.tier).title }}
                  </div>
                  <div class="amount d-flex">
                    <TripleIcon
                      class="mr-1"
                      :name="getWeaponByTier(unit.tier).icon"
                      size="16px"
                    />
                    {{ unit.weaponAmount || "Not staked" }}
                  </div>
                </div>
              </div>
              <div class="total-force mb-1">
                Power Units:
                <span class="amount"
                  >{{ totalStakedForce(troop.race) }}</span
                >
              </div>
              <Button type="wprimary" text="Choose a slot" isBlock :handleClick="goToMonsterBattle" />
              <Progress
                class="mt-2"
                :value="50"
                :maxScale="100"
                color1="#346568"
                color2="#1A3436"
                noText
              />
              <div class="slots-info d-flex justify-center">54/100</div>
              <div class="slots-description d-flex justify-center">
                Fullfiled Slots
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
import { ENLISTMENT_OPTIONS } from "@/data/Enlistment";
import { MONSTERS } from "@/data/Monsters";
import { RACE_FORMATIONS, FORMATIONS_NAMES } from "@/data/Enlistment";

import GameText from "@/lib/components/ui/Utils/GameText";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import TripleIcon from "@/lib/components/ui/TripleIcon";
import ForceMeter from "@/lib/components/ui/ForceMeter";
import Progress from "@/lib/components/ui/Progress";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: {
    Title,
    wButton,
    GameText,
    Button,
    TripleIcon,
    ForceMeter,
    Progress,
    Amount,
  },
  computed: {
    ...mapState({
      formation: state => state.enlistment.formation
    }),
    ...mapGetters({
      getAllFromRace: "enlistment/byRace",
      getByNameOrAddress: "enlistment/getByNameOrAddress",
      getWeaponByTier: "enlistment/getWeaponByTier",
      getTotalStakedWeapon: "enlistment/totalStakedWeapon",
      totalStakedForce: "enlistment/totalStakedForce",
      maxStakeForce: "enlistment/maxStakeForce",
    }),
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
      return this.getAllFromRace(this.$route.params.raceId);
    },

    currentIndex() {
      return this.unitsFromRace.findIndex((u) => u.name === this.troop.name);
    },

    troop() {
      if (!this.troopSelected) {
        return null;
      }
      return this.getByNameOrAddress(this.troopSelected);
    },

    weapon() {
      if (!this.troop) {
        return null;
      }
      return this.getWeaponByTier(this.troop.tier);
    },

    totalStakedWeapon() {
      if (!this.troop) {
        return 0;
      }
      return this.getTotalStakedWeapon(this.troop.tier);
    },

    stakedStrength() {
      return (
        this.troop.strength * this.troop.amount +
        this.weapon.strength * this.troop.weaponAmount
      );
    },

    stakedDefense() {
      return (
        this.troop.defense * this.troop.amount +
        this.weapon.defense * this.troop.weaponAmount
      );
    },

    maxStrength() {
      return (
        this.troop.strength * this.troop.war.stakeLimit +
        this.weapon.strength * this.weapon.war.stakeLimit
      );
    },

    maxDefense() {
      return (
        this.troop.defense * this.troop.war.stakeLimit +
        this.weapon.defense * this.weapon.war.stakeLimit
      );
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

    maxPossibleTroopStake() {
      return Math.min(this.troop.balance, this.troop.war.stakeLimit);
    },
    maxPossibleWeaponStake() {
      return Math.min(this.weapon.balance, this.weapon.war.stakeLimit);
    },
    formationOptions() {
      return Object.keys(RACE_FORMATIONS[this.troop.race]).map(key => ({ text: FORMATIONS_NAMES[key], value: key }));
    },

    stakedTroop: {
      get() {
        return this.troop.amount;
      },
      set(value) {
        this.stakeTroop({ amount: value, troopId: this.troop.id });
      },
    },

    stakedWeapon: {
      get() {
        return this.troop.weaponAmount;
      },
      set(value) {
        this.stakeWeapon({
          troopId: this.troop.id,
          amount: value,
        });
      },
    },
  },
  data() {
    return {
      troopSelected: null,
      isLoading: false,
      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 0,
        autoDecimalMode: false,
        allowNegative: false,
      },
      buyURL:
        "https://exchange.apwars.farm/#/swap?showFarms=true&outputCurrency",
    };
  },
  methods: {
    ...mapActions({
      getWar: "war/getWar",
      updateBalances: "enlistment/updateBalances",
      updatePrices: "enlistment/updatePrices",
      stakeTroop: "enlistment/stakeTroop",
      stakeWeapon: "enlistment/stakeWeapon",
      updateWeaponsBalance: "enlistment/updateWeaponsBalance",
      changeFormation: "enlistment/changeFormation",
    }),
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToWar() {
      this.$router.push({
        path: `/wars/${this.$route.params.contractWar}`,
      });
    },
    goToUnit(unitIndex) {
      const unitName = this.getUnitName(unitIndex);
      if (this.troopSelected !== unitName) {
        this.troopSelected = unitName;
      }
    },
    goToMonsterBattle() {
      this.$router.push({
        path: `/wars/${this.$route.params.contractWar}/enlistment/${this.$route.params.raceId}/battle`
      })
    },
    getUnitName(position) {
      if (position > this.unitsFromRace.length - 1) {
        return this.unitsFromRace[0].name;
      } else if (position < 0) {
        return this.unitsFromRace[this.unitsFromRace.length - 1].name;
      }
      return this.unitsFromRace[position].name;
    },
    stakeMaxWeapon() {
      this.stakeWeapon({
        amount: this.maxPossibleWeaponStake - this.totalStakedWeapon,
        troopId: this.troop.id,
      });
    },
    openBuy() {
      window
        .open(
          `${this.buyURL}=${this.troop.contractAddress[this.networkInfo.id]}`,
          "_blank"
        )
        .focus();
    },
    handleFormationChange(value) {
      this.changeFormation({ raceId: this.troop.race, value });
    }
  },
  watch: {
    isConnected() {
      this.updateBalances();
      this.updatePrices();
      this.updateWeaponsBalance();
      this.getWar(this.$route.params.contractWar);
    },
    account() {
      this.getWar(this.$route.params.contractWar);
      this.updateBalances();
      this.updatePrices();
      this.updateWeaponsBalance();
    },
  },
  async mounted() {
    this.setHeader(false);
    this.troopSelected = this.unitsFromRace[0].name;
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
.troop-viewport {
  position: relative;
  width: 100%;
  .aura {
    position: absolute;
    top: 50%;
    animation: aura-flutuation 2.2s linear forwards infinite;
    width: 100%;
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
}
.enlist-title {
  font-size: 24px;
  font-weight: bold;
}

.status-container {
  margin-top: 42px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 425px) {
    margin-top: 42px;
    flex-direction: row;
  }
}
.troop-status {
  display: flex;
  align-items: center;
  margin-top: 8px;
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
  .amount {
    line-height: 1;
  }
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
  position: relative;
  z-index: 1;
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

.total-force {
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: #ffeebc;
  .amount {
    color: white;
  }
}

.bonus-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .bonus-title {
    font-weight: bold;
    font-size: 36px;
    line-height: 48px;
    color: #ffeebc;
  }
  .illustration {
    width: 96px;
  }
}

.slots-info {
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
}

.slots-description {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
}

.force-text {
  font-size: 32px;
  font-weight: bold;
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

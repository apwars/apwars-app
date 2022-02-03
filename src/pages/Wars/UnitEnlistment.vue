<template>
  <div
    class="background"
    :style="`background-image: url(${enlistmentOptions.background})`"
  >
    <v-container v-if="account">
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
              <Title
                :text="war ? war.name : 'WAR'"
                subtitle="Enlistment"
                tip="How to play?"
                :tipHandler="resetTour"
              />
            </div>
            <div class="form-container mt-3 mb-2">
              <v-skeleton-loader type="text, button" v-if="isLoadingBalances" />
              <div class="enlist-form" v-else>
                <div class="enlist-title">
                  {{ troop.displayName }}
                </div>
                <template v-if="!isEnlistedWithAnotherRace">
                  <v-text-field
                    id="troops"
                    outlined
                    v-bind="currencyConfig"
                    v-model="stakedTroop"
                    :error="!validateAmount(stakedTroop, troopBalance)"
                    :disabled="isEnlistedWithRace"
                    readonly
                  />

                  <div class="enlist-title">
                    {{ weapon.title }}
                  </div>
                  <v-currency-field
                    id="weapons"
                    color="#FFF"
                    outlined
                    :hint="`Available: ${weaponBalance - totalStakedWeapon}`"
                    persistent-hint
                    v-bind="currencyConfig"
                    v-model="stakedWeapon"
                    :error="
                      stakedWeapon > stakedTroop ||
                        !validateAmount(stakedWeapon, weaponBalance)
                    "
                    :disabled="isEnlistedWithRace || isWarOver"
                  />
                  <div
                    class="amount-error"
                    v-if="!validateAmount(stakedTroop, troopBalance)"
                  >
                    - You don't have the amount of {{ stakedTroop }}
                    {{ troop.name }} to fill the formation. How about acquiring
                    some more?
                  </div>
                  <div
                    class="amount-error"
                    v-if="!validateAmount(stakedWeapon, weaponBalance)"
                  >
                    - You don't have the amount of {{ stakedWeapon }}
                    {{ weapon.title }} to enlist. How about acquiring some more?
                  </div>
                  <div class="amount-error" v-if="stakedWeapon > stakedTroop">
                    - The weapon qty can't be greater than troops units.
                  </div>
                </template>
                <div class="text-alert" v-else>
                  You already enlisted with another race at this war, so you are
                  in readonly mode.
                </div>
              </div>
            </div>
            <div class="amount-container">
              <div class="amount-title">
                Units you have:
              </div>
              <v-skeleton-loader type="text, button" v-if="isLoadingBalances" />
              <div class="amount" v-else>
                <Amount
                  :amount="troopBalance"
                  :symbol="troop.name"
                  compact
                  formatted
                />
              </div>
            </div>
            <Button class="mt-2" type="wprimary" icon="blue-chest-closed" text="Buy Refill Pack" :handleClick="goBuyPack" />
            <div class="status-container mt-2">
              <div class="troop-status mr-2">
                <div class="d-flex align-center">
                  <div class="icon-container mr-1">
                    <div class="status-icon">
                      <img src="/images/icons/attack.png" alt="Attack points" />
                    </div>
                    <div class="status-description">Strength</div>
                  </div>
                  <div class="force-text">
                    {{ troop.strength }}
                  </div>
                </div>
              </div>
              <div class="troop-status">
                <div class="d-flex align-center">
                  <div class="icon-container mr-1">
                    <div class="status-icon">
                      <img
                        src="/images/icons/defense.png"
                        alt="Defense points"
                      />
                    </div>
                    <div class="status-description">Defense</div>
                  </div>
                  <div class="force-text">
                    {{ troop.defense }}
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col md="4">
            <div class="troop-viewport" id="troop-view">
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
          <v-col md="4" class="enlistment-data-container">
            <template v-if="!isEnlistedWithAnotherRace">
              <div class="enlistment-title d-flex">
                <img
                  class="mr-1"
                  height="32"
                  width="32"
                  src="/images/icons/battle-shield.png"
                  alt="Enlistment resume"
                />
                <span v-if="isWarOver">Enlistment period is over</span>
                <span v-else-if="!isEnlistedWithRace"
                  >Select your formation</span
                >
                <span v-else>Your enlistment</span>
              </div>
              <v-select
                id="formation"
                :items="formationOptions"
                label="Select"
                single-line
                :value="formation"
                @change="handleFormationChange"
                :loading="isLoadingWar || isLoadingBalances"
                :disabled="
                  isLoadingWar ||
                    isLoadingBalances ||
                    isEnlistedWithRace ||
                    isWarOver
                "
              ></v-select>
            </template>
            <div class="troop-list mt-2" id="enlistment-resume">
              <div
                class="d-flex align-center mb-1"
                v-for="(unit, index) in unitsFromRace"
                :key="unit.name"
              >
                <div
                  class="status-icon mr-1 clickable"
                  @click="() => goToUnit(index)"
                >
                  <img
                    :src="`/images/icons/${unit.name}.png`"
                    alt="Attack points"
                  />
                </div>
                <div class="unit-info">
                  <div :class="['unit-name', 'mb-1']">
                    {{ unit.displayName }}
                  </div>
                  <div class="amount">
                    <span
                      :class="[
                        'd-flex',
                        'align-end',
                        !validateAmount(unit.amount, getTroopBalance(unit.name))
                          ? 'error-color'
                          : '',
                      ]"
                      v-if="unit.amount"
                    >
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
                  <div class="amount">
                    <span
                      :class="[
                        'd-flex',
                        'align-end',
                        !validateAmount(
                          getTotalStakedWeapon(unit.tier),
                          getWeaponBalance(getWeaponByTier(unit.tier).id)
                        ) || !validateAmount(unit.weaponAmount, unit.amount)
                          ? 'error-color'
                          : '',
                      ]"
                    >
                      <TripleIcon
                        class="mr-1"
                        :name="getWeaponByTier(unit.tier).icon"
                        size="16px"
                      />
                      <Amount
                        :amount="unit.weaponAmount"
                        decimals="0"
                        formatted
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="war-rules mb-1"
                v-if="
                  !userEnlistedRace &&
                    phase === 'enlistment' &&
                    isEnlistmentValid()
                "
              >
                <p>
                  What will happen when you send troops to War:<br />
                  - You won’t be able to bring them back home until the war is
                  over,
                  <br />
                  - The majority of them might die in the war, even if you win
                  the battle, <br />
                  - When the war is over, you’ll have 48 hours to claim your
                  prizes.
                  <br />
                </p>
                <v-checkbox
                  v-model="agreement"
                  class="stake-modal-input ma-0 pa-0"
                  color="primary"
                >
                  <template v-slot:label>
                    <div class="text-white">
                      I have read and agreed with the war rules
                    </div>
                  </template>
                </v-checkbox>
              </div>
              <Button
                id="enlist-button"
                class="mt-1"
                type="wprimary"
                :text="enlistButtonText"
                isBlock
                :handleClick="goToMonsterBattle"
                :disabled="isEnlistButtonDisabled"
              />
              <div
                class="text-center mt-1"
                v-if="!getRaceEnlisted && formation && !isEnlistmentValid()"
              >
                Please, check your troops and equipments balance to enlist.
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-container>
    <v-tour
      name="enlistment"
      :steps="steps"
      :callbacks="callbacks"
      :options="{ highlight: true, enabledButtons: { buttonSkip: tourSkip } }"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
import { ENLISTMENT_OPTIONS } from "@/data/Enlistment";
import { MONSTERS } from "@/data/Monsters";
import { RACE_DESCRIPTION } from "@/data/Races";

import GameText from "@/lib/components/ui/Utils/GameText";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import TripleIcon from "@/lib/components/ui/TripleIcon";
import ForceMeter from "@/lib/components/ui/ForceMeter";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: {
    Title,
    wButton,
    GameText,
    Button,
    TripleIcon,
    ForceMeter,
    Amount,
  },
  computed: {
    ...mapState({
      war: (state) => state.war.war,
      formation: (state) => state.enlistment.formation,
      currentEnlistment: (state) => state.enlistment.raceName,
      isLoadingBalances: (state) => state.user.isLoadingBalances,
      balances: (state) => state.user.balances,
      isLoadingWar: (state) => state.war.isLoading,
      phase: (state) => state.war.phase,
      track: (state) => state.music.track,
      formationConfig: (state) => state.war?.war?.formationConfig || null,
    }),
    ...mapGetters({
      getAllFromRace: "enlistment/byRace",
      getByNameOrAddress: "enlistment/getByNameOrAddress",
      getWeaponByTier: "enlistment/getWeaponByTier",
      account: "user/account",
      getRaceData: "war/getRaceData",
      userEnlistedRace: "war/userEnlistedRace",
      getRaceEnlisted: "war/getRaceEnlisted",
      getTotalStakedWeapon: "enlistment/totalStakedWeapon",
      isWarOver: "war/isWarOver",
    }),
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
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
    formationOptions() {
      if (!this.formationConfig) {
        return [];
      }
      return Object.keys(this.formationConfig).map((key) => {
        const text = key[0].toUpperCase() + key.substring(1, key.length);
        return {
          text: text,
          value: key,
        };
      });
    },
    troopBalance() {
      return this.getTroopBalance(this.troop.name);
    },
    weaponBalance() {
      return this.getWeaponBalance(this.weapon?.id);
    },
    raceData() {
      return this.getRaceData(Number(this.$route.params.raceId));
    },
    totalAvailable() {
      return this.raceData?.data?.totalAvailable || 0;
    },
    totalEnlistment() {
      return this.raceData?.data?.totalEnlistment || 0;
    },
    totalSlots() {
      return this.raceData?.data?.totalSlots || 0;
    },
    isEnlistedWithAnotherRace() {
      return (
        this.getRaceEnlisted &&
        this.getRaceEnlisted !==
          RACE_DESCRIPTION[Number(this.$route.params.raceId)]
      );
    },
    isEnlistedWithRace() {
      return (
        this.getRaceEnlisted ===
        RACE_DESCRIPTION[Number(this.$route.params.raceId)]
      );
    },
    enlistButtonText() {
      if (this.phase === "not-started") {
        return "Not started";
      } else if (this.phase !== "enlistment" || this.userEnlistedRace) {
        return `View slots (${this.totalEnlistment}/${this.totalSlots})`;
      } else {
        return `Choose a slot (${this.totalEnlistment}/${this.totalSlots})`;
      }
    },
    isEnlistButtonDisabled() {
      return (
        this.phase === "not-started" ||
        (!this.userEnlistedRace &&
          this.phase === "enlistment" &&
          (!this.isEnlistmentValid() || !this.agreement))
      );
    },

    stakedTroop: {
      get() {
        return this.troop.amount;
      },
      set(value) {
        this.stakeTroop({ amount: value, troopName: this.troop.name });
      },
    },

    stakedWeapon: {
      get() {
        return this.troop.weaponAmount;
      },
      set(value) {
        this.stakeWeapon({
          troopName: this.troop.name,
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
      agreement: false,
      showTour: true,
      tourSkip: false,
      steps: [
        {
          target: "#troop-view",
          header: {
            title: "Assemble your troops and enlist!",
          },
          content: `Here you see your troops and can go back and forth.`,
        },
        {
          target: "#formation",
          content:
            "You choose the formation to be enlisted in this field. You cannot set troop amounts without changing the formation.",
        },
        {
          target: "#troops",
          content: "Here you see the troop’s amount",
        },
        {
          target: "#weapons",
          content:
            "...and this is the place where you pair weapons with each troop. If you have weapons available.",
        },
        {
          target: "#enlistment-resume",
          content:
            "This list shows your complete enlistment - with formation amounts and weapons staked.",
          params: {
            placement: "left",
          },
        },
        {
          target: "#enlist-button",
          content:
            "When you finish your troops assembly and are ready to go to War, this button will take you to slot selection.",
        },
      ],
      callbacks: {
        onFinish: this.handleTourDone,
        onSkip: this.handleTourDone,
        onStop: this.handleTourDone,
      },
    };
  },
  methods: {
    ...mapActions({
      getWar: "war/getWar",
      stakeTroop: "enlistment/stakeTroop",
      stakeWeapon: "enlistment/stakeWeapon",
      changeFormation: "enlistment/changeFormation",
      clearEnlistment: "enlistment/clearEnlistment",
      setupMusic: "music/setupMusic",
      clearMusic: "music/clearMusic",
    }),
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToWar() {
      this.$router.push({
        path: `/war`,
        query: { warId: this.$route.query.warId },
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
        path: `/war/enlistment/${this.$route.params.raceId}/battle`,
        query: { warId: this.$route.query.warId },
      });
    },
    getUnitName(position) {
      if (position > this.unitsFromRace.length - 1) {
        return this.unitsFromRace[0].name;
      } else if (position < 0) {
        return this.unitsFromRace[this.unitsFromRace.length - 1].name;
      }
      return this.unitsFromRace[position].name;
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
      this.changeFormation({ raceName: this.troop.raceDesc, value });
    },
    getTroopBalance(troopName) {
      return this.balances?.[troopName] || 0;
    },
    getWeaponBalance(weaponId) {
      return this.balances?.[`GameItem${weaponId}`] || 0;
    },
    isEnlistmentValid() {
      let isValid = true;
      if (!this.formation) {
        isValid = false;
      }
      for (let unit of this.unitsFromRace) {
        const stakedAmount = this.getTotalStakedWeapon(unit.tier);
        const weaponBalance = this.getWeaponBalance(
          this.getWeaponByTier(unit.tier).id
        );
        if (
          !this.validateAmount(unit.amount, this.getTroopBalance(unit.name)) ||
          !this.validateAmount(stakedAmount, weaponBalance) ||
          !this.validateAmount(unit.weaponAmount, unit.amount)
        ) {
          isValid = false;
        }
      }
      return isValid;
    },
    async fetchData() {
      if (this.account && !this.isLoadingWar) {
        await this.getWar(this.$route.query.warId);
        if (this.showTour) {
          this.$tours["enlistment"].start();
        }
      }
    },
    validateAmount(amount, balance) {
      let isValid = true;
      if (balance < amount && !this.isEnlistedWithRace) {
        isValid = false;
      }
      return isValid;
    },
    handleTourDone() {
      if (this.showTour) {
        window.localStorage.setItem("enlistment-tour", "done");
        this.showTour = false;
      }
    },
    checkTour() {
      const tour = window.localStorage.getItem("enlistment-tour");
      if (tour) {
        this.showTour = false;
      }
    },
    resetTour() {
      this.tourSkip = true;
      this.showTour = true;
      this.$tours["enlistment"].start();
    },
    goBuyPack() {
      const race = RACE_DESCRIPTION[Number(this.$route.params.raceId)];
      this.$router.push({ path: `/packs`, query: {race}});
    }
  },
  watch: {
    isConnected() {
      this.fetchData();
    },
    account() {
      if (!this.track) {
        this.setupMusic({ musicKey: "WAR", isLoop: true });
      }
      this.clearEnlistment();
      this.fetchData();
    },
  },
  async mounted() {
    this.setHeader(false);
    this.checkTour();
    this.troopSelected = this.unitsFromRace[0].name;
    this.fetchData();
    if (
      this.currentEnlistment !==
      RACE_DESCRIPTION[Number(this.$route.params.raceId)]
    ) {
      this.clearEnlistment();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    if (!to.path.includes("/war")) {
      this.clearMusic();
    }
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
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 425px) {
    margin-top: 42px;
    flex-direction: row;
  }
}
.troop-status {
  margin-top: 8px;
}
.status-icon {
  height: 60px;
  width: 60px;
  background-image: url("/images/icons/slot.png");
  display: flex;
  justify-content: center;
  align-items: center;
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

.force-text {
  font-size: 32px;
  font-weight: bold;
}

.error-color {
  color: #ffb800;
}
.amount-error {
  @extend .error-color;
  font-size: 12px;
}

.text-alert {
  color: yellow;
  font-size: 12px;
}

.war-rules {
  font-size: 12px;
}

.text-white {
  color: #fff;
}

.status-description {
  text-align: center;
  font-size: 12px;
}

.enlistment-data-container {
  margin-bottom: 102px;
  @media screen and (min-width: 1024px) {
    margin-bottom: 0;
  }
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

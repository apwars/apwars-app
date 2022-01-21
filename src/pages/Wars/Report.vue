<template>
  <div class="color-bg">
    <div class="background">
      <v-container v-if="account">
        <v-row dense no-gutters>
          <v-col>
            <Button
              icon="arrow-back"
              type="wtertiary"
              text="Back to war page"
              :handleClick="backToWar"
              noPadding
            />
          </v-col>
        </v-row>
        <v-row dense no-gutters v-if="war">
          <v-col col="12" sm="4">
            <Title :text="war.name" subtitle="Report" />
          </v-col>
          <v-col col="12" sm="4" offset-sm="4">
            <Button
              v-if="phase === 'claim' && report && !report.bringHome"
              type="wprimary"
              icon="swords"
              :handleClick="bringhome"
              :disabled="isLoadingBringhome"
            >
              Claim prizes and bring home
              <v-progress-circular
                class="ml-1"
                indeterminate
                size="16"
                width="2"
                v-if="isLoadingBringhome"
              />
            </Button>
            <div class="unit-name" v-if="report && report.bringHome">
              Your prizes are claimed!
            </div>
          </v-col>
        </v-row>

        <div ref="raceSelect" class="race-select">
          <div
            class="race-container"
            :class="[selectedRace === 4 ? 'is-selected' : '']"
          >
            <h2 class="text-center mb-1">
              Elves
              <span
                class="arrow-down"
                v-if="userEnlistedRace === 'Elves'"
              ></span>
            </h2>
            <v-img
              class="race-image"
              src="/images/troops/wferal-spirit-portrait.png"
              alt="Elves"
              @click="() => handleRaceChange(4)"
            >
            </v-img>
          </div>

          <div
            class="race-container"
            :class="[selectedRace === 1 ? 'is-selected' : '']"
          >
            <h2 class="text-center mb-1">
              Humans
              <span
                class="arrow-down"
                v-if="userEnlistedRace === 'Humans'"
              ></span>
            </h2>
            <v-img
              class="race-image"
              src="/images/troops/wwizard-portrait.png"
              alt="Humans"
              @click="() => handleRaceChange(1)"
            >
            </v-img>
          </div>

          <img width="46" src="/images/icons/swords.png" />

          <div
            class="race-container "
            :class="[selectedRace === 2 ? 'is-selected' : '']"
          >
            <h2 class="text-center mb-1">
              Orcs
              <span
                class="arrow-down"
                v-if="userEnlistedRace === 'Orcs'"
              ></span>
            </h2>
            <v-img
              class="race-image invert-image"
              src="/images/troops/wshaman-portrait.png"
              alt="Orcs"
              @click="() => handleRaceChange(2)"
            >
            </v-img>
          </div>

          <div
            ref="raceSelect"
            class="race-container"
            :class="[selectedRace === 3 ? 'is-selected' : '']"
          >
            <h2 class="text-center mb-1">
              Undead
              <span
                class="arrow-down"
                v-if="userEnlistedRace === 'Undead'"
              ></span>
            </h2>
            <v-img
              class="race-image invert-image"
              src="/images/troops/wwitch-portrait.png"
              alt="Undead"
              @click="() => handleRaceChange(3)"
            >
            </v-img>
          </div>
        </div>

        <v-row v-if="isLoading">
          <v-col>
            <v-skeleton-loader type="image" height="112" />
          </v-col>
          <v-col>
            <v-skeleton-loader type="paragraph" height="112" />
          </v-col>
          <v-col>
            <v-skeleton-loader type="image" height="112" />
          </v-col>
          <v-col>
            <v-skeleton-loader type="paragraph" height="112" />
          </v-col>
        </v-row>
        <template v-else-if="hasSoldiers">
          <v-row>
            <v-col cols="12" md="8">
              <v-row>
                <v-col
                  v-for="unit in troopList"
                  :key="unit.name"
                  cols="12"
                  sm="6"
                  md="6"
                  class="d-flex px-0"
                >
                  <div class="image-container">
                    <img
                      :src="
                        `/images/troops/${unit.name.toLowerCase()}-portrait.png`
                      "
                      :alt="unit.name"
                    />
                  </div>

                  <div class="ml-1">
                    <span class="d-block unit-name">{{
                      unit.displayName
                    }}</span>
                    <template
                      v-if="
                        getTroopAmount(unit.name, 'accountReport', 'enlisted')
                      "
                    >
                      <span class="d-block mt-1"
                        >Enlisted units:
                        <Amount
                          :amount="
                            getTroopAmount(
                              unit.name,
                              'accountReport',
                              'enlisted'
                            )
                          "
                          decimals="1"
                          :ignoreThousand="true"
                          compact
                          formatted
                      /></span>
                      <template v-if="isWarOver">
                        <span class="d-block"
                          >Deads units:
                          <Amount
                            :amount="
                              getTroopAmount(unit.name, 'accountReport', 'dead')
                            "
                            decimals="1"
                            :ignoreThousand="true"
                            compact
                            formatted
                        /></span>
                        <span class="d-block mb-2"
                          >Survivors:
                          <Amount
                            :amount="
                              getTroopAmount(
                                unit.name,
                                'accountReport',
                                'survivors'
                              )
                            "
                            decimals="1"
                            :ignoreThousand="true"
                            compact
                            formatted
                        /></span>
                      </template>
                    </template>
                    <span v-else>Not staked</span>
                    <span class="d-block text-primary"
                      >Global Enlisted Units:
                      <Amount
                        :amount="
                          getTroopAmount(unit.name, 'globalReport', 'enlisted')
                        "
                        decimals="1"
                        :ignoreThousand="true"
                        compact
                        formatted
                    /></span>
                    <template v-if="isWarOver">
                      <span class="d-block text-primary"
                        >Global Dead Units:
                        <Amount
                          :amount="
                            getTroopAmount(unit.name, 'globalReport', 'dead')
                          "
                          compact
                          decimals="1"
                          :ignoreThousand="true"
                          formatted
                      /></span>
                      <span class="d-block text-primary"
                        >Global Survivors:
                        <Amount
                          :amount="
                            getTroopAmount(
                              unit.name,
                              'globalReport',
                              'survivors'
                            )
                          "
                          decimals="1"
                          :ignoreThousand="true"
                          compact
                          formatted
                      /></span>
                    </template>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pl-3">
                <v-col
                  v-for="weapon in weapons"
                  :key="weapon.name"
                  cols="6"
                  md="3"
                  class="px-0"
                >
                  <div class="d-flex">
                    <img
                      :width="$vuetify.breakpoint.xs ? '50' : '60'"
                      :height="$vuetify.breakpoint.xs ? '50' : '60'"
                      :src="`/images/weapons/${weapon.icon}.png`"
                    />
                    <div style="font-size: 14px">
                      <span class="d-block bold">{{ weapon.title }}</span>
                      <template
                        v-if="
                          Object.keys(report.gameItems.accountReport).length > 0
                        "
                      >
                        <span class="d-block"
                          >My Qty:
                          <Amount
                            :amount="
                              getWeaponAmount(
                                weapon.id,
                                'accountReport',
                                'amount'
                              )
                            "
                            decimals="1"
                            :ignoreThousand="true"
                            compact
                            formatted
                        /></span>
                        <template v-if="isWarOver">
                          <span class="d-block"
                            >Recovered:
                            <Amount
                              :amount="
                                getWeaponAmount(
                                  weapon.id,
                                  'accountReport',
                                  'recovered'
                                )
                              "
                              decimals="1"
                              :ignoreThousand="true"
                              compact
                              formatted
                          /></span>
                          <span class="d-block"
                            >Destroyed:
                            <Amount
                              :amount="
                                getWeaponAmount(
                                  weapon.id,
                                  'accountReport',
                                  'destroyed'
                                )
                              "
                              decimals="1"
                              :ignoreThousand="true"
                              compact
                              formatted
                          /></span>
                        </template>
                      </template>
                      <span v-else>
                        Not staked
                      </span>
                      <span class="d-block text-primary"
                        >Global Qty:
                        <Amount
                          :amount="
                            getWeaponAmount(weapon.id, 'globalReport', 'amount')
                          "
                          decimals="1"
                          :ignoreThousand="true"
                          compact
                          formatted
                        />
                      </span>
                      <template v-if="isWarOver">
                        <span class="d-block text-primary"
                          >Recovered:
                          <Amount
                            :amount="
                              getWeaponAmount(
                                weapon.id,
                                'globalReport',
                                'recovered'
                              )
                            "
                            decimals="1"
                            :ignoreThousand="true"
                            compact
                            formatted
                        /></span>
                        <span class="d-block text-primary"
                          >Destroyed:
                          <Amount
                            :amount="
                              getWeaponAmount(
                                weapon.id,
                                'globalReport',
                                'destroyed'
                              )
                            "
                            decimals="1"
                            :ignoreThousand="true"
                            compact
                            formatted
                        /></span>
                      </template>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              class="d-flex flex-column align-center mb-8"
              cols="12"
              md="4"
            >
              <div class="monster-viewport">
                <v-img
                  :src="`/images/monsters/${monsterData.id}.webp`"
                  :lazy-src="`/images/monsters/${monsterData.id}.webp`"
                  :alt="monsterData.name"
                  :class="[monsterData.id === 4 ? 'invert-image' : '']"
                />
              </div>
              <div class="monster-name text-center mb-2">
                {{ monsterData.name }}
              </div>
              <div class="d-flex align-items-center justify-center mb-1">
                <div class="reward-description text-center pr-2">
                  Monster Prize Pool
                </div>
                <div class="treasure-progress">
                  <div class="text">
                    <Amount :amount="monsterPrizeValue" compact formatted />
                  </div>
                  <div class="treasure">
                    <v-img src="/images/battle/treasure.png" />
                  </div>
                </div>
              </div>
              <div class="d-flex align-center mb-1" v-if="hasPrizes">
                <img
                  width="24"
                  class="mr-1"
                  :src="
                    `/images/${report.prizes.monster.prize.toLowerCase()}.png`
                  "
                />
                <Amount
                  :amount="report.prizes.monster.amount"
                  :symbol="report.prizes.monster.prize"
                  formatted
                />
                <div class="ml-1">Earned</div>
              </div>
              <Button
                type="wprimary"
                text="Go to the Monster Battle"
                :handleClick="goToMonsterBattle"
              />
            </v-col>
          </v-row>

          <v-row v-if="hasPrizes">
            <v-col>
              <div class="rewards-title">Prize</div>
              <div class="d-flex align-center">
                <img
                  width="48"
                  :src="`/images/${report.prizes.war.prize.toLowerCase()}.png`"
                />
                <span class="rewards-title"
                  ><Amount
                    :amount="report.prizes.war.amount"
                    :symbol="report.prizes.war.prize"
                    formatted
                /></span>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="hasPrizes">
            <v-col>
              <div class="rewards-title">Rewarded slots</div>
              <div class="mt-2">
                <div
                  class="spot-info"
                  v-for="reward in report.rewards"
                  :key="`${reward.slot.x}-${reward.slot.y}`"
                >
                  <div class="unit-name">
                    {{ reward.slot.x }}, {{ reward.slot.y }}
                  </div>
                  <div class="winner">
                    <span v-if="reward.winner === '0x0'">No Winner</span
                    ><span v-else>Winner: {{ reward.winner }}</span>
                    <span class="unit-name">{{
                      account.toLowerCase() === reward.winner ? " (YOU)" : ""
                    }}</span>
                  </div>
                  <div class="rewards-display mt-1">
                    <Reward
                      class="reward-container"
                      v-for="prize in reward.prizes"
                      :key="prize.prize"
                      :prize="prize.prize"
                      :type="prize.type"
                      :amount="prize.amount"
                    />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </template>
        <div class="no-data" v-else-if="isWarNotStarted">
          This war has not started yet, come back later.
        </div>
        <div class="no-data" v-else>
          There is no data for this race yet, come back later.
        </div>
        <v-row v-if="transfers.length">
          <v-col>
            <div class="rewards-title">Transfers</div>
            <template>
              <div class="search-container">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </div>
              <v-data-table
                :headers="headers"
                :items="transfers"
                :search="search"
              >
                <template v-slot:item.image="{ item }">
                  <img
                    :src="getImage(item.token)"
                    height="32"
                    :alt="item.token"
                  />
                </template>
                <template v-slot:item.token="{ item }">
                  {{ getName(item.token) }}
                </template>
                <template v-slot:item.account="{ item }">
                  {{ compactWallet(item.account) }}
                </template>
                <template v-slot:item.data.to="{ item }">
                  {{ compactWallet(item.data.to) }}
                </template>
                <template v-slot:item.createdOn="{ item }">
                  {{ new Date(item.createdOn).toLocaleString("en-US") }}
                </template>
              </v-data-table>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
import WarsController from "@/controller/WarsController";

import Title from "@/lib/components/ui/Title";
import Button from "@/lib/components/ui/Buttons/Button";
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Countdown from "@/lib/components/ui/Utils/Countdown";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";
import Amount from "@/lib/components/ui/Utils/Amount";
import Reward from "@/lib/components/ui/Reward";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import { getCollectibleById } from "@/data/Collectibles";

import { RACES, RACE_DESCRIPTION, ENLISTMENT_OPTIONS } from "@/data/Races";
import { MONSTERS } from "@/data/Monsters";

export default {
  components: {
    Title,
    Button,
    wGOLDButton,
    wButton,
    Countdown,
    ListUnits,
    Amount,
    Reward,
  },

  data() {
    return {
      isLoading: false,
      isLoadingBringhome: false,
      selectedRace: 1,
      report: null,
      isLoadingTransfers: false,
      transfers: [],
      search: "",
      headers: [
        { sortable: false, text: "", value: "image", width: '36px', filterable: false },
        { sortable: false, text: "Amount", value: "amount", align: "center", width: '112px', filterable: false },
        { sortable: false, text: "Game Item", value: "token", filterable: true },
        {
          text: "Account",
          align: "start",
          sortable: false,
          value: "account",
          filterable: true
        },
        { sortable: false, text: "To", value: "data.to", filterable: true },
        { text: "Date", value: "createdOn" },
      ],
    };
  },

  created() {
    this.setHeader(false);
  },

  mounted() {
    if (this.account) {
      this.fetchWar();
      this.loadData();
    }
  },

  updated() {
    if (this.war) {
      this.$refs.raceSelect.scrollLeft =
        this.$refs.raceSelect.scrollWidth / 2 - 125;
    }
  },

  computed: {
    ...mapGetters({
      getAllFromRace: "enlistment/byRace",
      userEnlistedRace: "war/userEnlistedRace",
      isWarOver: "war/isWarOver",
      getRaceMonsterPrizeValue: "war/getRaceMonsterPrizeValue",
    }),
    ...mapState({
      war: (state) => state.war.war,
      phase: (state) => state.war.phase,
      track: (state) => state.music.track,
      weapons: (state) => state.enlistment.weapons,
    }),

    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },

    troopList() {
      return this.getAllFromRace(this.selectedRace);
    },
    enlistmentOptions() {
      return ENLISTMENT_OPTIONS.find(
        (eo) => eo.id === Number(this.selectedRace)
      );
    },
    monsterData() {
      if (!this.enlistmentOptions) {
        return null;
      }
      return MONSTERS.find((m) => m.id === this.enlistmentOptions.monsterId);
    },

    hasSoldiers() {
      return (
        this.report?.soldiers && Object.keys(this.report.soldiers).length > 0
      );
    },

    isWarNotStarted() {
      return this.phase === "not-started";
    },

    hasPrizes() {
      return this.isWarOver && Object.keys(this.report.prizes).length > 0;
    },

    monsterPrizeValue() {
      return this.getRaceMonsterPrizeValue(RACE_DESCRIPTION[this.selectedRace]);
    },
  },

  watch: {
    account() {
      if (!this.track) {
        this.setupMusic({ musicKey: "WAR", isLoop: true });
      }
      this.fetchWar();
      this.loadData();
    },
  },

  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    if (!to.path.includes("/war")) {
      this.clearMusic();
    }
    next();
  },

  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    ...mapActions({
      getWar: "war/getWar",
      setupMusic: "music/setupMusic",
      clearMusic: "music/clearMusic",
    }),

    async loadData() {
      if (!this.account || !this.war || this.isLoading) {
        return;
      }
      try {
        this.isLoading = true;
        const controller = new WarsController();
        const warId = this.war.id;
        const raceName = RACE_DESCRIPTION[this.selectedRace];
        const report = await controller.getReport(
          warId,
          raceName,
          this.account
        );
        this.report = report;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async loadTransfers() {
      try {
        this.isLoadingTransfers = true;
        const controller = new WarsController();
        const warId = this.war.id;
        const transfers = await controller.getTransfers(warId);
        this.transfers = transfers;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingTransfers = false;
      }
    },

    async handleRaceChange(selectedRace) {
      if (this.selectedRace === selectedRace) {
        return;
      }
      this.selectedRace = selectedRace;
      if (!this.isWarNotStarted) {
        await this.loadData();
      }
    },

    backToWar() {
      this.$router.push({
        path: `/war`,
        query: { warId: this.$route.query.warId },
      });
    },

    goToEnlistment(raceId) {
      this.$router.push({
        path: `/war/enlistment/${raceId}`,
        query: { warId: this.$route.query.warId },
      });
    },

    goToMonsterBattle() {
      this.$router.push({
        path: `/war/enlistment/${this.selectedRace}/battle`,
        query: { warId: this.$route.query.warId },
      });
    },

    getTroopAmount(troopName, report, info) {
      if (!this.report || !this.report.soldiers[troopName][report]) {
        return 0;
      }
      return Math.round(this.report.soldiers[troopName][report][info], 0);
    },

    getWeaponAmount(weaponId, report, info) {
      const weapons =
        this.report.gameItems[report] &&
        this.report.gameItems[report].filter((w) => w.id === weaponId);
      if (!weapons?.length > 0) {
        return 0;
      }
      const total = weapons.reduce((total, w) => (total += w[info]), 0);
      return total;
    },

    async bringhome() {
      try {
        this.isLoadingBringhome = true;
        const controller = new WarsController();
        const warId = this.war.id;
        await controller.bringhome(warId, this.account);
        await this.loadData();
        ToastSnackbar.success("Your troops and prizes are safe at Home");
      } catch (error) {
        ToastSnackbar.error(
          "Something went wrong while trying to bring troops and prizes Home, try again later."
        );
        console.error(error);
      } finally {
        this.isLoadingBringhome = false;
      }
    },

    async fetchWar() {
      await this.getWar(this.$route.query.warId);
      if (this.userEnlistedRace) {
        this.handleRaceChange(RACES[this.userEnlistedRace.toUpperCase()]);
      }
      await this.loadTransfers();
    },

    compactWallet(wallet) {
      if (!wallet) {
        return "";
      }
      if (wallet.includes("war-id")) {
        return "War Off-chain";
      }
      const end = wallet.length;
      return `${wallet.substring(0, 5)}...${wallet.substring(end - 3, end)}`;
    },

    getName(token) {
      if (token.includes("GameItem")) {
        const id = Number(token.replace(/\D/g, ""));
        return getCollectibleById(id).title;
      } else {
        return token;
      }
    },

    getImage(token) {
      if (token.includes("GameItem")) {
        const id = Number(token.replace(/\D/g, ""));
        return `/images/icons/${getCollectibleById(id).icon}.png`;
      } else {
        return `/images/icons/${token}-coin.png`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.color-bg {
  height: 100%;
  width: 100%;
  background-color: #000000;
}
.background {
  height: 40%;
  width: 100%;
  background-image: url("/images/bg-home.jpg");
  background-size: cover;
  background-position: center;
}
.gradient {
  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

.isLoading {
  opacity: 0;
}

.loading {
  display: none;
}

.no-data {
  width: 100%;
  text-align: center;
}

.stats {
  font-weight: bold;
  font-size: 28px;
}
.qty {
  color: #ffb800;
  font-weight: bold;
  font-size: 16px;
}

.rewards-display {
  display: flex;
  padding-top: 8px;
}

.disabled {
  filter: grayscale(100%);
}

@media only screen and (max-width: 1920px) {
  .qty {
    font-size: 14px;
  }
}

@media only screen and (max-width: 600px) {
  .gradient {
    display: none;
  }
}

.invert-image {
  transform: scaleX(-1);
}

.race-image {
  cursor: pointer;
}

.race-container {
  filter: grayscale(70%);
  transition: transform 0.3s;
  transition: opacity 0.4s ease-in-out;
  opacity: 0.6;
  &:hover,
  &.is-selected {
    filter: grayscale(0%);
    opacity: 1;
  }
  &.is-selected {
    color: #ffb800;
  }
}

.progress {
  z-index: 2;
  width: 100%;
}

.treasure-progress {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > .text {
    z-index: 1;
    font-weight: bold;
    font-size: 24px;
    text-shadow: 1px 1px 2px #000;
  }
  > .treasure {
    position: absolute;
    z-index: 0;
    top: -21px;
    width: 48px;
  }
}

.text-button {
  text-transform: none !important;
  @media screen and (max-width: 345px) {
    font-size: 13px !important;
  }
}

.race-select {
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  .race-container {
    display: inline-block;
  }
}
.monster-viewport {
  width: 90%;
}
.monster-name {
  font-weight: bold;
  font-size: 24px;
  line-height: 1.2;
}
.image-container {
  height: 190px;
  width: 180px;
  > img {
    width: 100%;
    height: 100%;
  }
}
.unit-name {
  color: #ffb800;
  font-size: 18px;
  font-weight: bold;
}
.rewards-title {
  font-size: 32px;
  font-weight: bold;
}
.bold {
  font-weight: bold;
  font-size: 16px;
}

.arrow-down {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 8px solid yellow;
  animation: flutuation 1s linear forwards infinite;
  transition: all ease;
}

.text-primary {
  color: #ffb800;
}

.search-container {
  width: 100%;
  @media screen and (min-width: 1024px) {
    width: 30%;
  }
}

@keyframes flutuation {
  0% {
    transform: translateY(-50%);
  }

  50% {
    transform: translateY(-80%);
  }

  100% {
    transform: translateY(-50%);
  }
}
</style>

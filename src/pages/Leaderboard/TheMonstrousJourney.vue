<template>
  <div>
    <template v-if="isConnected && !isLoading">
      <div
        class="d-flex flex-column flex-sm-row mb-3 justify-space-around align-center distributed-rewards"
      >
        <div class="distributed-text">
          Distributed <br />
          rewards so far:
        </div>
        <div class="d-flex align-center">
          <img
            class="mr-1"
            height="72px"
            src="/images/wGOLD-winner.png"
            alt="wGOLD"
          />
          <div class="amount-container">
            <div class="distributed-amount">
              <amount
                :amount="distributedRewards.wGOLD.total"
                formatted
                decimals="2"
              />
              <div class="distributed-label">wGOLD</div>
            </div>
            
          </div>
        </div>
        <div class="d-flex align-center">
          <img
            class="mr-1"
            height="72px"
            width="72px"
            src="/images/wSCARS-winner.png"
            alt="wSCARS"
          />
          <div class="amount-container">
            <div class="distributed-amount">
              <amount
                :amount="distributedRewards.wSCARS.total"
                formatted
                decimals="2"
              />
              <div class="distributed-label">wSCARS</div>
            </div>
            
          </div>
        </div>
      </div>

      <Podium :podium="getListPodium" />

      <v-row>
        <v-col cols="12" md="8" offset-md="2" class="d-flex">
          <v-alert class="mx-auto d-inline-block" dense type="info" outlined>
            Prizes are distributed weekly to the top 10. Points are counted from
            Monday to Sunday according to the ISO week date.
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center justify-center">
          <img
            class="mr-1"
            height="35px"
            src="/images/game/trophy.png"
            alt="trophy"
          />
          <div class="page-subtitle">
            Real Time Ranking
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" lg="6">
          <div class="d-flex align-center mb-3">
            <img
              class="mr-1"
              height="30px"
              src="/images/icons/parchment2.png"
              alt="trophy"
            />
            <div class="page-subtitle">
              Daily
            </div>
          </div>

          <div class="leaderboard">
            <div v-if="listDailyLoading">
              <h4 class="text-h4 text-center pt-9">Loading...</h4>
            </div>
            <div v-else-if="listDaily.total === '0'">
              <h5 class="text-h5 text-center pt-9">
                There is no data to display
              </h5>
            </div>
            <div
              v-else
              v-for="(player, index) in listDaily"
              v-bind:key="player.account"
              class="d-flex flex-column flex-md-row align-start align-md-center list-leaderboard mb-2"
            >
              <div class="d-flex d-lg-box">
                <div class="avatar-container">
                <v-avatar
                  class="list-leaderboard-avatar d-flex justify-center"
                  :address="player.account"
                  tooltip
                  :link="true"
                />
                </div>
                <div class="d-flex d-md-none align-center justify-center">
                  <img
                    v-if="index < 3"
                    width="50px"
                    class="ml-1"
                    :src="
                      `/images/game/icon-place-${
                        index === 0 ? 1 : index === 1 ? 0 : 2
                      }.png`
                    "
                    alt="icon-place"
                  />
                  <div v-else class="leaderboard-ranking">#{{ index }}</div>

                  <v-address
                    class="text-center mx-1"
                    :address="player.account"
                    link
                    tooltip
                  >
                  </v-address>
                </div>
              </div>

              <div
                class="list-leaderboard-info d-flex align-center justify-space-around py-1 py-lg-0"
              >
                <img
                  v-if="index < 3 && pageDaily === 1"
                  width="50px"
                  class="d-none d-sm-none d-md-flex ml-1"
                  :src="
                    `/images/game/icon-place-${
                      index === 0 ? 1 : index === 1 ? 0 : 2
                    }.png`
                  "
                  alt="icon-place"
                />
                <div
                  v-else
                  class="d-none d-sm-none d-md-flex leaderboard-ranking"
                >
                  #{{ index + 1 + (pageDaily - 1) * limit }}
                </div>

                <v-address
                  class="d-none d-sm-none d-md-flex text-center mx-1"
                  :address="player.account"
                  link
                  tooltip
                >
                </v-address>

                <div class="d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Score</div>
                  <div>{{ player.score }} pts</div>
                </div>

                <div
                  class="d-flex flex-column justify-center align-center mx-2"
                >
                  <div class="text-subtitle-2 primary--text">Prize</div>
                  <div
                    v-if="
                      prizeDaily[index + (pageDaily - 1) * limit] === undefined
                    "
                  >
                    No Prize
                  </div>
                  <div v-else class="d-flex justify-center align-center">
                    {{ prizeDaily[index + (pageDaily - 1) * limit] }}
                    <img
                      class="ml-1"
                      height="25px"
                      src="/images/wSCARS.png"
                      alt="wSCARS"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex align-center justify-space-between">
            <div
              @click="getListDaily(pageDaily - 1)"
              class="d-flex align-center justify-center previous"
            >
              <v-icon large>
                mdi-chevron-left
              </v-icon>
            </div>
            <div class="pages">
              <div class="text-h6 font-weight-bold">
                {{ pageDaily }}/{{ getTotaPageDaily }}
              </div>
            </div>

            <div
              @click="getListDaily(pageDaily + 1)"
              class="d-flex align-center justify-center next"
            >
              <v-icon large>
                mdi-chevron-right
              </v-icon>
            </div>
          </div>
        </v-col>

        <v-col cols="12" lg="6">
          <div class="d-flex align-center mb-3">
            <img
              class="mr-1"
              height="30px"
              src="/images/icons/parchment2.png"
              alt="trophy"
            />
            <div class="page-subtitle">Weekly - #{{ getNumberWeek }}</div>
            <img
              class="ml-1"
              height="35px"
              src="/images/wGOLD.png"
              alt="wGOLD"
            />
          </div>

          <div class="leaderboard">
            <div v-if="listWeekLoading">
              <h4 class="text-h4 text-center pt-9">Loading...</h4>
            </div>
            <div v-else-if="listWeek.total === '0'">
              <h5 class="text-h5 text-center pt-9">
                There is no data to display
              </h5>
            </div>
            <div
              v-else
              v-for="(player, index) in listWeek"
              v-bind:key="player.account"
              class="d-flex flex-column flex-md-row align-start align-md-center list-leaderboard mb-2"
            >
              <div class="d-flex d-lg-box">
                <div class="avatar-container">
                <v-avatar
                  class="list-leaderboard-avatar d-flex justify-center"
                  :address="player.account"
                  tooltip
                  :isLink="true"
                />
                </div>
                <div class="d-flex d-md-none align-center justify-center">
                  <img
                    v-if="index < 3"
                    width="50px"
                    class="ml-1"
                    :src="
                      `/images/game/icon-place-${
                        index === 0 ? 1 : index === 1 ? 0 : 2
                      }.png`
                    "
                    alt="icon-place"
                  />
                  <div v-else class="leaderboard-ranking">#{{ index }}</div>

                  <v-address
                    class="text-center mx-1"
                    :address="player.account"
                    link
                    tooltip
                  >
                  </v-address>
                </div>
              </div>

              <div
                class="list-leaderboard-info d-flex align-center justify-space-around py-1 py-lg-0"
              >
                <img
                  v-if="index < 3 && pageWeek === 1"
                  width="50px"
                  class="d-none d-sm-none d-md-flex ml-1"
                  :src="
                    `/images/game/icon-place-${
                      index === 0 ? 1 : index === 1 ? 0 : 2
                    }.png`
                  "
                  alt="icon-place"
                />
                <div
                  v-else
                  class="d-none d-sm-none d-md-flex leaderboard-ranking"
                >
                  #{{ index + 1 + (pageWeek - 1) * limit }}
                </div>

                <v-address
                  class="d-none d-sm-none d-md-flex text-center mx-1"
                  :address="player.account"
                  link
                  tooltip
                >
                </v-address>

                <div class="d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Score</div>
                  <div>{{ player.score }} pts</div>
                </div>
                <div
                  class="d-flex flex-column justify-center align-center mx-2"
                >
                  <div class="text-subtitle-2 primary--text">Prize</div>
                  <div
                    v-if="
                      prizeWeekly[index + (pageWeek - 1) * limit] === undefined
                    "
                  >
                    No Prize
                  </div>
                  <div v-else class="d-flex justify-center align-center">
                    {{ prizeWeekly[index + (pageWeek - 1) * limit] }}
                    <img
                      class="ml-1"
                      height="25px"
                      src="/images/wGOLD.png"
                      alt="wGOLD"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer d-flex align-center justify-space-between">
            <div
              @click="getListWeek(pageWeek - 1)"
              class="d-flex align-center justify-center previous"
            >
              <v-icon large>
                mdi-chevron-left
              </v-icon>
            </div>
            <div class="pages">
              <div class="text-h6 font-weight-bold">
                {{ pageWeek }}/{{ getTotaPageWeek }}
              </div>
            </div>

            <div
              @click="getListWeek(pageWeek + 1)"
              class="d-flex align-center justify-center next"
            >
              <v-icon large>
                mdi-chevron-right
              </v-icon>
            </div>
          </div>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <h3 class="text-h3">Loading...</h3>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import VAvatar from "@/lib/components/ui/Utils/VAvatar";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import Medal from "@/lib/components/ui/Utils/Medal";
import Podium from "./Podium";

import moment from "moment";

import LeaderboardController from "@/controller/LeaderboardController";

export default {
  components: {
    Amount,
    wButton,
    VAvatar,
    VAddress,
    Medal,
    Podium,
  },

  data() {
    return {
      isLoading: true,
      prizeDaily: [
        "10000",
        "6000",
        "2000",
        "500",
        "500",
        "500",
        "500",
        "500",
        "500",
        "500",
      ],
      prizeWeekly: [
        "5000",
        "2000",
        "1000",
        "250",
        "250",
        "250",
        "250",
        "250",
        "250",
        "250",
      ],
      limit: 6,
      pageDaily: 1,
      pageWeek: 1,
      pageMonth: 1,
      listDaily: [],
      listWeek: [],
      listMonth: [],
      listPodium: [],
      listGames: [
        {
          id: 0,
          name: "The Monstrous Journey",
          image: "/images/game/the-monstrous-journey.png",
          nameButton: "Play Now",
          actionButton: (url) => {
            this.$router.push(url);
          },
          disabled: false,
        },
        {
          id: 1,
          name: "Arcandia Expansion",
          image: "/images/arcadia-expansion.png",
          nameButton: "Coming soon",
          actionButton: () => {},
          disabled: false,
        },
        {
          id: 2,
          name: "Coming soon",
          image: "",
          nameButton: "Coming soon",
          actionButton: () => {},
          disabled: true,
        },
      ],
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

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

    getTotaPageDaily() {
      if (this.limit > this.listDaily.total) {
        return 1;
      }
      return Math.ceil(this.listDaily.total / this.limit);
    },

    getTotaPageWeek() {
      if (this.limit > this.listWeek.total) {
        return 1;
      }
      return Math.ceil(this.listWeek.total / this.limit);
    },

    getTotaPageMonth() {
      if (this.limit > this.listMonth.total) {
        return 1;
      }
      return Math.ceil(this.listMonth.total / this.limit);
    },
    getNumberWeek() {
      const today = moment();
      return today.isoWeek();
    },

    getLabelWeek() {
      const userLang = navigator.language || navigator.userLanguage;
      let startDateWeek = moment().startOf("isoWeek");
      let endDateWeek = moment().endOf("isoWeek");
      startDateWeek = new Date(startDateWeek.toDate());
      endDateWeek = new Date(endDateWeek.toDate());
      if (startDateWeek.toLocaleString(userLang).search(",") > 0) {
        startDateWeek = startDateWeek.toLocaleString(userLang).split(",")[0];
        endDateWeek = endDateWeek.toLocaleString(userLang).split(",")[0];
      } else {
        startDateWeek = startDateWeek.toLocaleString(userLang).split(" ")[0];
        endDateWeek = endDateWeek.toLocaleString(userLang).split(" ")[0];
      }
      return `${startDateWeek} - ${endDateWeek}`;
    },
    getListPodium() {
      if (!this.listPodium.length) {
        return [];
      }
      const listPodium = this.listPodium.slice(0, 3);
      listPodium[0].position = 1;
      listPodium[0].prizeAmount = 5000;
      listPodium[0].prize = "wGOLD";

      listPodium[1].position = 2;
      listPodium[1].prizeAmount = 3000;
      listPodium[1].prize = "wGOLD";

      listPodium[2].position = 3;
      listPodium[2].prizeAmount = 1000;
      listPodium[2].prize = "wGOLD";

      return listPodium;
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      if (!this.isConnected) {
        return;
      }

      await this.getListWeek(1);
      await this.getListDaily(1);
      await this.getDistributedRewards();
      this.listPodium = this.listWeek.slice(0, 3);

      this.isLoading = false;
    },

    async getDistributedRewards() {
      const leaderboardController = new LeaderboardController();
      this.distributedRewards = await leaderboardController.getLeaderboardDistributedRewards();

      this.distributedRewards.wGOLD = this.distributedRewards.find(
        (_distributed) => _distributed.token === "wGOLD"
      );
      this.distributedRewards.wSCARS = this.distributedRewards.find(
        (_distributed) => _distributed.token === "wSCARS"
      );
    },

    async getListDaily(_page) {
      if (this.listDailyLoading || _page < 1 || _page > this.getTotaPageDaily) {
        return;
      }
      this.pageDaily = _page;
      const leaderboardController = new LeaderboardController();
      this.listDailyLoading = true;
      this.listDaily = await leaderboardController.getDaily(
        "TMJ",
        this.limit,
        this.limit * (_page - 1)
      );
      this.listDailyLoading = false;
    },

    async getListWeek(_page) {
      if (this.listWeekLoading || _page < 1 || _page > this.getTotaPageWeek) {
        return;
      }
      this.pageWeek = _page;
      const leaderboardController = new LeaderboardController();
      this.listWeekLoading = true;
      this.listWeek = await leaderboardController.getWeek(
        "TMJ",
        this.limit,
        this.limit * (_page - 1)
      );
      this.listWeekLoading = false;
    },

    async getListMonth(_page) {
      if (this.listMonthLoading || _page < 1 || _page > this.getTotaPageMonth) {
        return;
      }
      this.pageMonth = _page;
      const leaderboardController = new LeaderboardController();
      this.listMonthLoading = true;
      this.listMonth = await leaderboardController.getMonth(
        "TMJ",
        this.limit,
        this.limit * (_page - 1)
      );
      this.listMonthLoading = false;
    },
  },
};
</script>

<style scoped>
.page-background {
  background-image: url("/images/background/jungle.jpg");
  background-size: cover;
  background-position: top;
  margin-bottom: -200px;
}
.page-title {
  display: inline-block;
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 54px;
  line-height: 73px;
}
.page-title-line {
  background: linear-gradient(180deg, #faff00 0%, #ffb800 100%);
  border-radius: 5px;
  height: 4px;
  width: 80%;
}
.page-subtitle {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 41px;
  background: linear-gradient(180deg, #faff00 0%, #ffb800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gradient {
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

.card-choose-game {
  background: #000000;
  border: 2px solid #ffeebc;
  box-sizing: border-box;
  border-radius: 0px;
}
.card-choose-game-body {
  height: 230px;
}
.card-choose-game >>> .v-icon {
  font-size: 62px;
  color: #c4c4c4;
}
.card-choose-game-button {
  cursor: pointer;
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 38px;
  color: #ffeebc;
  background: #3a2720;
  border-top: 2px solid #ffeebc;
  text-align: center;
  padding: 15px 0px;
}
.card-choose-game.disabled {
  border: 2px solid #c4c4c4;
}
.card-choose-game-button.disabled {
  cursor: not-allowed;
  border-top: 2px solid #c4c4c4;
  background: #c4c4c4;
  color: #2a3238;
}
.card-choose-game-button.disabled:hover {
  background: #c4c4c4;
}
.card-choose-game-button:hover {
  background: #423632;
}

.leaderboard {
  min-height: 500px;
}

.list-leaderboard {
  background: #000000;
  border: 2px solid #ffeebc;
  border-radius: 8px;
}

.list-leaderboard-info {
  width: 100%;
}

.leaderboard-ranking {
  color: #ffeebc;
  width: 50px;
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  justify-content: center;
}

.list-leaderboard-avatar {
  height: 100%;
  width: 100%;
  margin: 0px !important;
  border-radius: 6px 0px 0px 6px;
  border-right: 2px solid #ffeebc;
  overflow: hidden;
}

.previous,
.next {
  cursor: pointer;
  border: 1px solid #fff;
  width: 45px;
  height: 45px;
}

.previous:hover,
.next:hover {
  border: 1px solid #ffeebc;
}

.previous:hover >>> .v-icon,
.next:hover >>> .v-icon {
  color: #ffeebc !important;
}

.isLoading {
  opacity: 0;
}
.loading {
  display: none;
}

.page-title-icon {
  height: 130px;
}

.distributed-rewards {
  background-image: url("/images/background/road-castle.png");
  background-size: cover;
  background-position: center;
  padding: 15px;
  border: 2px solid #ffeebc;
  margin: 5px -24px;
}

.distributed-text {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 31px;
  color: #ffeebc;
}

.distributed-amount {
  font-weight: bold;
  font-size: 36px;
  line-height: 1.2;
  color: #ffeebc;
  display: inline-block;
}

.distributed-label {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #ffeebc;
  text-align: right;
}

.amount-container {
  min-width: 200px;
}

@media only screen and (max-width: 959px) {
  .page-title {
    font-size: 24px;
    line-height: 34px;
  }
  .page-title-icon {
    height: 60px;
  }
  .page-subtitle {
    font-size: 26px;
    line-height: 32px;
  }
  .list-leaderboard-avatar >>> img {
    border-radius: 6px 0px 0px 0px;
  }
  .list-leaderboard-info {
    border-top: 2px solid #ffeebc;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}

.footer {
  margin-bottom: 120px;
}

.avatar-container {
  height: 62px;
  width: 62px;
}
</style>

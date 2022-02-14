<template>
  <div>
    <v-container v-if="isConnected && !isLoading">
      <div
        class="d-flex justify-space-around align-center distributed-rewards"
      >
        <div class="distributed-text">
          Distributed <br />
          rewards so far:
        </div>
        <div class="d-flex align-center">
          <img
            class="mr-1"
            height="90px"
            src="/images/wGOLD-winner.png"
            alt="wGOLD"
          />
          <div>
            <div class="distributed-amount">
              <amount
                v-if="distributedRewards.distributed.wGOLD"
                :amount="distributedRewards.distributed.wGOLD.total"
                formatted
                decimals="2"
              />
            </div>
            <div class="distributed-label">wGOLD</div>
          </div>
        </div>
        <div class="d-flex align-center">
          <img
            class="mr-1"
            height="90px"
            src="/images/wCOURAGE-winner.png"
            alt="wCOURAGE"
          />
          <div>
            <div class="distributed-amount">
              <amount
                v-if="distributedRewards.distributed.wCOURAGE"
                :amount="distributedRewards.distributed.wCOURAGE.total"
                formatted
                decimals="2"
              />
            </div>
            <div class="distributed-label">wCOURAGE</div>
          </div>
        </div>
      </div>

      <Podium :podium="getListPodium" scoreMetric="PU" />

      <div
        class="d-flex mb-3 justify-space-around align-center distributed-rewards"
      >
        <div class="distributed-text">
          <div>
            Distributed in the last war:
          </div>

          <div class="mt-1">
            Participants:
            {{ distributedRewards.totalEnlistmentLastWar }}
          </div>
        </div>

        <div class="d-flex align-center">
          <img
            class="mr-1"
            height="90px"
            src="/images/wGOLD-winner.png"
            alt="wGOLD"
          />
          <div>
            <div class="distributed-amount">
              <amount
                v-if="distributedRewards.distributedLastWar.wGOLD"
                :amount="distributedRewards.distributedLastWar.wGOLD.total"
                formatted
                decimals="2"
              />
            </div>
            <div class="distributed-label">
              Average prize:
              <amount
                v-if="distributedRewards.distributedLastWar.wGOLD"
                :amount="distributedRewards.distributedLastWar.wGOLD.average"
                formatted
                decimals="2"
              />
              wGOLD
            </div>
          </div>
        </div>

        <div class="d-flex align-center">
          <img
            class="mr-1"
            height="90px"
            src="/images/wCOURAGE-winner.png"
            alt="wCOURAGE"
          />
          <div>
            <div class="distributed-amount">
              <amount
                v-if="distributedRewards.distributedLastWar.wCOURAGE"
                :amount="distributedRewards.distributedLastWar.wCOURAGE.total"
                formatted
                decimals="2"
              />
            </div>
            <div class="distributed-label">
              Average prize:
              <amount
                v-if="distributedRewards.distributedLastWar.wCOURAGE"
                :amount="distributedRewards.distributedLastWar.wCOURAGE.average"
                formatted
                decimals="2"
              />
              wCOURAGE
            </div>
          </div>
        </div>
      </div>

      <v-row>
        <v-col cols="12">
          <div class="leaderboard">
            <div v-if="listRankingLoading">
              <h4 class="text-h4 text-center pt-9">Loading...</h4>
            </div>
            <div v-else-if="listRanking.total === '0'">
              <h5 class="text-h5 text-center pt-9">
                There is no data to display
              </h5>
            </div>
            <div
              v-else
              v-for="(player, index) in listRanking"
              v-bind:key="index"
              class="d-flex flex-column flex-md-row align-start align-md-center list-leaderboard mb-2"
            >
              <div class="d-flex d-lg-box">
                <v-avatar
                  class="list-leaderboard-avatar d-flex justify-center"
                  :address="player.account"
                  tooltip
                />
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
                <div
                  v-if="index < 3 && pageRanking === 1"
                  class="leaderboard-ranking"
                >
                  <img
                    width="50px"
                    class="d-none d-sm-none d-md-flex ml-1"
                    :src="
                      `/images/game/icon-place-${
                        index === 0 ? 1 : index === 1 ? 0 : 2
                      }.png`
                    "
                    alt="icon-place"
                  />
                </div>
                <div
                  v-else
                  class="d-none d-sm-none d-md-flex leaderboard-ranking"
                >
                  #{{ index + 1 + (pageRanking - 1) * limit }}
                </div>

                <div class=" d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">
                    Participations
                  </div>
                  <div>{{ player.totalWars }}</div>
                </div>

                <div class=" d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Owner</div>
                  <v-address
                    class="d-none d-sm-none d-md-flex text-center mx-1"
                    :address="player.account"
                    link
                    tooltip
                  >
                  </v-address>
                </div>

                <div class=" d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Power Units</div>
                  <div class="text-points">{{ player.points }} PU</div>
                </div>

                <div class=" d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">
                    Total Earning wGOLD
                  </div>
                  <div class="text-treasure d-flex align-center justify-center">
                    <amount :amount="player.wGOLD" formatted decimals="2" />
                    <img
                      class="ml-1"
                      height="25px"
                      src="/images/wGOLD.png"
                      alt="wGOLD"
                    />
                  </div>
                </div>

                <div class=" d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">
                    Total Earning wCOURAGE
                  </div>
                  <div class="text-treasure d-flex align-center justify-center">
                    <amount :amount="player.wCOURAGE" formatted decimals="2" />
                    <img
                      class="ml-1"
                      height="25px"
                      src="/images/wCOURAGE.png"
                      alt="wCOURAGE"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex align-center justify-space-around">
            <div
              @click="getListRanking(pageRanking - 1)"
              class="d-flex align-center justify-center previous"
            >
              <v-icon large>
                mdi-chevron-left
              </v-icon>
            </div>
            <div class="pages">
              <div class="text-h6 font-weight-bold">
                {{ pageRanking }}/{{ getTotalPageRanking }}
              </div>
            </div>

            <div
              @click="getListRanking(pageRanking + 1)"
              class="d-flex align-center justify-center next"
            >
              <v-icon large>
                mdi-chevron-right
              </v-icon>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <h3 class="text-h3">Loading...</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import VAvatar from "@/lib/components/ui/Utils/VAvatar";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import Medal from "@/lib/components/ui/Utils/Medal";
import Podium from "@/lib/components/ui/Leaderboard/Podium";

import { mapMutations } from "vuex";

import LeaderboardController from "@/controller/LeaderboardController";

export default {
  components: {
    Amount,
    wButton,
    VAvatar,
    VAddress,
    Medal,
    Podium,
    Amount,
  },

  data() {
    return {
      isLoading: true,
      limit: 20,
      pageRanking: 1,
      listRanking: [],
      listPodium: [],
      distributedRewards: {},
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

    getTotalPageRanking() {
      if (this.limit > this.listRanking.total) {
        return 1;
      }
      return Math.ceil(this.listRanking.total / this.limit);
    },

    getListPodium() {
      if (!this.listPodium.length) {
        return [];
      }
      const listPodium = this.listPodium.slice(0, 3);
      listPodium[0].position = 1;
      listPodium[1].position = 2;
      listPodium[2].position = 3;

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
    this.setHeader(false);
    this.loadData();
  },

  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      await this.getListRanking(this.pageRanking);
      this.listPodium = this.listRanking.slice(0, 3);

      this.isLoading = false;
    },

    async getListRanking(_page) {
      if (
        this.listRankingLoading ||
        _page < 1 ||
        _page > this.getTotalPageRanking
      ) {
        return;
      }

      this.pageRanking = _page;
      const leaderboardController = new LeaderboardController();
      this.listRankingLoading = true;
      let _listRanking = await leaderboardController.getLeaderboardWar(
        null,
        this.limit,
        this.limit * (_page - 1)
      );

      const total = _listRanking.total;

      _listRanking = _listRanking.map((r) => ({ ...r, score: r.points }));

      _listRanking.total = total;

      this.listRanking = _listRanking;

      const _distributedRewards = await leaderboardController.getLeaderboardWarDistributedRewards();

      this.distributedRewards = {
        distributed: {},
        distributedLastWar: {},
        totalEnlistmentLastWar: _distributedRewards.totalEnlistmentLastWar,
      };
      this.distributedRewards.distributed.wGOLD = _distributedRewards.distributed.find(
        (_distributed) => _distributed.token === "wGOLD"
      );
      this.distributedRewards.distributed.wCOURAGE = _distributedRewards.distributed.find(
        (_distributed) => _distributed.token === "wCOURAGE"
      );

      this.distributedRewards.distributedLastWar.wGOLD = _distributedRewards.distributedLastWar.find(
        (_distributed) => _distributed.token === "wGOLD"
      );
      this.distributedRewards.distributedLastWar.wCOURAGE = _distributedRewards.distributedLastWar.find(
        (_distributed) => _distributed.token === "wCOURAGE"
      );

      this.listRankingLoading = false;
    },
  },
};
</script>

<style scoped>
.page-background {
  background-image: url("/images/backgrounds/jungle.jpg");
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

.list-leaderboard-avatar >>> img {
  height: 62px;
  margin: 0px !important;
  border-radius: 6px 0px 0px 6px;
  border-right: 2px solid #ffeebc;
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

.leaderboard-info {
  width: 100%;
}

.text-village,
.text-points {
  width: 125px;
  text-align: center;
}
.text-treasure {
  width: 160px;
  text-align: center;
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
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 62px;
  color: #ffeebc;
}

.distributed-participants {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 42px;
  color: #ffeebc;
  text-align: center;
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
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>

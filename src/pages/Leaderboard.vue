<template>
  <div>
    <div class="page-background">
      <div class="container d-flex align-center justify-space-between">
        <div class="page-title">
          Leaderboard
          <div class="page-title-line"></div>
        </div>
        <img
          class="page-title-icon"
          src="/images/game/trophy.png"
          alt="trophy"
        />
      </div>
      <div class="gradient"></div>
    </div>

    <v-container v-if="isConnected && !isLoading">
      <v-row>
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <div class="page-subtitle">
            Choose the Game
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="game in listGames" v-bind:key="game.id" cols="12" sm="4">
          <v-card :class="`card-choose-game ${game.disabled && 'disabled'}`">
            <div
              class="card-choose-game-body d-flex align-center justify-center"
            >
              <v-icon v-if="game.disabled">
                mdi-lock-outline
              </v-icon>
              <img v-else width="70%" :src="game.image" />
            </div>
            <div
              :class="`card-choose-game-button ${game.disabled && 'disabled'}`"
              @click="game.actionButton('/game/the-monstrous-journey')"
            >
              {{ game.nameButton }}
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          class="d-flex align-center justify-center my-1 my-sm-6"
        >
          <img
            class="mr-1"
            height="35px"
            src="/images/game/trophy.png"
            alt="trophy"
          />
          <div class="page-subtitle">
            Winners of the Week (15/11/21 - 11/12/21)
          </div>
        </v-col>
      </v-row>

      <v-row v-if="!$vuetify.breakpoint.xs" class="mt-8 d-flex align-end" dense>
        <v-col
          v-for="(player, index) in podium"
          v-bind:key="player.account"
          cols="12"
          sm="4"
        >
          <v-card
            :class="
              `card-podium ${
                index === 1 ? 'gold' : index === 0 ? 'silver' : 'bronze'
              }`
            "
          >
            <div
              class="card-podium-body flex-column d-flex align-center justify-center"
            >
              <div class="d-flex flex-column align-center">
                <v-avatar
                  class="avatar d-flex justify-center"
                  :address="player.account"
                  tooltip
                />
                <img
                  :class="`mt-n2 icon-place-${index}`"
                  :src="`/images/game/icon-place-${index}.png`"
                  alt="icon-place"
                />
              </div>
              <div class="d-flex align-center my-5">
                <img
                  :width="`${index === 1 ? '85px' : '60px'}`"
                  :src="`/images/game/trophy-${index}.png`"
                  alt="trophy-gold"
                />
                <div :class="`${index === 1 ? 'text-h2' : 'text-h4'}`">
                  {{ player.score }}
                </div>
              </div>
              <v-address
                class="text-center"
                :address="player.account"
                link
                tooltip
              >
              </v-address>
            </div>
            <div
              class="card-podium-footer d-flex align-center  justify-center mt-2 py-2"
            >
              <img
                :width="`${index === 1 ? '65px' : '45px'}`"
                :src="`/images/icons/chest-wgold.png`"
                alt="chest-wgold"
                class="mr-1"
              />
              <div
                :class="
                  `${
                    index === 1
                      ? 'black--text text-h4'
                      : 'black--text text-h5 font-weight-bold'
                  }`
                "
              >
                {{ player.prizeAmount }} {{ player.prize }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else class="mt-8 d-flex align-end" dense>
        <v-col
          v-for="(player, index) in leaderboards.slice(0, 3)"
          v-bind:key="player.account"
          :cols="index === 0 ? 10 : 6"
          :offset="index === 0 ? 1 : 0"
          :class="`${index !== 0 ? 'mt-4' : ''}`"
        >
          <v-card
            :class="
              `card-podium ${
                index === 1 ? 'silver' : index === 0 ? 'gold' : 'bronze'
              }`
            "
          >
            <div
              class="card-podium-body flex-column d-flex align-center justify-center"
            >
              <div class="d-flex flex-column align-center">
                <v-avatar
                  width="20px"
                  class="avatar d-flex justify-center"
                  :address="player.account"
                  tooltip
                />
                <img
                  :class="`mt-n1 icon-place-${index}`"
                  :src="
                    `/images/game/icon-place-${
                      index === 0 ? 1 : index === 1 ? 0 : 2
                    }.png`
                  "
                  alt="icon-place"
                />
              </div>
              <div class="d-flex align-center my-2">
                <img
                  :width="`${index === 0 ? '40px' : '30px'}`"
                  :src="
                    `/images/game/trophy-${
                      index === 0 ? 1 : index === 1 ? 0 : 2
                    }.png`
                  "
                  alt="trophy-gold"
                />
                <div :class="`${index === 0 ? 'text-h4' : 'text-h5'}`">
                  {{ player.score }}
                </div>
              </div>
              <v-address
                class="text-center text-overline"
                :address="player.account"
                link
                tooltip
              >
              </v-address>
            </div>
            <div
              class="card-podium-footer flex-column d-flex align-center justify-center py-1"
            >
              <img
                :width="`${index === 0 ? '45px' : '35px'}`"
                :src="`/images/icons/chest-wgold.png`"
                alt="chest-wgold"
              />
              <div
                :class="
                  `${
                    index === 0
                      ? 'black--text text-h5 font-weight-bold'
                      : 'black--text text-h6 font-weight-bold'
                  }`
                "
              >
                {{ player.prizeAmount }} {{ player.prize }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8" offset-md="2" class="d-flex">
          <v-alert class="mx-auto d-inline-block" dense type="info" outlined>
            Prizes are distributed weekly, points are counted from Sunday to
            Saturday
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
              Weekly
            </div>
          </div>

          <div class="leaderboard">
            <div
              v-for="(player, index) in leaderboards"
              v-bind:key="player.account"
              class="d-flex flex-column flex-md-row align-start align-md-center list-leaderboard mb-2"
            >
              <div class="d-flex d-lg-box">
                <v-avatar
                  class="list-leaderboard-avatar d-flex justify-center"
                  :address="'0x0'"
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
                    :address="'0x0'"
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
                  v-if="index < 3"
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
                  #{{ index }}
                </div>

                <v-address
                  class="d-none d-sm-none d-md-flex text-center mx-1"
                  :address="'0x0'"
                  link
                  tooltip
                >
                </v-address>

                <div class="d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Average time</div>
                  <div>1’22’’22</div>
                </div>

                <div class="d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Points</div>
                  <div>1800</div>
                </div>

                <div class="d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Score</div>
                  <div>2550</div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center justify-center previous">
              <v-icon large>
                mdi-chevron-left
              </v-icon>
            </div>
            <div class="pages">
              <div class="text-h6 font-weight-bold">1/10</div>
            </div>

            <div class="d-flex align-center justify-center next">
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
            <div class="page-subtitle">
              Month
            </div>
          </div>

          <div class="leaderboard">
            <div
              v-for="(player, index) in leaderboards"
              v-bind:key="player.account"
              class="d-flex flex-column flex-md-row align-start align-md-center list-leaderboard mb-2"
            >
              <div class="d-flex d-lg-box">
                <v-avatar
                  class="list-leaderboard-avatar d-flex justify-center"
                  :address="'0x0'"
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
                    :address="'0x0'"
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
                  v-if="index < 3"
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
                  #{{ index }}
                </div>

                <v-address
                  class="d-none d-sm-none d-md-flex text-center mx-1"
                  :address="'0x0'"
                  link
                  tooltip
                >
                </v-address>

                <div class="d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Average time</div>
                  <div>1’22’’22</div>
                </div>

                <div class="d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Points</div>
                  <div>1800</div>
                </div>

                <div class="d-flex flex-column align-center mx-2">
                  <div class="text-subtitle-2 primary--text">Score</div>
                  <div>2550</div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center justify-center previous">
              <v-icon large>
                mdi-chevron-left
              </v-icon>
            </div>
            <div class="pages">
              <div class="text-h6 font-weight-bold">1/10</div>
            </div>

            <div class="d-flex align-center justify-center next">
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

import { mapMutations } from "vuex";
import moment from "moment";

import LeaderboardController from "@/controller/LeaderboardController";

export default {
  components: {
    Amount,
    wButton,
    VAvatar,
    VAddress,
    Medal,
  },

  data() {
    return {
      isLoading: true,
      leaderboards: [
        {
          ranking: 1,
          account: "0x35E7097DAeEb621057293c64288337ED5170AAaf",
          game: "Monstrous Journey",
          time: 63000,
          stage: "Start",
          points: 2200,
          score: 2200,
          prizeAmount: 3800,
          prize: "wGOLD",
        },
        {
          ranking: 2,
          account: "0x64F5E89350eEf65c3fCe69d6cBF7fdd1eC61Aa00",
          game: "Monstrous Journey",
          time: 65000,
          stage: "Start",
          points: 1800,
          score: 1800,
          prizeAmount: 2500,
          prize: "wGOLD",
        },
        {
          ranking: 3,
          account: "0xF80783C375f6F34999Cc16Fce2d326f597aeF38b",
          game: "Monstrous Journey",
          time: 66000,
          stage: "Start",
          points: 1560,
          score: 1560,
          prizeAmount: 1800,
          prize: "wGOLD",
        },
        {
          ranking: 4,
          account: "0xFC9A805C4CE604711FA18d663CaccBef2965E667",
          game: "Monstrous Journey",
          time: 65000,
          stage: "Start",
          points: 1000,
          score: 1000,
        },
        {
          ranking: 5,
          account: "0x2d4bb1bcE02E1c0ec6cf08f585924F82707BEF89",
          game: "Monstrous Journey",
          time: 64000,
          stage: "Start",
          points: 900,
          score: 900,
        },
        {
          ranking: 6,
          account: "0xF7AE8490eb37973A4bb5797C3F193e1A5b721dA9",
          game: "Monstrous Journey",
          time: 67000,
          stage: "Start",
          points: 870,
          score: 870,
        },
      ],
      podium: [
        {
          account: "0x64F5E89350eEf65c3fCe69d6cBF7fdd1eC61Aa00",
          game: "Monstrous Journey",
          time: 65000,
          stage: "Start",
          points: 1800,
          score: 1800,
          prizeAmount: 1800,
          prize: "wGOLD",
        },
        {
          account: "0x35E7097DAeEb621057293c64288337ED5170AAaf",
          game: "Monstrous Journey",
          time: 63000,
          stage: "Start",
          points: 2200,
          score: 2200,
          prizeAmount: 3200,
          prize: "wGOLD",
        },
        {
          account: "0xF80783C375f6F34999Cc16Fce2d326f597aeF38b",
          game: "Monstrous Journey",
          time: 66000,
          stage: "Start",
          points: 1560,
          score: 1560,
          prizeAmount: 1500,
          prize: "wGOLD",
        },
      ],
      limit: 10,
      pageWeek: 1,
      pageMonth: 1,
      listWeek: [],
      listMonth: [],
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
          name: "Coming soon",
          image: "",
          nameButton: "Coming soon",
          actionButton: () => {},
          disabled: true,
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
    this.initData();
    this.loadData();
  },

  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),

    initData() {
      this.listWeek = this.getListWeek(1);
      this.listMonths = this.getListMonths();
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.isLoading = false;
    },

    async getListWeek(_page) {
      const leaderboardController = new LeaderboardController();
      this.listWeekLoading = true;
      this.listWeek = await leaderboardController.getWeek(1, this.limit*(_page-1));
      console.log(this.listWeek);
      this.listWeekLoading = false;
    },

    getListMonths(limit, skip) {
      const listMonths = [];
      const limitSelect = 9;
      const getTime = moment(new Date().getTime());
      listMonths.push({
        date: getTime,
        label: `Current month`,
      });

      for (let index = 1; index < limitSelect; index++) {
        const lastDate = listMonths[index - 1].date;
        const startDate = moment(lastDate).subtract(1, "month");
        listMonths.push({
          date: startDate,
          label: `${startDate.format("MMMM YYYY")}`,
        });
      }

      return listMonths;
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

.card-podium {
  background: #000000;
  border: 2px solid #ffeebc;
  box-sizing: border-box;
  border-radius: 0px;
}

.card-podium .icon-place-0 {
  width: 50px;
}
.card-podium .icon-place-1 {
  width: 60px;
}
.card-podium .icon-place-2 {
  width: 40px;
}

.card-podium.gold {
  border: 2px solid #ffb800;
}
.card-podium.silver {
  border: 2px solid #c4c4c4;
}
.card-podium.bronze {
  border: 2px solid #e95809;
}

.card-podium.gold .avatar >>> img {
  margin-top: -50px;
  border: 2px solid #ffb800;
  border-radius: 8px;
}
.card-podium.silver .avatar >>> img {
  margin-top: -50px;
  border: 2px solid #c4c4c4;
  border-radius: 8px;
}
.card-podium.bronze .avatar >>> img {
  margin-top: -50px;
  border: 2px solid #e95809;
  border-radius: 8px;
}

.card-podium.gold .card-podium-footer {
  background: linear-gradient(180deg, #f3a100 0%, #ffb800 100%);
  border-top: 2px solid #ffb800;
  box-sizing: border-box;
  border-radius: 0px;
}
.card-podium.silver .card-podium-footer {
  background: linear-gradient(180deg, #8e8e8e 0%, #c4c4c4 100%);
  border-top: 2px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 0px;
}
.card-podium.bronze .card-podium-footer {
  background: linear-gradient(180deg, #be4400 0%, #e95809 100%);
  border-top: 2px solid #e95809;
  box-sizing: border-box;
  border-radius: 0px;
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

  .card-podium.gold .avatar >>> img {
    width: 70px;
    margin-top: -35px;
    border: 2px solid #ffb800;
    border-radius: 8px;
  }
  .card-podium.silver .avatar >>> img {
    width: 70px;
    margin-top: -35px;
    border: 2px solid #c4c4c4;
    border-radius: 8px;
  }
  .card-podium.bronze .avatar >>> img {
    width: 70px;
    margin-top: -35px;
    border: 2px solid #e95809;
    border-radius: 8px;
  }
  .card-podium .icon-place-0 {
    width: 40px;
  }
  .card-podium .icon-place-1 {
    width: 40px;
  }
  .card-podium .icon-place-2 {
    width: 40px;
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
</style>

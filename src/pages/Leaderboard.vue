<template>
  <div>
    <div class="bg-war">
      <v-container fluid>
        <v-row class="d-none d-sm-none d-md-flex mt-n6">
          <v-col cols="12" md="3">
            <v-img
              class="mx-auto"
              height="250"
              width="87"
              src="/images/battle/flag-the-corporation.png"
            />
          </v-col>
          <v-col cols="12" md="6">
            <div class="mt-3">
              <h1 class="text-h1 text-wGOLD text-center">Leaderboard</h1>
              <wButton class="mt-2 text-center">Play now</wButton>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <v-img
              class="mx-auto"
              height="250"
              width="87"
              src="/images/battle/flag-the degenerate.png"
            />
          </v-col>
        </v-row>

        <v-row class="d-flex d-sm-flex d-md-none">
          <v-col cols="12">
            <h2 class="text-h2 text-wGOLD text-center">Leaderboard</h2>
          </v-col>
        </v-row>
      </v-container>
      <div class="gradient"></div>
    </div>

    <v-container class="mt-n2 mt-sm-n16">
      <v-row v-if="isConnected && !isLoading">
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <div class="mb-3 text-h5 text-wGOLD text-center">
            Winners of the week 11/15/21 - 11/21/21
          </div>
          <div class="d-flex">
            <div
              v-for="(player, index) in podium"
              v-bind:key="player.account"
              :class="`podium podium-${index}`"
            >
              <v-avatar
                class="avatar d-flex justify-center"
                :address="player.account"
                tooltip
              />
              <medal
                class="mt-n2 mb-2"
                :type="index === 0 ? 'silver' : index === 1 ? 'gold' : 'bronze'"
              ></medal>
              <div class="text-center">
                <span class="primary--text font-weight-bold">Score:</span>
                {{ player.score }}
              </div>
              <div class="text-center text-weigth">
                <span class="primary--text font-weight-bold">Prize:</span>
                1000 wGOLD
              </div>
            </div>
          </div>
          <div class="mt-1">
            <v-alert dense type="info" outlined>
              Prizes are distributed weekly, points are counted from Monday to
              Sunday.
            </v-alert>
          </div>
        </v-col>

        <v-col cols="12" class="d-flex align-center justify-center">
          <div class="mr-3">
            <v-select
              v-model="period"
              :items="itemsPeriod"
              label="Select period"
              outlined
            ></v-select>
          </div>
          <div>
            <v-select
              v-model="time"
              :items="itemsTime"
              label="Select time"
              item-text="label"
              return-object
              outlined
            ></v-select>
          </div>
        </v-col>

        <v-col cols="12">
          <v-data-table
            class="table-leaderboard elevation-2"
            :headers="headers"
            :items="leaderboards"
            nowrap
          >
            <template v-slot:[`item.ranking`]="{ item }">
              <div class="d-flex align-center my-1">
                <medal
                  v-if="item.ranking <= 3"
                  :type="
                    item.ranking === 2
                      ? 'silver'
                      : item.ranking === 1
                      ? 'gold'
                      : 'bronze'
                  "
                ></medal>
                <div v-else>#{{ item.ranking }}</div>
              </div>
            </template>

            <template v-slot:[`item.account`]="{ item }">
              <div class="d-flex align-center my-1">
                <v-avatar :address="item.account" />
                <v-address
                  class="text-center text-caption"
                  :address="item.account"
                  link
                  tooltip
                >
                </v-address>
              </div>
            </template>

            <template v-slot:[`item.time`]="{ item }">
              <countdown
                :auto-start="false"
                :time="item.time"
                v-slot="{ minutes, seconds }"
              >
                {{ minutes }} minutes, {{ seconds }} seconds
              </countdown>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row v-else>
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
      period: "Daily",
      itemsPeriod: ["Daily", "Weekly", "Monthly"],
      headers: [
        {
          text: "Ranking",
          value: "ranking",
          sortable: false,
        },
        {
          text: "Player",
          value: "account",
          sortable: false,
        },
        { text: "Average time", value: "time", sortable: false },
        {
          text: "Points",
          value: "points",
          sortable: false,
        },
        {
          text: "Score",
          value: "score",
          sortable: false,
        },
      ],
      leaderboards: [
        {
          ranking: 1,
          account: "0x35E7097DAeEb621057293c64288337ED5170AAaf",
          game: "Monstrous Journey",
          time: 63000,
          stage: "Start",
          points: 2200,
          score: 2200,
        },
        {
          ranking: 2,
          account: "0x64F5E89350eEf65c3fCe69d6cBF7fdd1eC61Aa00",
          game: "Monstrous Journey",
          time: 65000,
          stage: "Start",
          points: 1800,
          score: 1800,
        },
        {
          ranking: 3,
          account: "0xF80783C375f6F34999Cc16Fce2d326f597aeF38b",
          game: "Monstrous Journey",
          time: 66000,
          stage: "Start",
          points: 1560,
          score: 1560,
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
        },
        {
          account: "0x35E7097DAeEb621057293c64288337ED5170AAaf",
          game: "Monstrous Journey",
          time: 63000,
          stage: "Start",
          points: 2200,
          score: 2200,
        },
        {
          account: "0xF80783C375f6F34999Cc16Fce2d326f597aeF38b",
          game: "Monstrous Journey",
          time: 66000,
          stage: "Start",
          points: 1560,
          score: 1560,
        },
      ],
      listDays: [],
      listWeeks: [],
      listMonths: [],
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

    itemsTime() {
      if(this.period === 'Daily') {
        this.time = this.listDays[0];
        return this.listDays;
      } else if (this.period === 'Weekly') {
        this.time = this.listWeeks[0];
        return this.listWeeks;
      } else {
        this.time = this.listMonths[0];
        return this.listMonths;
      }
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
      this.listDays = this.getListDays();
      this.listWeeks = this.getListWeeks();
      this.listMonths = this.getListMonths();
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.isLoading = false;
    },

    getListDays() {
      const listDays = [];
      const limitSelect = 9;
      const getTime = moment(new Date().getTime());
      listDays.push({
        date: getTime,
        label: `Today`,
      });

      for (let index = 1; index < limitSelect; index++) {
        const lastDate = listDays[index - 1].date;
        const startDate = moment(lastDate).subtract(1, "days");
        listDays.push({
          date: startDate,
          label: `${startDate.format("L")}`,
        });
      }

      return listDays;
    },

    getListWeeks() {
      const listWeeks = [];
      const limitSelect = 9;
      const getTime = moment(new Date().getTime());
      const dayWeek = getTime.format("d");
      const startDateWeek = getTime.subtract(dayWeek, "days");
      listWeeks.push({
        date: startDateWeek,
        label: `Current week`,
      });

      for (let index = 1; index < limitSelect; index++) {
        const lastDate = listWeeks[index - 1].date;
        const startDate = moment(lastDate).subtract(7, "days");
        const endDate = moment(lastDate).subtract(1, "days");
        listWeeks.push({
          date: startDate,
          label: `${startDate.format("L")} - ${endDate.format("L")}`,
        });
      }

      return listWeeks;
    },

    getListMonths() {
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
.bg-war {
  background-image: url("/images/battle/bg-war.jpg");
  background-size: cover;
  background-position: center;
}
.text-subtitle-welcome-war {
  color: #bea38d;
}

.gradient {
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

.isLoading {
  opacity: 0;
}
.loading {
  display: none;
}

.podium {
  position: relative;
  margin: 0px 30px;
}

.podium .avatar >>> img {
  border: 3px solid #bb7248;
  border-radius: 8px;
}

.podium-1 .avatar >>> img {
  width: 130px;
}

.podium-0 .avatar >>> img {
  width: 110px;
}

.table-leaderboard >>> .v-data-table__wrapper > table > tbody > tr > td,
.table-leaderboard >>> .v-data-table__wrapper > table > thead > tr > td,
.table-leaderboard >>> .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 1rem;
}

.table-leaderboard >>> .v-data-table__wrapper > table > tbody > tr > th,
.table-leaderboard >>> .v-data-table__wrapper > table > thead > tr > th,
.table-leaderboard >>> .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 1rem;
  color: #ffb800;
}

.table-leaderboard
  >>> .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: thin solid #ffffff;
}

.table-leaderboard
  >>> .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #ffffff;
}

.table-leaderboard
  >>> .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:last-child,
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:last-child {
  border-bottom: thin solid #ffffff;
}

.table-leaderboard >>> .v-data-footer {
  border-top: thin solid #ffffff;
}

.table-leaderboard >>> .avatar {
  width: 60px;
  border: 3px solid #bb7248;
  border-radius: 6px;
}

@media only screen and (max-width: 600px) {
  .gradient {
    display: none;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>

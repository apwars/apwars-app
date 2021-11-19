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
              <h4 class="text-h4 text-center text-subtitle-welcome-war">
                Monstrous Journey
              </h4>
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
            <v-img
              class="mx-auto"
              max-width="600"
              src="/images/battle/war-info/flag-stage.png"
            />
          </v-col>
        </v-row>
      </v-container>
      <div class="gradient"></div>
    </div>

    <v-container class="mt-n16">
      <v-row v-if="isConnected && !isLoading">
        <v-col cols="12" class="d-flex align-center justify-center">
          <div
            v-for="(player, index) in podium"
            v-bind:key="player.account"
            :class="`podium podium-${index}`"
          >
            <v-avatar class="avatar d-flex justify-center" :address="player.account" tooltip />
            <medal
              class="mt-n2 mb-2"
              :type="index === 0 ? 'silver' : index === 1 ? 'gold' : 'bronze'"
            ></medal>
            <div class="text-center">
              <span class="primary--text font-weight-bold">Points:</span>
              {{ player.points }}
            </div>
            <div class="text-center">
              <span class="primary--text font-weight-bold">Average time:</span>
              <countdown
                :auto-start="false"
                :time="player.time"
                v-slot="{ minutes, seconds }"
              >
                {{ minutes }} minutes, {{ seconds }} seconds
              </countdown>
            </div>
            <div class="text-center text-weigth">
              <span class="primary--text font-weight-bold">Prize:</span>
              1000 wGOLD
            </div>
          </div>
        </v-col>

        <v-col cols="12">
          <v-data-table
            class="table-leaderboard elevation-2"
            :headers="headers"
            :items="leaderboards"
            nowrap
          >
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
      headers: [
        {
          text: "Player",
          value: "account",
          width: "30%",
          sortable: false,
        },
        { text: "Average time", value: "time", width: "35%", sortable: false },
        {
          text: "Points",
          value: "points",
          width: "35%",
          sortable: false,
        },
      ],
      leaderboards: [
        {
          account: "0xFC9A805C4CE604711FA18d663CaccBef2965E667",
          game: "Monstrous Journey",
          time: 65000,
          stage: "Start",
          points: 1000,
        },
        {
          account: "0x2d4bb1bcE02E1c0ec6cf08f585924F82707BEF89",
          game: "Monstrous Journey",
          time: 64000,
          stage: "Start",
          points: 900,
        },
        {
          account: "0xF7AE8490eb37973A4bb5797C3F193e1A5b721dA9",
          game: "Monstrous Journey",
          time: 67000,
          stage: "Start",
          points: 870,
        },
      ],
      podium: [
        {
          account: "0x64F5E89350eEf65c3fCe69d6cBF7fdd1eC61Aa00",
          game: "Monstrous Journey",
          time: 65000,
          stage: "Start",
          points: 1800,
        },
        {
          account: "0x35E7097DAeEb621057293c64288337ED5170AAaf",
          game: "Monstrous Journey",
          time: 63000,
          stage: "Start",
          points: 2200,
        },
        {
          account: "0xF80783C375f6F34999Cc16Fce2d326f597aeF38b",
          game: "Monstrous Journey",
          time: 66000,
          stage: "Start",
          points: 1560,
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

    currentBlockNumber() {
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

      this.isLoading = false;
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

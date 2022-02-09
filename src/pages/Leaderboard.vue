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

    <v-container v-if="isConnected">
      <v-row>
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <div class="page-subtitle">
            Choose the Game
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="game in listGames" v-bind:key="game.id" cols="12" sm="4">
          <v-card
            @click="chooseTheGame(game)"
            :class="
              `card-choose-game ${game.disabled &&
                'disabled'} ${game.selected && 'selected'}`
            "
          >
            <div
              class="card-choose-game-body d-flex align-center justify-center"
            >
              <v-icon v-if="game.disabled">
                mdi-lock-outline
              </v-icon>
              <img v-else width="70%" :src="game.image" />
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="selectGame.isWeekly">
        <v-col
          cols="12"
          class="d-flex align-center justify-center my-1 my-sm-6"
        >
          <img
            class="mr-2"
            height="60px"
            src="/images/game/trophy.png"
            alt="trophy"
          />
          <div class="page-subtitle" >
            Winners of the Week - #{{ getNumberWeek }} <br />
            {{ getLabelWeek }}
          </div>
        </v-col>
      </v-row>

      <TheMonstrousJourney v-if="selectGame.id === 0" />
      <Arcadia v-if="selectGame.id === 1" />
      <War v-if="selectGame.id === 2" />
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
import TheMonstrousJourney from "@/lib/components/ui/Leaderboard/TheMonstrousJourney";
import Arcadia from "@/lib/components/ui/Leaderboard/Arcadia";
import War from "@/lib/components/ui/Leaderboard/War";

import { mapMutations } from "vuex";
import moment from "moment";

export default {
  components: {
    Amount,
    wButton,
    VAvatar,
    VAddress,
    Medal,
    TheMonstrousJourney,
    Arcadia,
    War
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
      listGames: [
        {
          id: 0,
          selected: true,
          name: "The Monstrous Journey",
          image: "/images/game/the-monstrous-journey.png",
          nameButton: "Play Now",
          actionButton: (url) => {
            this.$router.push(url);
          },
          disabled: false,
          isWeekly: true,
        },
        {
          id: 1,
          selected: false,
          name: "Arcandia Expansion",
          image: "/images/arcadia-expansion.png",
          nameButton: "Coming soon",
          actionButton: () => {},
          disabled: false,
          isWeekly: false,
        },
        {
          id: 2,
          selected: false,
          name: "War",
          image: "/images/icons/fed.png",
          nameButton: "Coming soon",
          actionButton: () => {},
          disabled: false,
          isWeekly: false,
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

    selectGame() {
      return this.listGames.find(_game => _game.selected);
    }
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

    chooseTheGame(game) {
      if (game.disabled) {
        return;
      }

      this.listGames = this.listGames.map((_game) => {
        _game.selected = false;
        return _game;
      });

      game.selected = true;
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
  cursor: pointer;
}

.card-choose-game.selected {
  border: 2px solid #fbec00;
  box-shadow: #ffeebc 1px 0px 20px -2px;
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
  cursor: not-allowed;
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
</style>

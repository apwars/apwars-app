<template>
  <div class="list-units">    
    <v-container
      :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.mobile"
      v-if="isConnected && !isLoading"
    >
      <v-row v-if="gameItemsFiltered.length > 0">
        <v-col
          cols="12"
          lg="6"
          xl="4"
          v-for="gameItem in gameItemsFiltered"
          v-bind:key="gameItem.name"
        >
          <game-items-combinators
            :gameItems="gameItem"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <h1 class="text-center">No data available</h1>
        </v-col>
      </v-row>
    </v-container>

    <v-container :fluid="$vuetify.breakpoint.mobile" v-if="isLoading">
      <v-row>
        <v-col cols="12" class="text-center ma-6 ma-sm-0">
          <h3 class="text-h3">Loading...</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import Trooper from "@/lib/components/ui/Utils/Trooper";
import StakeTrooper from "@/lib/components/ui/Utils/StakeTrooper";
import ReportTrooper from "@/lib/components/ui/Utils/ReportTrooper";
import UnitWarPreparation from "@/lib/components/ui/Units/UnitWarPreparation";

import GameItemsCombinators from "@/lib/components/ui/Combinators/GameItemsCombinators";

import UnitTrainingCenter from "@/lib/components/ui/Units/UnitTrainingCenter";

import { getMagicalItems } from "@/data/Collectibles/MagicalItems";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    Trooper,
    StakeTrooper,
    ReportTrooper,
    UnitWarPreparation,
    UnitTrainingCenter,
    GameItemsCombinators,
  },

  props: ["type", "contractWar", "filterRules", "showOnlyMyUnits"],

  data() {
    return {
      balance: 0,
      pricewGOLD: 0,
      isLoading: true,
      gameItemsFiltered: [],
    };
  },

  
  mounted() {
    this.loadData();
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

  methods: {
    loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        this.gameItemsFiltered = getMagicalItems().filter(i => i.combinators);
        this.isLoading = false;
      } catch (e) {
        console.error(e)
      }

    },
  },
};
</script>

<style scoped>
.list-units
  >>> .theme--dark.v-text-field--solo
  > .v-input__control
  > .v-input__slot {
  border: 1px solid #ffb800;
}

.theme--dark.v-list {
  border: 2px solid #ffb800;
}

.amount-fed {
  margin-top: -85px !important;
}
.suffix {
  background: -webkit-linear-gradient(#f6ff00, #ffb800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.label-current {
  font-weight: bold;
  font-size: 14px;
}

@media only screen and (max-width: 375px) {
  .amount-fed {
    margin-top: -65px !important;
  }
}
</style>
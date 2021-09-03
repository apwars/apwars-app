<template>
  <div class="list-units">
    <v-container
      :fluid="$vuetify.breakpoint.mobile"
      class="pa-3 pd-md-0"
      v-if="isConnected && !isLoading"
    >
      <!-- <v-row :no-gutters="$vuetify.breakpoint.mobile">
        <v-col cols="12" lg="3">
          <v-select
            v-model="select.teams"
            :items="filter.teamDesc"
            label="Select Factions"
            multiple
            chips
            solo
            @change="updateTroopsFilters()"
          >
          </v-select>
        </v-col>
        <v-col cols="12" lg="3">
          <v-select
            v-model="select.tiers"
            :items="filter.tierDesc"
            label="Select Tier"
            multiple
            chips
            solo
            @change="updateTroopsFilters()"
          >
          </v-select>
        </v-col>
        <v-col cols="12" lg="3">
          <v-select
            v-model="select.races"
            :items="filter.raceDesc"
            label="Select Races"
            multiple
            chips
            solo
            @change="updateTroopsFilters()"
          >
          </v-select>
        </v-col>
        <v-col cols="12" lg="3">
          <v-select
            v-model="select.names"
            :items="filter.name"
            label="Select Units"
            multiple
            chips
            solo
            @change="updateTroopsFilters()"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text text-caption">
                (+{{ select.names.length - 1 }} others)
              </span>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row class="mt-0 mt-lg-n5 mb-3">
        <v-col class="py-0 my-0" cols="12">
          <div class="d-flex flex-column flex-md-row align-center">
            <wButton @click="clearFilters()" class=" mr-3">
              <div class="d-flex justify-center">
                <v-icon class="mx-1">
                  mdi-minus-circle
                </v-icon>
                <small class="align-self-center">Clear filter</small>
              </div>
            </wButton>
            <v-checkbox
              v-model="showMyUnits"
              @change="updateTroopsFilters()"
              label="Show only my units"
              color="primary"
            ></v-checkbox>
          </div>
        </v-col>
      </v-row>-->
    </v-container>
    
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
          <trooper v-if="getType === 'trooper'" :info="trooper" />
          <stake-trooper
            v-else-if="getType === 'enlistment'"
            :trooper="gameItem"
            :contract-war="contractWar"
          />
          <stake-trooper
            v-else-if="getType === 'bring-home'"
            :trooper="gameItem"
            :contract-war="contractWar"
            bring-home
          />
          <report-trooper
            v-else-if="getType === 'report-trooper'"
            :trooper="gameItem"
            :contract-war="contractWar"
          />
          <unit-training-center
            v-else-if="getType === 'training-center'"
            :unit="gameItem"
          />
          <unit-war-preparation
            v-else-if="getType === 'war-preparation'"
            :unit="gameItem"
          />

          <game-items-combinators
           v-else-if="getType === 'game-items-combinator'"
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
/* import ToastSnackbar from "@/plugins/ToastSnackbar";

import { getTroops } from "@/data/Troops";
import Troops from "@/lib/eth/Troops";
import wGOLD from "@/lib/eth/wGOLD"; */

import { getGameItems } from "@/data/Collectibles/GameItems";

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
      showMyUnits: false,
      balance: 0,
      pricewGOLD: 0,
      isLoading: true,
    
      gameItemsFiltered: [],
    };
  },

  
  mounted() {
    if (this.showOnlyMyUnits !== undefined && this.showOnlyMyUnits !== '') {
      this.showMyUnits = true;
    }
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

    getType() {
      switch (this.type) {
        case "trooper":
          return this.type;
        case "enlistment":
          return this.type;
        case "bring-home":
          return this.type;
        case "report-trooper":
          return this.type;
        case "war-preparation":
          this.select.tiers = "Barracks";
          return this.type;
        case "game-items-combinator":
          return this.type;
        case "training-center":
          this.select.tiers = "Armory"
          return this.type;

        default:
          return "trooper";
      }
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },
   /*  account() {
      this.loadData();
    },

    currentBlockNumber() {
      this.loadData();
    }, */
  },

  methods: {
    loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        const gameItems = getGameItems();

        for (const item in gameItems) {
          if(item > 1 && item < 6) {
            this.gameItemsFiltered.push(gameItems[item])
          }
        }
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
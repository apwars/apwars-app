<template>
  <div class="list-units">    
    <v-container
      :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.mobile"
      v-if="isConnected && !isLoading"
    >
      <v-row v-if="tokens.length > 0">
        <v-col
          cols="12"
          lg="6"
          xl="4"
          v-for="token in tokens"
          v-bind:key="token.name"
        >
          <game-items-combinators :gameItems="token" v-if="type === 'magical-items'" />
          <unit-war-preparation v-else
            :unit="token"
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

import Troops from "@/lib/eth/Troops";
import { getTroops } from "@/data/Troops";

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
    GameItemsCombinators
  },

  props: {
    type: {
      type: String,
      validator: function (value) {
        const allowed = ['weapons', 'magical-items'];
        return allowed.includes(value);
      },
      default: "weapons"
    }
  },

  data() {
    return {
      balance: 0,
      pricewGOLD: 0,
      isLoading: true,
      tokens: [],
      showMyUnits: false,
      balance: 0,
      pricewGOLD: 0,
      isLoading: true,
      select: {
        teams: [],
        tiers: [],
        races: [],
        names: [],
      },
      filter: {
        teamDesc: [],
        raceDesc: [],
        name: [],
      },
      teams: [],
      globalTroops: [],
      filterTroops: [],
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
    async loadData() {
      if (!this.isConnected) {
        return;
      }

      let units = await getTroops();
      if (this.type === 'magical-items') {
        units = getMagicalItems();
      }

      try {
        this.tokens = units.filter(t => t.combinators?.warPreparation);
        this.isLoading = false;
      } catch (e) {
        console.error(e)
      }

      this.globalTroops = await Promise.all(
        units.map((trooper) => {
          return new Promise(async (resolve) => {
            try {
              if (trooper.contractAddress === "") {
                resolve({
                  name: trooper.name,
                  team: trooper.team,
                  tier: trooper.tier,
                  myQty: "0",
                  globalQty: "0",
                  pricewGOLD: "0",
                  disabled: true,
                });
              }
              const getTropper = new Troops(
                trooper.contractAddress[this.networkInfo.id]
              );
              const myQty = await getTropper.balanceOf(this.account);
              const globalQty = await getTropper.totalSupply();
              const pricewGOLD = await getTropper.pricewGOLD(
                trooper.lpAddresses,
                this.networkInfo.id
              );

              resolve({
                ...units,
                ...{
                  myQty: myQty,
                  globalQty: globalQty,
                  pricewGOLD: pricewGOLD,
                  disabled: false,
                },
              });
            } catch (error) {
              resolve({
                name: trooper.name,
                team: trooper.team,
                tier: trooper.tier,
                myQty: "0",
                globalQty: "0",
                pricewGOLD: "0",
                disabled: true,
              });
            }
          });
        })
      );
    },

    updateSelectFilters() {
      const filterSelect = {
        raceDesc: [],
        name: [],
      };
      const filterGlobal = {
        teamDesc: [],
        tierDesc: [],
      };
      const filterRaces = this.globalTroops.filter((trooper) => {
        if (!this.select.teams.length) {
          return trooper;
        }
        return this.select.teams.indexOf(trooper.teamDesc) !== -1;
      });
      filterRaces.map((trooper) => {
        if (filterSelect.raceDesc.indexOf(trooper.raceDesc) === -1) {
          filterSelect.raceDesc.push(trooper.raceDesc);
        }
      });
      const filterNames = filterRaces.filter((trooper) => {
        if (
          this.select.tiers.length &&
          this.select.tiers.indexOf(trooper.tierDesc) !== -1 &&
          this.select.races.length &&
          this.select.races.indexOf(trooper.raceDesc) !== -1
        ) {
          return trooper;
        } else if (this.select.tiers.length && !this.select.races.length) {
          return this.select.tiers.indexOf(trooper.tierDesc) !== -1;
        } else if (!this.select.tiers.length && this.select.races.length) {
          return this.select.races.indexOf(trooper.raceDesc) !== -1;
        } else if (!this.select.tiers.length && !this.select.races.length) {
          return trooper;
        }
      });
      filterNames.map((trooper) => {
        if (filterSelect.name.indexOf(trooper.name) === -1) {
          filterSelect.name.push(trooper.name);
        }
      });
      this.globalTroops.map((trooper) => {
        for (const filter in filterGlobal) {
          if (filterGlobal[filter].indexOf(trooper[filter]) === -1) {
            filterGlobal[filter].push(trooper[filter]);
          }
        }
      });

      this.filter = { ...filterGlobal, ...filterSelect };

      if (this.filter.teamDesc.length === 1) {
        this.select.teams = [this.filter.teamDesc[0]];
      }
    },
    
    async updateTroopsFilters() {
      this.filterTroops = this.globalTroops.filter((trooper) => {
        if (!this.select.teams.length) {
          return trooper;
        }
        return this.select.teams.indexOf(trooper.teamDesc) !== -1;
      });
      this.filterTroops = this.filterTroops.filter((trooper) => {
        if (!this.select.tiers.length) {
          return trooper;
        }
        return this.select.tiers.indexOf(trooper.tierDesc) !== -1;
      });
      this.filterTroops = this.filterTroops.filter((trooper) => {
        if (!this.select.races.length) {
          return trooper;
        }
        return this.select.races.indexOf(trooper.raceDesc) !== -1;
      });
      this.filterTroops = this.filterTroops.filter((trooper) => {
        if (!this.select.names.length) {
          return trooper;
        }
        return this.select.names.indexOf(trooper.name) !== -1;
      });

      if (this.showMyUnits) {
        this.filterTroops = this.filterTroops.filter((trooper) => {
          console.log(trooper)
          return trooper.myQty != "0";
        });
      }
      this.updateSelectFilters();
    },

    clearFilters() {
      this.select = {
        teams: [],
        tiers: [],
        races: [],
        names: [],
      };
      this.updateTroopsFilters();
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
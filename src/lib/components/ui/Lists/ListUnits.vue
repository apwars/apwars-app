<template>
  <div>
    <v-container v-if="isConnected && !isLoading">
      <v-row>
        <v-col cols="12" lg="3">
          <v-select
            v-model="select.teams"
            :items="filter.teamDesc"
            label="Select Factions"
            multiple
            chips
            solo
            @change="updateTroopFilters()"
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
            @change="updateTroopFilters()"
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
            @change="updateTroopFilters()"
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
            @change="updateTroopFilters()"
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
      <v-row dense>
        <v-col class="py-0 my-0" cols="12">
          <div class="d-flex align-center">
            <wButton @click="clearFilters()" class="mr-3">
              <div class="d-flex justify-center">
                <v-icon class="mx-1">
                  mdi-minus-circle
                </v-icon>
                <small class="align-self-center">Clear filter</small>
              </div>
            </wButton>
            <v-checkbox
              v-model="showMyUnits"
              @change="updateTroopFilters()"
              label="Show only my units"
              color="primary"
            ></v-checkbox>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="isConnected && !isLoading">
      <v-row v-if="filterTroops.length > 0">
        <v-col
          cols="12"
          md="4"
          v-for="trooper in filterTroops"
          v-bind:key="trooper.name"
        >
          <trooper v-if="getType === 'trooper'" :info="trooper" />
          <stake-trooper
            v-else-if="getType === 'enlistment'"
            :trooper="trooper"
            :contract-war="contractWar"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <h1 class="text-center">No data available</h1>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="isLoading">
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

import { getTroops } from "@/data/Troops";
import Troops from "@/lib/eth/Troops";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    Trooper,
    StakeTrooper,
  },

  props: ["type", "contractWar"],

  data() {
    return {
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
        tierDesc: [],
        raceDesc: [],
        name: [],
      },
      teams: ["The Corporation", "The Degenerate"],
      globalTroops: [],
      filterTroops: [],
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
        default:
          return "trooper";
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

    currentBlockNumber() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    goToSwap() {
      this.$router.push("/exchange");
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        const contractwGOLD = new wGOLD(this.addresses.wGOLD);
        this.balance = web3.utils.fromWei(
          await contractwGOLD.balanceOf(this.account)
        );
        this.pricewGOLD = await contractwGOLD.pricewGOLD(this.networkInfo.id);

        const troops = getTroops();

        this.globalTroops = await Promise.all(
          troops.map((trooper) => {
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
                  ...trooper,
                  ...{
                    myQty: myQty,
                    globalQty: globalQty,
                    pricewGOLD: pricewGOLD,
                    disabled: false,
                  },
                });
              } catch (error) {
                console.log(error);
              }
            });
          })
        );

        this.globalTroops = this.globalTroops.map((trooper) => {
          return {
            ...trooper,
            ...{ globalQty: trooper.globalQty, myQty: trooper.myQty },
          };
        });

        this.filterTroops = this.globalTroops;
        this.updateTroopFilters();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
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
    },

    async updateTroopFilters() {
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
      this.updateTroopFilters();
    },
  },
};
</script>

<style scoped>
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
.price-WGOLD {
  font-weight: bold;
  font-size: 32px;
}

@media only screen and (max-width: 375px) {
  .price-WGOLD {
    font-size: 18px;
  }
  .amount-fed {
    margin-top: -65px !important;
  }
}
</style>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="my-0">
          <v-img
            class="mx-auto"
            width="550"
            src="/images/treasury/title-fed-treasury.png"
          />
        </v-col>
      </v-row>

      <v-row class="mt-n3">
        <v-col cols="12">
          <v-img
            class="mx-auto"
            width="550"
            src="/images/treasury/fed-treasury.png"
          />
        </v-col>
      </v-row>

      <v-row class="amount-fed">
        <v-col cols="12">
          <wGOLD-button
            v-if="isConnected"
            class="mx-auto"
            :amount="balanceFED"
            :size="$vuetify.breakpoint.name === 'xs' ? 'small' : 'medium'"
          ></wGOLD-button>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="isConnected && !isLoading">
      <v-row>
        <v-col cols="12" lg="3">
          <v-select
            v-model="select.teams"
            :items="filter.teamDesc"
            label="Select teams"
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
            label="Select tier"
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
            label="Select races"
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
            label="Select trooper"
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
    </v-container>

    <v-container v-if="isConnected && !isLoading">
      <v-row>
        <v-col
          cols="12"
          md="4"
          v-for="trooper in filterTroops"
          v-bind:key="trooper.name"
        >
          <trooper :info="trooper" />
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

import { getTroops } from "@/data/Troops";
import Troops from "@/lib/eth/Troops";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    Trooper,
  },

  data() {
    return {
      balance: 0,
      balanceFED: 0,
      priceWGOLD: 0,
      collectibles: [],
      balances: [],
      itemsCount: 0,
      totalItems: 0,
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
        this.balanceFED = await contractwGOLD.balanceOf(this.addresses.FED);
        this.priceWGOLD = await contractwGOLD.priceWGOLD(this.networkInfo.id);

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
                    priceWGOLD: "0",
                    disabled: true,
                  });
                }
                const getTropper = new Troops(
                  trooper.contractAddress[this.networkInfo.id]
                );
                const myQty = await getTropper.balanceOf(this.account);
                const globalQty = await getTropper.totalSupply();
                const priceWGOLD = await getTropper.priceWGOLD(
                  trooper.lpAddresses,
                  this.networkInfo.id
                );

                resolve({
                  ...trooper,
                  ...{
                    myQty: myQty,
                    globalQty: globalQty,
                    priceWGOLD: priceWGOLD,
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
        this.updateSelectFilters();
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
      this.updateSelectFilters();
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

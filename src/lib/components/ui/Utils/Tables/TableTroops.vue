<template>
  <div>
    <div v-if="isLoading" class="text-center ma-6 ma-sm-0">
      <h3 class="text-h3">Loading...</h3>
    </div>

    <div v-else>
      <v-checkbox
        v-model="showMyUnits"
        @change="updateMyUnits()"
        label="Show only my units"
        color="primary">
      </v-checkbox>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center th">
                Token
              </th>
              <th class="text-left th">
                Name
              </th>
              <th class="text-left th">
                Tier
              </th>
              <th class="text-center th">
                Supply
              </th>
              <th class="text-center th">
                My Quantity
              </th>
              <th class="text-center th">
                Total Strength
              </th>
              <th class="text-center th">
                Total Defense
              </th>
              <th class="text-center th">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="info in filteredTroops" :key="info.name">
              <td>
                <v-img :src="`/images/icons/coins/${info.name}.png`" max-width="80" class="img"></v-img>
              </td>
              <td>
                <address-tooltip
                  :address="info.contractAddress[networkInfo.id]"
                  :titleTicker="info.name"
                  link
                  tooltip
                ></address-tooltip>
              </td>
              <td>
                {{ info.tierDesc }}
              </td>
              <td>
                <div class="globalQty text-center">
                  <amount :amount="info.globalQty" decimals="2" compact />
                </div>
              </td>
              <td>
                <div class="globalQty text-center">
                  <amount :amount="info.myQty" decimals="2" compact />
                </div>
              </td>
          
              <td class="text-center">
                <amount :amount="info.myQty" decimals="2" compact :attribute="info.strength"/>
              </td>

              <td class="text-center">
                <amount :amount="info.myQty" decimals="2" compact :attribute="info.defense"/>
              </td>

              <td class="text-center">
                <a :href="`${redirectTo}=${info.contractAddress[networkInfo.id]}`">
                  <wButton
                    style=" color: #fff"
                    width="50px" height="40px">
                    <div class="d-flex justify-center">
                      <img
                        src="/images/buttons/btn-icon-buy.svg"
                        class="mr-1 align-self-center"
                        height="12"
                      />
                      <div class="align-self-center">Buy</div>
                    </div>
                  </wButton>
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Buttons/wButton";
import AddressTooltip from "@/lib/components/ui/Utils/AddressTooltip";
import { getTrooper } from "@/data/Trooper";

export default {
  name: 'TableTroops',
  components: {
    Amount,
    wButton,
    AddressTooltip,
  },

  data() {
    return {
      redirectTo: "https://exchange.apwars.farm/#/swap?showFarms=true&outputCurrency",
      filteredTroops: [],
      showMyUnits: false,
      isLoading: true
    }
  },

  mounted() {
    this.loadData();
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    account() {
      return this.$store.getters["user/account"];
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

  methods: {
    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        const troops = await getTrooper(this.networkInfo.id, this.account);
        this.sortTroops(troops);

      } catch (erro) {
        console.error(erro);
      } finally {
        this.isLoading = false;
      }
    },

    sortTroops(troops) {
      let sortTroops = []
      sortTroops = sortTroops.concat(troops.filter(troop => troop.raceDesc === 'Humans'))
      sortTroops = sortTroops.concat(troops.filter(troop => troop.raceDesc === 'Elves'))
      sortTroops = sortTroops.concat(troops.filter(troop => troop.raceDesc === 'Orcs'))
      sortTroops = sortTroops.concat(troops.filter(troop => troop.raceDesc === 'Undead'))

      this.filteredTroops = sortTroops
    },

    updateMyUnits() {
      this.isLoading = true;

      if (this.showMyUnits && this.filteredTroops.length > 0) {
        this.filteredTroops = this.filteredTroops.filter((trooper) => {
          return trooper.myQty !== '0';
        });
        this.isLoading = false;
      } else {
        this.loadData();
      }
    }
  }
};
</script>

<style scoped>
.stats {
  font-weight: bold;
  font-size: 28px;
}
.qty {
  color: #ffb800;
  font-weight: bold;
}
.globalQty {
  color: #f6ff00;
  font-weight: bold;
}
/* .qty >>> span,
.globalQty >>> span {
  color: #fff;
} */
.current-price {
  font-weight: bold;
  font-size: 18px;
}
.price-wgold {
  font-weight: bold;
  font-size: 16px;
  color: #f6ff00;
}
.disabled {
  opacity: 0.5;
  filter: grayscale(100%);
}

@media only screen and (max-width: 600px) {
  .qty, .globalQty {
    font-size: 14px;
  }
  .current-price {
    font-size: 14px;
  }
}

a {
  text-decoration: none;
}

.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.span {
  font-size: 14px;
}
.description {
  font-size: 14px;
}

.titleImg {
  font-size: 12px;
  text-align: center;
  align-content: center;
  justify-content: center;
  color: darkgray;
}
ul li {
  font-size: 14px;
}

.cursor-pointer:hover {
  color: #ffb800;
  cursor: pointer;
}

.th {
  color: #ffb800 !important;
  font-size: 15px !important;
}
</style>

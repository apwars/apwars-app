<template>
  <div>
    <v-simple-table v-if="renderOn === 'resourcesInventory'">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center th">
              Resource
            </th>
            <th class="text-left th">
              Name
            </th>
            <th class="text-center th">
              Supply
            </th>
            <th class="text-center th">
              My Quantity
            </th>
            <th class="text-left th">
              Contract
            </th>
            <th class="text-center th">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="resource in getResources()" :key="resource.name">
            <td>
              <v-img :src="resource.img" max-width="80" class="img" />
            </td>
            <td>{{ resource.name }}</td>
            <td class="text-center">
              <div class="text-center">
                <amount
                  v-if="isConnected"
                  :amount="resource.supply"
                  decimals="2"
                  tooltip
                  size="14"
                />
              </div>
            </td>
            <td>
              <div class="text-center">
                <amount
                  v-if="isConnected"
                  :amount="resource.myQty"
                  decimals="3"
                  compact
                  tooltip
                  size="14"
                />
              </div>
            </td>
            <td class="text-left">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    @click="redirectToBSC(resource.contract)"
                    class="cursor-pointer"
                    v-bind="attrs" 
                    v-on="on">
                    {{ resource.contract }}
                  </span> 
                </template>
                <span>Vien on BSCscan</span>
              </v-tooltip>
            </td>
    
            <td class="text-center">
              <a :href="`${redirectTo}=${resource.contract}`">
                <wButton
                  style=" color: #fff"
                  width="50px" height="40px">
                  <div class="d-flex justify-center">
                    <img
                      src="/images/buttons/btn-icon-buy.svg"
                      class="mr-1 align-self-center"
                      height="12"
                    />
                    <div class="align-self-center">Buy Resource</div>
                  </div>
                </wButton>
              </a>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-container class="py-0 mt-2"
      v-else-if="renderOn === 'myResourcesHome'">
      <game-text header="h4" class="text-center">
        My Resources
      </game-text>
      <v-row class="mt-1">
        <v-col
          cols="7" md="6"
          :class="$vuetify.breakpoint.mobile ? 'd-flex justify-left py-1 mx-auto' : ''"
          v-for="resource in getResources()" :key="resource.name">
          <div
            class="d-flex"
            :class="resource.myQty == 0 ? 'mr-3' : ''">
            <v-img :src="resource.img" max-width="60" class="img"/>
            <div>
              <amount
                v-if="isConnected"
                :amount="resource.myQty"
                decimals="3"
                compact
                tooltip
                size="20">
              </amount>
              <br>
              <span>
                <b> {{ resource.name }} </b>
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
      <div
        class="d-flex justify-center"
        :class="$vuetify.breakpoint.mobile ? 'mt-3' : ''">
        <a :href="`${redirectTo}`">
          <wButton @click="$router.push('/arcadia-expansion')">
            <img
              src="/images/buttons/btn-icon-buy.svg"
              class="mr-1 align-self-center"
              height="12"
            />
            <span style="color: #fff" class="text-none text-center">Buy Resources</span>
          </wButton>
        </a>
      </div>
    </v-container>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Address from "@/lib/components/ui/Utils/AddressTooltip";
import GameText from "@/lib/components/ui/Utils/GameText";

import ERC20 from "@/lib/eth/ERC20";

export default {
  name: 'TableResources',
  props: ['renderOn'],
  components: {
    Amount,
    wButton,
    Address,
    GameText,
  },

  data() {
    return {
      redirectTo: "https://exchange.apwars.farm/#/swap?showFarms=true&outputCurrency",
      balanceGold: '0',
      goldSupply: '0',
      balanceCourage: '0',
      courageSupply: '0',
      balanceLand: '0',
      landSupply: '0',
    }
  },

  mounted() {
    this.loadData();
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    
    addresses() {
      return this.$store.getters['user/addresses'];
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

    balanceGold() {
      this.loadData();
    },

    balanceCourage() {
      this.loadData();
    },

    balanceLand() {
      this.loadData();
    }
  },

  methods: {
    async loadData() {
      if (!this.isConnected) {
        return;
      }
      const wGold = new ERC20(this.addresses.wGOLD);
      const wCourage = new ERC20(this.addresses.wCOURAGE);
      const wLand = new ERC20(this.addresses.wLAND);
      
      this.balanceGold = await wGold.balanceOf(this.account)
      this.goldSupply = await wGold.totalSupply();

      this.balanceCourage = await wCourage.balanceOf(this.account);
      this.courageSupply = await wCourage.totalSupply();

      this.balanceLand = await wLand.balanceOf(this.account);
      this.landSupply = await wLand.totalSupply();
    },

    getResources() {
      return [
        {
          img: '/images/wgold.png',
          name: 'wGOLD',
          supply: this.goldSupply,
          myQty: this.balanceGold,
          contract: this.addresses.wGOLD,
        },

        {
          img: '/images/wcourage.png',
          name: 'wCOURAGE',
          supply: this.courageSupply,
          myQty: this.balanceCourage,
          contract: this.addresses.wCOURAGE,
        },

        {
          img: '/images/wLAND.png',
          name: 'wLAND',
          supply: this.landSupply,
          myQty: this.balanceLand,
          contract: this.addresses.wLAND,
        },

        /* {
          img: '/images/wWISDOM.png',
          name: 'wWISDOM',
          supply: '1,500,000.00',
          myQty: '',
          contract: this.addresses.wWISDOM,
          textColor: '#CC7A48'
        }, */
      ];
    },

    redirectToBSC(address) {
      window.open(`https://bscscan.com/token/${address}`);
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
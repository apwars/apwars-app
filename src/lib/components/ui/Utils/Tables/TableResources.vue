<template>
  <v-simple-table>
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
            <amount
              v-if="isConnected"
              :amount="resource.supply"
              decimals="3"
              compact
              tooltip
              size="14"
            />
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
                  <div class="align-self-center">Buy</div>
                </div>
              </wButton>
            </a>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Address from "@/lib/components/ui/Utils/AddressTooltip";

export default {
  name: 'TableResources',
  props: ['balanceGold', 'supplyGold', 'balanceCourage', 'supplyCourage', 'balanceLand', 'supplyWland'],
  components: {
    Amount,
    wButton,
    Address,
  },

  data() {
    return {
      redirectTo: "https://exchange.apwars.farm/#/swap?showFarms=true&outputCurrency",
    }
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
  },

  watch: {

    balanceGold() {
      getResources();
    },

    balanceCourage() {
      getResources();
    }
  },

  methods: {
    getResources() {
      return [
        {
          img: '/images/wgold.png',
          name: 'wGOLD',
          supply: this.supplyGold,
          myQty: this.balanceGold,
          contract: this.addresses.wGOLD
        },

        {
          img: '/images/wcourage.png',
          name: 'wCOURAGE',
          supply: this.supplyCourage,
          myQty: this.balanceCourage,
          contract: this.addresses.wCOURAGE
        },

        {
          img: '/images/wLAND.png',
          name: 'wLAND',
          supply: this.supplyWland,
          myQty: this.balanceLand,
          contract: this.addresses.wLAND
        },
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

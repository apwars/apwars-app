<template>
  <div>
    <div v-if="isConnected">
      <div class="bg-market">
        <v-container class="pb-0">
           <page-title 
              title="Black Market" 
              description="The black market is something profitable and interesting for those who want to strengthen their army or collect rare items that can only be found here." 
              image="/images/black-market/black-market.png"
            />
        </v-container>
        <v-container class="py-0">
          <v-row>
            <v-col cols="12">
              <black-market-table type="sell"></black-market-table>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-row>
          <v-col cols="12">
            <black-market-table type="buy"></black-market-table>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import BlackMarketTable from "@/lib/components/ui/BlackMarket/BlackMarketTable";
import PageTitle from '@/lib/components/ui/Utils/PageTitle.vue';

import MarketNFTS from '@/lib/eth/MarketNFTS.js';

export default {
  components: {
    BlackMarketTable,
    PageTitle,
  },

  data() {
    return {
      isLoading: true,
      marketNFTS: {},
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },

    account() {
      return this.$store.getters['user/account'];
    },

    addresses() {
      return this.$store.getters['user/addresses'];
    },

    networkInfo() {
      return this.$store.getters['user/networkInfo'];
    },

    currentBlockNumber() {
      return this.$store.getters['user/currentBlockNumber'];
    },
  },

  watch: {
    isConnected() {
      this.initData();
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
    this.initData();
    this.loadData();
  },

  methods: {
    goToSwap() {
      this.$router.push('/exchange');
    },

    initData() {
      if (!this.isConnected) {
        return;
      }
      this.marketNFTS = new MarketNFTS(this.addresses.marketNFTS);
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.bg-market {
  background-image: url('/images/black-market/Market.jpg');
  background-size: cover;
  background-position: top;

}
.img-black-market {
  width: 100%;
}

.h1-black-market {
  background: linear-gradient(180deg, #f6ff00 0%, #ffb800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 78px;
  line-height: 101px;
}
.description-black-market {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
}

@media only screen and (max-width: 600px) {
  .description-black-market {
    font-size: 13px;
    line-height: 16px;
  }
  .h1-black-market {
    font-size: 32px;
    line-height: 36px;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>

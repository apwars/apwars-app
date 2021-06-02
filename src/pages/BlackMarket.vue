<template>
  <div>
    <div v-if="isConnected" class="bg-market">
      <v-container class="pb-0">
        <div v-if="$vuetify.breakpoint.mdAndUp">
          <v-row class="d-flex">
            <v-col cols="12" md="6" class="align-self-center">
              <h1 class="text-h1 text-wGOLD ">Black Market</h1>

              <p class="description-black-market">
                The black market is something profitable and interesting for those who want to
                strengthen their army or collect rare items that can only be found here.
              </p>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-end">
              <img src="/images/black-market/black-market.png" alt="black-market" />
            </v-col>
          </v-row>
        </div>

        <div v-else>
          <v-row dense class="d-flex">
            <v-col cols="5" class="align-self-center">
              <h1 class="h1-black-market">Black Market</h1>
            </v-col>
            <v-col cols="7">
              <img
                class="img-black-market"
                src="/images/black-market/black-market.png"
                alt="black-market"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <p class="description-black-market">
                The black market is something profitable and interesting for those who want to
                strengthen their army or collect rare items that can only be found here.
              </p>
            </v-col>
          </v-row>
        </div>
      </v-container>
      <v-container class="py-0">
        <v-row>
          <v-col cols="12">
            <table-black-market type="sell"></table-black-market>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-col cols="12">
            <table-black-market type="buy"></table-black-market>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import wGOLDButton from '@/lib/components/ui/Utils/wGOLDButton';
import wButton from '@/lib/components/ui/Utils/wButton';
import Amount from '@/lib/components/ui/Utils/Amount';
import TableBlackMarket from '@/lib/components/ui/Utils/Tables/TableBlackMarket';

import MarketNFTS from '@/lib/eth/MarketNFTS.js';

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    TableBlackMarket,
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
  background-image: url('/images/black-market/Market.png');
  background-size: cover;
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

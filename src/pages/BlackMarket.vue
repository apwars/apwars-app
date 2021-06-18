<template>
  <div>
    <div>
      <div class="bg-market">
        <v-container class="pb-0">
          <page-title
            title="Black Market"
            description="The Black Market is an interesting place for those who want to strengthen their army or collect rare items that can only be found here."
            image="/images/black-market/black-market.png"
          />
        </v-container>
        <v-container
          class="d-flex justify-space-around"
          :class="{ 'flex-column': $vuetify.breakpoint.smAndDown }"
        >
          <wButton
            width="180px"
            class="d-flex align-self-center"
            @click="goToCreateBuyOrder()"
          >
            <div class="d-flex justify-center">
              <img
                src="/images/buttons/btn-icon-buy.svg"
                class="mx-1 align-self-center"
                height="12"
              />
              <small class="align-self-center">Create buy order</small>
            </div>
          </wButton>
          <wButton
            width="180px"
            class="d-flex align-self-center"
            :class="{ 'mt-1': $vuetify.breakpoint.smAndDown }"
            @click="goToCreateSellOrder()"
          >
            <div class="d-flex justify-center">
              <img
                src="/images/buttons/btn-icon-sell.svg"
                class="mx-1 align-self-center"
                height="12"
              />
              <small class="align-self-center">Create sell order</small>
            </div>
          </wButton>
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
import PageTitle from "@/lib/components/ui/Utils/PageTitle.vue";
import wButton from "@/lib/components/ui/Buttons/wButton";

export default {
  components: {
    BlackMarketTable,
    PageTitle,
    wButton,
  },

  data() {
    return {
      isLoading: true,
      marketNFTS: {},
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

  mounted() {},

  methods: {
    goToCreateBuyOrder() {
      this.$router.push("/game-items");
    },

    goToCreateSellOrder() {
      this.$router.push("/inventory");
    },

    goToSwap() {
      this.$router.push("/exchange");
    },
  },
};
</script>

<style scoped>
.bg-market {
  background-image: url("/images/black-market/Market.jpg");
  background-size: contain;
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

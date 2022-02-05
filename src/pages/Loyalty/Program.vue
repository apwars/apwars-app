<template>
  <div class="page-background">
    <v-container>
      <v-row no-gutters>
        <v-col>
          <Button
            text="Go back to Home"
            icon="arrow-back"
            type="wtertiary"
            no-padding
            :handleClick="backToHome"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <Title class="mt-1" text="Loyalty Program" />
        </v-col>
        <v-col>
          <div class="d-flex flex-column">
            <div class="d-flex align-center justify-end">
              <Button
                :handleClick="() => $router.push('/loyalty-program/shop')"
                type="wsecondary"
                class="mr-2"
              >
                Go to Loyalty Shop
              </Button>
              <img
                src="/images/icons/coins/wSCARS.png"
                width="95px"
                alt="War SCARS"
              />
              <div class="ml-2">
                <h2 class="text-h2">
                  <div v-if="isLoading">
                    <template>
                      <v-skeleton-loader type="image" height="50px" />
                    </template>
                  </div>
                  <amount
                    v-else
                    :amount="balancewSCARS"
                    decimals="0"
                    formatted
                    tooltip
                  />
                </h2>
                <div class="mt-1">Your War SCARS</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="isLoading" class="my-6">
        <v-col cols="12" v-for="lp in lpTokens" :key="lp.symbol" col="12" md="4">
          <template>
            <v-skeleton-loader type="image" />
          </template>
        </v-col>
        <v-col cols="12">
          <template>
            <v-skeleton-loader type="image" />
          </template>
        </v-col>
        <v-col cols="12">
          <template>
            <v-skeleton-loader type="image" />
          </template>
        </v-col>
      </v-row>

      <template v-else>
        <v-row>
          <v-col v-for="lp in lpTokens" :key="lp.symbol" col="12" md="4">
            <LPCard
              :hasSoldier="hasSoldier"
              :lp="lp"
              :handleProvideLiquidity="provideLiquidity"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="medium-text">
              Showing transactions from the last 48h
            </div>
            <v-data-table :headers="headers" :items="transactions">
              <template v-slot:[`item.data.tokenSymbol`]="{ item }">
                {{ item.data.tokenSymbol }}/BUSD
              </template>
              <template v-slot:[`item.createdOn`]="{ item }">
                {{ new Date(item.createdOn).toLocaleString(userLocale) }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <div class="medium-text">
              Report
            </div>
          </v-col>
        </v-row>
        <v-row dense align="center">
          <v-col justify="center" cols="12" md="4" offset-md="2">
            <div class="medium-text report-title">Distributed Amount</div>
            <div class="report-info">
              <amount
                :amount="this.report.totalDistributed"
                decimals="0"
                formatted
                symbol="War SCARS"
              />
            </div>

            <div class="medium-text report-title mt-3">
              Total Loyalty Members
            </div>
            <div class="report-info">
              {{ this.report.totalAwardedAccounts }}
            </div>
          </v-col>
          <v-col justify="center" cols="12" md="4">
            <div class="medium-text report-title">Top 10 Loyalty Members</div>

            <div id="chart">
              <apexchart
                type="pie"
                width="380"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import LPCard from "@/lib/components/ui/LPCard";
import CakeLP from "@/lib/eth/CakeLP";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import LPController from "@/controller/LPController";
import WalletController from "@/controller/WalletController";
import NFTsController from "@/controller/NFTsController";
import Amount from "@/lib/components/ui/Utils/Amount.vue";

import VueApexCharts from "vue-apexcharts";

export default {
  components: { Title, LPCard, Button, Amount, apexchart: VueApexCharts },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
    userLocale() {
      return window.navigator.userLanguage || window.navigator.language;
    },
  },
  data() {
    return {
      isLoading: true,
      balancewSCARS: 0,
      hasSoldier: false,
      lpTokens: [
        {
          symbol: "wGOLD/BUSD",
          token: {
            "56": "0xdfc8fe5fdf14ac2f3fa03e3f60484d75979692b2",
          },
          image: "/images/lp-wgold-busd.png",
          base: "wGOLD",
          baseToken: "0x7ab6eedd9443e0e98e5ea93667ca5b250b8dda51",
          sideToken: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          balanceLP: {},
        },
        {
          symbol: "wCOURAGE/BUSD",
          token: {
            "56": "0x23aCDF10c37e286405022BC248C4532C19B2eA1B",
          },
          image: "/images/lp-wcourage-busd.png",
          base: "wCOURAGE",
          baseToken: "0x5F51A3ce7f2233777328866F477E86a91CA9DdeC",
          sideToken: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          balanceLP: {},
        },
        {
          symbol: "wLAND/BUSD",
          token: {
            "56": "0x04eB5dAF52AB295A12A665A02e5b80EcD2F347a3",
          },
          image: "/images/lp-wland-busd.png",
          base: "wLAND",
          baseToken: "0x2c6107c27a15d2c7f397d88d76257ea42c12f89f",
          sideToken: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          balanceLP: {},
        },
      ],
      transactions: [],
      report: {},
      headers: [
        {
          sortable: false,
          text: "Reward",
          value: "reward",
          align: "center",
          filterable: false,
        },
        {
          sortable: false,
          text: "Amount",
          value: "amount",
          align: "center",
          filterable: true,
        },
        {
          text: "Pool",
          align: "center",
          sortable: false,
          value: "data.tokenSymbol",
          filterable: true,
        },
        {
          sortable: false,
          text: "Pool Share",
          value: "share",
          align: "center",
          filterable: false,
        },
        { text: "Date", value: "createdOn" },
      ],
      series: [],
      chartOptions: {
        chart: {
          type: "pie",
          width: 300,
        },
        legend: {
          show: false,
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToHome() {
      this.$router.push("/");
    },
    async getBalanceLP(token) {
      try {
        const cakeLP = new CakeLP(token);
        const balance = { amount: 0, percentage: 0 };
        balance.amount = await cakeLP.balanceOf(this.account);
        balance.percentage = await cakeLP.percentageInLP(this.account);
        return balance;
      } catch (error) {
        console.log(error);
      }
    },
    getInfoLp() {
      const controller = new LPController();
      return controller.info();
    },
    async getBalancewSCARS(account) {
      const controller = new WalletController();
      const wallet = await controller.wallets(account);

      if (!wallet.balances["wSCARS"]) {
        return 0;
      }

      return wallet.balances["wSCARS"];
    },
    getHasSoldier() {
      const controller = new NFTsController();
      return controller.hasSoldier(this.account);
    },
    provideLiquidity(lp) {
      if (!this.hasSoldier) {
        return;
      }

      this.$router.push(`/add-liquidity/${lp.baseToken}/${lp.sideToken}`);
    },
    async loadData() {
      try {
        if (!this.isConnected) {
          return;
        }
        this.hasSoldier = await this.getHasSoldier();
        this.hasSoldier = this.hasSoldier.hasSoldier;
        const infoLP = await this.getInfoLp();
        this.balancewSCARS = await this.getBalancewSCARS(this.account);
        for (const lpToken of this.lpTokens) {
          const balanceLP = await this.getBalanceLP(
            lpToken.token[this.networkInfo.id]
          );
          lpToken.balanceLP = balanceLP;
          lpToken.totalDistributionPerHour =
            infoLP[lpToken.base].lastDistributionPerHour;
          lpToken.accountDistributionPerHour =
            infoLP[lpToken.base].lastDistributionPerHour * balanceLP.percentage;
        }
        this.isLoading = false;
      } catch (error) {
        ToastSnackbar.error(error.message);
      }
    },

    async loadTransactionsAndReport() {
      if (!this.account) {
        return;
      }
      const controller = new LPController();
      const transfers = await controller.transactions(this.account);
      this.transactions = transfers.map((t) => ({
        ...t,
        reward: "War SCARS",
        share: `${(t.data.proportion * 100).toFixed(2)}%`,
      }));

      this.report = await controller.report();

      this.report.top10LPAccount.map((top10) => {
        this.series.push(top10.total);
        this.chartOptions.labels.push(top10.account);
      });
    },
  },

  mounted() {
    this.loadData();
    this.loadTransactionsAndReport();
  },
  created() {
    this.setHeader(false);
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
  watch: {
    async account() {
      await this.loadData();
      this.loadTransactionsAndReport();
    },
  },
};
</script>
<style lang="scss" scoped>
.page-background {
  background-image: url("/images/background/blue-mountains.png");
  background-size: cover;
  background-position: top;
}
.card-loyalty-program {
  background-color: #0d0600;
  border: 2px solid #ffeebc;
  .card-loyalty-program-icon {
    padding: 12px;
    background-color: #002032;
    width: 80px;
    border: 2px solid #ffeebc;
    margin: 0px auto;
    margin-top: -2px;
    border-radius: 0px 0px 10px 10px;
  }
  .card-loyalty-program-line {
    background-color: #ffeebc;
    height: 2px;
    width: auto;
  }
}
.medium-text {
  width: 100%;
  font-size: 22px;
  margin: 12px 0px;
  font-weight: bold;
}
.report-title {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  background: linear-gradient(180deg, #faff00 0%, #ffb800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.report-info {
  font-weight: bold;
  font-size: 28px;
  font-family: PT Serif;
  text-align: center;
}
</style>

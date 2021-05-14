<template>
  <div>
    <div v-if="isConnected && !isLoading && warStage > 1">
      <v-alert v-if="isWar.test" type="warning">
        Danger, it's a test war
      </v-alert>
      <div class="bg-fed">
        <v-container>
          <v-row class="d-none d-sm-none d-md-flex my-3">
            <v-col cols="12" md="4">
              <v-img
                class="mx-auto"
                max-width="400"
                :src="`/images/battle/${teamAimagem}`"
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-center">
              <div class="align-self-center">
                <div class="d-flex justify-center">
                  <div class="align-self-center mx-3">
                    <v-img
                      max-width="40"
                      width="40"
                      src="/images/battle/battle-icon.png"
                    />
                  </div>

                  <h3 class="text-h3 text-wGOLD align-self-center">
                    War Report
                  </h3>
                </div>
                <div class="text-justify">
                  The war came to an end, it was a time of great battles, and
                  now it is time to return home, send your troops home, train
                  more, increase your troops and prepare for a new war
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                class="mx-auto"
                max-width="400"
                :src="`/images/battle/${teamBimagem}`"
              />
            </v-col>
          </v-row>

          <v-row class="d-flex d-sm-flex d-md-none">
            <v-col cols="12">
              <v-img
                class="mx-auto"
                max-width="600"
                src="/images/battle/battle-end-mobile.png"
              />
              <div class="text-justify">
                The war came to an end, it was a time of great battles, and now
                it is time to return home, send your troops home, train more,
                increase your troops and prepare for a new war
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div class="gradient"></div>
      </div>

      <v-container fluid>
        <v-row class="mt-n9 mt-md-n16">
          <v-col cols="12">
            <h1 class="text-h3 text-md-h1 text-center text-wGOLD">
              wGOLD won for {{ winner }}
            </h1>
            <p class="subtext-wGOLD my-3">
              The war is over! The forces won the FED, all the wGOLD won is
              being distributed!
            </p>
          </v-col>
        </v-row>

        <v-row v-if="!isLoading" class="bg-burned">
          <v-col cols="12" md="6">
            <div class="d-flex justify-end mx-0 mx-md-6">
              <v-img
                class="btn mr-1 align-self-center"
                src="/images/wgold.png"
                max-width="120"
                width="120"
                height="120"
              />
              <div class="price-wGOLD align-self-center">
                <div class="subtitle-won">ENTIRE PRIZE:</div>
                <amount :amount="prize.won" decimals="2" compact approximate />
                <span class="suffix">wGOLD</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex justify-start mx-0 mx-md-6">
              <v-img
                class="btn mr-1 align-self-center"
                src="/images/wgold.png"
                max-width="120"
                width="120"
                height="120"
              />
              <div class="price-wGOLD align-self-center">
                <div class="subtitle-won">MY EARNINGS:</div>
                <amount :amount="myEarnings" decimals="2" compact approximate formatted />
                <span class="suffix">wGOLD</span>
              </div>
              <!-- <wButton
                class="ml-1 align-self-center"
                :actived="false"
                @click="redeemPrize"
                :disabled="isReedemPrize"
              >
                {{ isReedemPrize ? "Already withdrawn" : "Redeem prize" }}
              </wButton> -->
            </div>
          </v-col>
          <v-col cols="12" class="mb-9">
            <div class="d-flex justify-center mx-0 mx-md-6">
              <v-img
                class="btn mr-1 align-self-center"
                src="/images/battle/burned.png"
                max-width="120"
                width="120"
              />
              <div class="price-wGOLD align-self-center">
                <div class="subtitle-won">BURNED:</div>
                <amount
                  :amount="prize.burned"
                  decimals="2"
                  compact
                  approximate
                />
                <span class="suffix">wGOLD</span>
              </div>
            </div>
          </v-col>
          <div class="gradient"></div>
        </v-row>
      </v-container>

      <v-container>
        <v-row class="mt-n3 mt-sm-n9">
          <v-col cols="12" class="d-flex justify-center">
            <h3 class="text-h3 ma-0 ma-sm-6 text-wGOLD">Troops</h3>
          </v-col>
        </v-row>

        <v-row v-if="!isLoading">
          <v-col cols="12" lg="6" class="dividing-line">
            <v-row>
              <v-col
                cols="12"
                class="d-flex justify-center"
                v-for="trooper in teamA"
                v-bind:key="trooper.name"
              >
                <stake-trooper
                  :trooper="trooper"
                  :contract-war="contractWar"
                  bring-home
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6">
            <v-row>
              <v-col
                cols="12"
                class="d-flex justify-center"
                v-for="trooper in teamB"
                v-bind:key="trooper.name"
              >
                <stake-trooper
                  :trooper="trooper"
                  :contract-war="contractWar"
                  bring-home
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="12" class="d-flex justify-center">
            <h3 class="text-h3">Loading...</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <h3 class="text-h3 text-wGOLD">Players</h3>
          </v-col>
          <v-col cols="12" class="d-flex justify-center pa-0">
            <table-war-report :war="isWar"></table-war-report>
          </v-col>

          <v-col cols="12" class="d-flex justify-center">
            <h3 class="text-h3 text-wGOLD">Legendary Relics (NFTs)</h3>
          </v-col>
          <v-col
            cols="12"
            md="3"
            v-for="nft in isWar.report.nfts"
            :key="nft.address"
          >
            <v-img
              class="mx-auto"
              max-width="200"
              width="200"
              :src="`/images/nfts/${nft.image}`"
            ></v-img>
            <h5 class="text-h5 text-wGOLD text-center">
              {{ nft.name }}
            </h5>
            <h5 class="text-h5 text-wGOLD text-center">
              Winner
            </h5>
            <div class="text-center">
              <v-address :address="nft.address" link tooltip></v-address>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else-if="isConnected && !isLoading">
      <div class="bg-fed">
        <v-container>
          <v-row class="my-9">
            <v-col cols="12" class="d-flex justify-center my-9">
              <h3 class="text-h3 text-wGOLD text-center">Awaiting result...</h3>
            </v-col>
          </v-row>
        </v-container>
        <div class="gradient"></div>
      </div>
    </div>
    <div v-else>
      <div class="bg-fed">
        <v-container>
          <v-row class="my-9">
            <v-col cols="12" class="d-flex justify-center my-9">
              <h3 class="text-h3 text-wGOLD text-center">Loading...</h3>
            </v-col>
          </v-row>
        </v-container>
        <div class="gradient"></div>
      </div>
    </div>
  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Utils/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import StakeTrooper from "@/lib/components/ui/Utils/StakeTrooper";
import Countdown from "@/lib/components/ui/Utils/Countdown";
import TableWarReport from "@/lib/components/ui/Utils/TableWarReport";
import VAddress from "@/lib/components/ui/Utils/VAddress";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";

import WarMachine from "@/lib/eth/WarMachine";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    StakeTrooper,
    Countdown,
    TableWarReport,
    VAddress,
  },

  data() {
    return {
      isLoading: true,
      globalTroops: [],
      contractWar: this.$route.params.contractWar,
      warStats: {},
      prize: {},
      isReedemPrize: true,
      warStage: 0,
      myEarnings: "0",
      isWar: { test: false },
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

    teamAimagem() {
      if (!this.warStats.winner) return "the-corporation.png";
      if (this.warStats.winner == "1") {
        return "the-corporation-win.png";
      }
      return "the-corporation-loser.png";
    },

    teamBimagem() {
      if (!this.warStats.winner) return "the-degenerate.png";
      if (this.warStats.winner == "2") {
        return "the-degenerate-win.png";
      }
      return "the-degenerate-loser.png";
    },

    winner() {
      if (!this.warStats.winner) return "";
      if (this.warStats.winner == "1") {
        return "The Corporation";
      } else if (this.warStats.winner == "2") {
        return "The Degenerate";
      }
    },

    teamA() {
      return this.globalTroops.filter((trooper) => trooper.team === 1);
    },

    teamB() {
      return this.globalTroops.filter((trooper) => trooper.team === 2);
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
    if (!this.isConnected) {
      return;
    }
    this.initData();
    this.loadData();
  },
  methods: {
    goToSwap() {
      this.$router.push("/exchange");
    },

    redeemPrize() {
      const withdrawPrize = this.warMachine.withdrawPrize(this.account);
      withdrawPrize.on("error", (error) => {
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error("Troop sending failed");
      });
      withdrawPrize.on("receipt", (receipt) => {
        ToastSnackbar.successTransaction(
          `Transaction successfully`,
          receipt.transactionHash
        );
      });
    },

    initData() {
      try {
        this.isWar = getWars().find(
          (war) => war.contractAddress[this.networkInfo.id] === this.contractWar
        );
        if (!this.isWar) {
          this.router.push("/wars");
        }
        this.warMachine = new WarMachine(this.contractWar, this.networkInfo.id);

        this.globalTroops = getTroops();
      } catch (error) {
        console.log(error);
      }
    },

    async loadData() {
      try {
        this.warStage = parseInt(await this.warMachine.warStage());
        if (this.$route.query.showReport) {
          this.warStage = 2;
        }
        this.warStats = await this.warMachine.warStats();
        this.prize = await this.warMachine.getWarReportwGOLD();
        this.isReedemPrize = await this.warMachine.withdrawn(
          this.account,
          this.addresses.wGOLD
        );

        let prizeWon = web3.utils.fromWei(this.prize.won.toString());
        prizeWon = parseFloat(prizeWon);
        const reportUser = this.isWar.report.players.find(
          (player) =>
            player.address.toLowerCase() === this.account.toLowerCase()
        );
        if (reportUser) {
          const wGOLDShare =
            this.isWar.report.winner === "TeamA"
              ? reportUser.teamAShare
              : reportUser.teamBShare;
          this.myEarnings = prizeWon * wGOLDShare;
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.bg-fed {
  background-image: url("/images/battle/fed-background.png");
  background-size: cover;
}
.gradient {
  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

.dividing-line {
  background-image: url("/images/battle/line.png");
  background-position: right;
}

.isLoading {
  opacity: 0;
}
.loading {
  display: none;
}

.subtext-wGOLD {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  color: #c4c4c4;
  width: 600px;
  margin: 0 auto;
}
.subtitle-won {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  color: #c4c4c4;
}
.price-wGOLD {
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 52px;
  color: #ffffff;
}

.price-wGOLD .suffix {
  background: linear-gradient(
    180deg,
    #f6ff00 0%,
    #ffb800 53.65%,
    #ffb800 77.08%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-burned {
  background-image: url("/images/battle/wGOLD-burned.png");
  background-size: cover;
  background-position: bottom;
}

@media only screen and (max-width: 600px) {
  .gradient {
    display: none;
  }
  .subtext-wGOLD {
    width: 100%;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>
